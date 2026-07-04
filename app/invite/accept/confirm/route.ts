import { NextRequest, NextResponse } from "next/server";

import {
  PARENT_INVITE_SESSION_COOKIE,
  PARENT_INVITE_SESSION_MAX_AGE,
} from "@/lib/parent-session";
import { hashInviteToken } from "@/lib/invite-token";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

type ParentInvite = {
  id: string;
  parent_email: string;
  parent_name: string | null;
  player_first_name: string;
  player_last_initial: string;
  grade: number;
  gender: "boy" | "girl";
  division:
    | "boys_elementary"
    | "boys_middle_school"
    | "girls_elementary"
    | "girls_middle_school";
  status: string;
  expires_at: string;
};

type ParentProfileResult =
  | {
      ok: true;
      profileId: string;
    }
  | {
      ok: false;
      error: string;
      profileId: null;
    };

type ActionResult =
  | {
      ok: true;
    }
  | {
      ok: false;
      error: string;
    };

async function ensureParentProfileForInvite(
  invite: ParentInvite,
): Promise<ParentProfileResult> {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return {
      ok: false,
      error: "Supabase environment variables are not available yet.",
      profileId: null,
    };
  }

  const { data: existingProfile, error: existingProfileError } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", invite.parent_email)
    .maybeSingle();

  if (existingProfileError) {
    return {
      ok: false,
      error: existingProfileError.message,
      profileId: null,
    };
  }

  if (existingProfile) {
    return {
      ok: true,
      profileId: existingProfile.id as string,
    };
  }

  const { data: createdUser, error: createUserError } =
    await supabase.auth.admin.createUser({
      email: invite.parent_email,
      email_confirm: true,
      user_metadata: {
        display_name: invite.parent_name,
      },
    });

  if (createUserError || !createdUser.user) {
    return {
      ok: false,
      error: createUserError?.message ?? "Parent profile could not be created.",
      profileId: null,
    };
  }

  const { error: createProfileError } = await supabase.from("profiles").insert({
    id: createdUser.user.id,
    email: invite.parent_email,
    display_name: invite.parent_name,
    role: "parent",
  });

  if (createProfileError) {
    return {
      ok: false,
      error: createProfileError.message,
      profileId: null,
    };
  }

  return {
    ok: true,
    profileId: createdUser.user.id,
  };
}

async function ensurePlayerForInvite(
  invite: ParentInvite,
  parentProfileId: string,
): Promise<ActionResult> {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return {
      ok: false,
      error: "Supabase environment variables are not available yet.",
    };
  }

  const { data: existingPlayer, error: existingPlayerError } = await supabase
    .from("players")
    .select("id")
    .eq("invite_id", invite.id)
    .maybeSingle();

  if (existingPlayerError) {
    return {
      ok: false,
      error: existingPlayerError.message,
    };
  }

  if (existingPlayer) {
    const { error: updatePlayerError } = await supabase
      .from("players")
      .update({ is_active: true, parent_profile_id: parentProfileId })
      .eq("id", existingPlayer.id);

    if (updatePlayerError) {
      return {
        ok: false,
        error: updatePlayerError.message,
      };
    }

    return { ok: true };
  }

  const { error: createPlayerError } = await supabase.from("players").insert({
    parent_profile_id: parentProfileId,
    invite_id: invite.id,
    first_name: invite.player_first_name,
    last_initial: invite.player_last_initial,
    grade: invite.grade,
    gender: invite.gender,
    division: invite.division,
    is_active: true,
  });

  if (createPlayerError) {
    return {
      ok: false,
      error: createPlayerError.message,
    };
  }

  return { ok: true };
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const token = String(formData.get("token") ?? "");
  const supabase = createSupabaseAdminClient();

  if (!token || !supabase) {
    return NextResponse.redirect(new URL("/invite/accept", request.url), 303);
  }

  const { data: invite, error } = await supabase
    .from("parent_invites")
    .select(
      "id,parent_email,parent_name,player_first_name,player_last_initial,grade,gender,division,status,expires_at",
    )
    .eq("token_hash", hashInviteToken(token))
    .single();

  if (
    error ||
    !invite ||
    invite.status === "cancelled" ||
    new Date(invite.expires_at) < new Date()
  ) {
    return NextResponse.redirect(
      new URL("/invite/accept?error=unavailable", request.url),
      303,
    );
  }

  const parentProfileResult = await ensureParentProfileForInvite(
    invite as ParentInvite,
  );

  if (!parentProfileResult.ok) {
    return NextResponse.redirect(
      new URL("/invite/accept?error=profile", request.url),
      303,
    );
  }

  const playerResult = await ensurePlayerForInvite(
    invite as ParentInvite,
    parentProfileResult.profileId,
  );

  if (!playerResult.ok) {
    return NextResponse.redirect(
      new URL("/invite/accept?error=player", request.url),
      303,
    );
  }

  const { error: acceptError } = await supabase
    .from("parent_invites")
    .update({
      status: "accepted",
      accepted_at: new Date().toISOString(),
      accepted_by_profile_id: parentProfileResult.profileId,
    })
    .eq("id", invite.id);

  if (acceptError) {
    return NextResponse.redirect(
      new URL("/invite/accept?error=accept", request.url),
      303,
    );
  }

  const response = NextResponse.redirect(new URL("/family", request.url), 303);

  response.cookies.set({
    name: PARENT_INVITE_SESSION_COOKIE,
    value: invite.id,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: PARENT_INVITE_SESSION_MAX_AGE,
  });

  return response;
}
