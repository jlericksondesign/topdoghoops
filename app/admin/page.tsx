import { AppHeaderBar } from "@/components/app/AppHeaderBar";
import {
  ADMIN_SESSION_COOKIE,
  isAdminSessionValid,
} from "@/lib/admin-auth";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

type ParentInvite = {
  id: string;
  parent_email: string;
  parent_name: string | null;
  player_first_name: string;
  player_last_initial: string;
  grade: number;
  gender: string;
  division: string;
  status: string;
  expires_at: string;
  created_at: string;
};

function formatDivision(division: string) {
  return division
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

async function getParentInvites() {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return {
      invites: [] as ParentInvite[],
      error: "Supabase environment variables are not available yet.",
    };
  }

  const { data, error } = await supabase
    .from("parent_invites")
    .select(
      "id,parent_email,parent_name,player_first_name,player_last_initial,grade,gender,division,status,expires_at,created_at",
    )
    .order("created_at", { ascending: false });

  if (error) {
    return {
      invites: [] as ParentInvite[],
      error: error.message,
    };
  }

  return {
    invites: (data ?? []) as ParentInvite[],
    error: null,
  };
}

export default async function AdminPage() {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!isAdminSessionValid(adminSession)) {
    redirect("/admin/login");
  }

  const { invites, error } = await getParentInvites();

  return (
    <main className="flex min-h-dvh flex-col bg-canton-cream-grid">
      <AppHeaderBar dashboardHref="/admin" />
      <div className="flex flex-1 flex-col gap-6 px-6 pb-10 pt-8">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-canton-green">
            Admin
          </p>
          <div className="mt-2 flex items-start justify-between gap-4">
            <h1 className="text-3xl font-black uppercase leading-tight text-canton-ink">
              Family Invites
            </h1>
            <form action="/api/admin/logout" method="post">
              <button
                type="submit"
                className="rounded-full bg-canton-pill px-3 py-2 text-xs font-black uppercase text-canton-ink"
              >
                Log Out
              </button>
            </form>
          </div>
          <p className="mt-2 text-sm font-semibold leading-6 text-canton-muted">
            Review draft family invitations and import roster CSVs before
            sending parent emails.
          </p>
        </div>

        <Link
          href="/admin/import"
          className="inline-flex h-12 items-center justify-center rounded-xl bg-canton-green px-4 text-sm font-black uppercase tracking-wide text-white"
        >
          Import CSV
        </Link>

        {error ? (
          <div className="rounded-xl border-2 border-canton-orange bg-white px-4 py-4">
            <p className="text-sm font-black uppercase text-canton-orange">
              Supabase not ready
            </p>
            <p className="mt-2 text-sm leading-6 text-canton-ink">{error}</p>
          </div>
        ) : null}

        {!error && invites.length === 0 ? (
          <div className="rounded-xl border border-canton-cream-line bg-white px-4 py-6 text-center">
            <p className="text-sm font-bold text-canton-ink">
              No parent invites found yet.
            </p>
          </div>
        ) : null}

        {invites.length > 0 ? (
          <div className="overflow-hidden rounded-2xl border-2 border-canton-ink bg-white">
            <div className="bg-canton-green px-4 py-3">
              <p className="text-sm font-black uppercase tracking-widest text-white">
                {invites.length} Invite{invites.length === 1 ? "" : "s"}
              </p>
            </div>
            <div className="divide-y divide-canton-cream-line">
              {invites.map((invite) => (
                <article key={invite.id} className="px-4 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-black text-canton-ink">
                        {invite.player_first_name} {invite.player_last_initial}.
                      </h2>
                      <p className="mt-1 text-sm font-semibold text-canton-muted">
                        Parent: {invite.parent_name ?? "No name"} ·{" "}
                        {invite.parent_email}
                      </p>
                    </div>
                    <span className="rounded-full bg-canton-pill px-3 py-1 text-xs font-black uppercase text-canton-ink">
                      {invite.status}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-canton-muted">
                        Division
                      </p>
                      <p className="mt-1 font-bold text-canton-ink">
                        {formatDivision(invite.division)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-canton-muted">
                        Grade
                      </p>
                      <p className="mt-1 font-bold text-canton-ink">
                        {invite.grade}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-canton-muted">
                        Gender
                      </p>
                      <p className="mt-1 font-bold capitalize text-canton-ink">
                        {invite.gender}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-canton-muted">
                        Expires
                      </p>
                      <p className="mt-1 font-bold text-canton-ink">
                        {formatDate(invite.expires_at)}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
