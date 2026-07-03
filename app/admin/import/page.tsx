import { AppHeaderBar } from "@/components/app/AppHeaderBar";
import { InviteCsvImportClient } from "@/components/admin/InviteCsvImportClient";
import {
  ADMIN_SESSION_COOKIE,
  isAdminSessionValid,
} from "@/lib/admin-auth";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminImportPage() {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!isAdminSessionValid(adminSession)) {
    redirect("/admin/login");
  }

  return (
    <main className="flex min-h-dvh flex-col bg-canton-cream-grid">
      <AppHeaderBar dashboardHref="/admin" />
      <div className="flex flex-1 flex-col gap-6 px-6 pb-10 pt-8">
        <div>
          <Link
            href="/admin"
            className="text-xs font-black uppercase tracking-[0.2em] text-canton-green"
          >
            Admin
          </Link>
          <h1 className="mt-2 text-3xl font-black uppercase leading-tight text-canton-ink">
            Import Invites
          </h1>
          <p className="mt-2 text-sm font-semibold leading-6 text-canton-muted">
            Upload a roster CSV to create draft family invites. No emails are
            sent from this screen.
          </p>
        </div>

        <InviteCsvImportClient />
      </div>
    </main>
  );
}
