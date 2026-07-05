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

  const expiresAt = getInviteExpirationDate();
  const inserts = validRows.map((row) => ({
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

  return NextResponse.json({ imported: inserts.length });
}
