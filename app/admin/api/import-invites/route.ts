import { NextRequest, NextResponse } from "next/server";

import {
  ADMIN_SESSION_COOKIE,
  isAdminSessionValid,
} from "@/lib/admin-auth";
import {
  deriveGenderFromDivision,
  getValidInviteRows,
  parseInviteCsv,
} from "@/lib/invite-csv";
import {
  createInviteToken,
  getInviteExpirationDate,
  hashInviteToken,
} from "@/lib/invite-token";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

type ImportBody = {
  invites?: unknown;
};

type ExistingInviteRow = {
  parent_email: string;
  player_first_name: string;
  player_last_initial: string;
  grade: number;
};

function getInviteDedupeKey(row: ExistingInviteRow) {
  return [
    row.parent_email.trim().toLowerCase(),
    row.player_first_name.trim().toLowerCase(),
    row.player_last_initial.trim().charAt(0).toLowerCase(),
    row.grade,
  ].join("|");
}

function stringifyInvites(invites: unknown) {
  if (!Array.isArray(invites)) {
    return "";
  }

  function formatCsvCell(value: unknown) {
    const stringValue = String(value ?? "");

    if (
      stringValue.includes(",") ||
      stringValue.includes('"') ||
      stringValue.includes("\n")
    ) {
      return `"${stringValue.replaceAll('"', '""')}"`;
    }

    return stringValue;
  }

  const rows = invites.map((invite) => {
    if (!invite || typeof invite !== "object") {
      return "";
    }

    const record = invite as Record<string, unknown>;

    return [
      record.parent_email,
      record.parent_name,
      record.player_first_name,
      record.player_last_initial,
      record.grade,
      record.division,
    ]
      .map(formatCsvCell)
      .join(",");
  });

  return [
    "parent_email,parent_name,player_first_name,player_last_initial,grade,division",
    ...rows,
  ].join("\n");
}

export async function POST(request: NextRequest) {
  const adminSession = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;

  if (!isAdminSessionValid(adminSession)) {
    return NextResponse.json(
      { error: "Admin access required." },
      { status: 401 },
    );
  }

  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase environment variables are not available yet." },
      { status: 500 },
    );
  }

  const body = (await request.json()) as ImportBody;
  const rows = parseInviteCsv(stringifyInvites(body.invites));
  const validRows = getValidInviteRows(rows);
  const invalidRows = rows.filter((row) => row.errors.length > 0);

  if (validRows.length === 0) {
    return NextResponse.json(
      { error: "No valid invite rows found." },
      { status: 400 },
    );
  }

  if (invalidRows.length > 0) {
    return NextResponse.json(
      { error: "Fix invalid rows before importing." },
      { status: 400 },
    );
  }

  const uploadedInviteKeys = new Set<string>();
  let skippedDuplicateUploadRows = 0;
  const uniqueValidRows = validRows.filter((row) => {
    const key = getInviteDedupeKey(row);

    if (uploadedInviteKeys.has(key)) {
      skippedDuplicateUploadRows += 1;
      return false;
    }

    uploadedInviteKeys.add(key);
    return true;
  });
  const parentEmails = Array.from(
    new Set(uniqueValidRows.map((row) => row.parent_email)),
  );
  const { data: existingInvites, error: existingInviteError } = await supabase
    .from("parent_invites")
    .select("parent_email,player_first_name,player_last_initial,grade")
    .in("parent_email", parentEmails);

  if (existingInviteError) {
    return NextResponse.json(
      { error: existingInviteError.message },
      { status: 500 },
    );
  }

  const existingInviteKeys = new Set(
    ((existingInvites ?? []) as ExistingInviteRow[]).map(getInviteDedupeKey),
  );
  const rowsToInsert = uniqueValidRows.filter(
    (row) => !existingInviteKeys.has(getInviteDedupeKey(row)),
  );
  const skippedExistingRows = uniqueValidRows.length - rowsToInsert.length;

  if (rowsToInsert.length === 0) {
    return NextResponse.json({
      imported: 0,
      skippedDuplicates: skippedDuplicateUploadRows + skippedExistingRows,
    });
  }

  const expiresAt = getInviteExpirationDate();
  const inserts = rowsToInsert.map((row) => ({
    ...row,
    gender: deriveGenderFromDivision(row.division),
    token_hash: hashInviteToken(createInviteToken()),
    status: "draft",
    expires_at: expiresAt,
  }));

  const { error } = await supabase.from("parent_invites").insert(inserts);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    imported: inserts.length,
    skippedDuplicates: skippedDuplicateUploadRows + skippedExistingRows,
  });
}
