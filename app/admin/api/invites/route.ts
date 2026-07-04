import { NextRequest, NextResponse } from "next/server";

import {
  ADMIN_SESSION_COOKIE,
  isAdminSessionValid,
} from "@/lib/admin-auth";
import { getValidInviteRows, parseInviteCsv } from "@/lib/invite-csv";
import {
  createInviteToken,
  getInviteExpirationDate,
  hashInviteToken,
} from "@/lib/invite-token";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

function csvCell(value: FormDataEntryValue | null) {
  return String(value ?? "").replaceAll('"', '""');
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

  const formData = await request.formData();
  const csvText = [
    "parent_email,parent_name,player_first_name,player_last_initial,grade,gender,division",
    [
      formData.get("parent_email"),
      formData.get("parent_name"),
      formData.get("player_first_name"),
      formData.get("player_last_initial"),
      formData.get("grade"),
      formData.get("gender"),
      formData.get("division"),
    ]
      .map((value) => `"${csvCell(value)}"`)
      .join(","),
  ].join("\n");
  const rows = parseInviteCsv(csvText);
  const validRows = getValidInviteRows(rows);
  const invalidRow = rows.find((row) => row.errors.length > 0);

  if (invalidRow || validRows.length !== 1) {
    return NextResponse.json(
      {
        error:
          invalidRow?.errors.join(" ") ??
          "Invite fields are missing or invalid.",
      },
      { status: 400 },
    );
  }

  const [invite] = validRows;
  const { error } = await supabase.from("parent_invites").insert({
    ...invite,
    token_hash: hashInviteToken(createInviteToken()),
    status: "draft",
    expires_at: getInviteExpirationDate(),
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
