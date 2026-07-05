import { AppHeaderBar } from "@/components/app/AppHeaderBar";

type AdminLoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  const { error } = await searchParams;

  return (
    <main className="flex min-h-dvh flex-col bg-canton-cream-grid">
      <AppHeaderBar dashboardHref="/admin/login" />
      <div className="flex flex-1 flex-col justify-center px-6 py-10">
        <section className="rounded-2xl border-2 border-canton-ink bg-white px-5 py-6 shadow-[0_5px_0_#241000]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-canton-green">
            Admin
          </p>
          <h1 className="mt-2 text-3xl font-black uppercase leading-tight text-canton-ink">
            Admin Access
          </h1>
          <p className="mt-2 text-sm font-semibold leading-6 text-canton-muted">
            Enter the temporary demo passcode to view family invites.
          </p>

          <form
            action="/api/admin/login"
            method="post"
            className="mt-6 flex flex-col gap-4"
          >
            <label className="flex flex-col gap-2">
              <span className="text-xs font-black uppercase tracking-widest text-canton-muted">
                Passcode
              </span>
              <input
                name="passcode"
                type="password"
                autoComplete="current-password"
                required
                className="h-12 rounded-xl border-2 border-canton-cream-line bg-canton-cream px-4 text-base font-bold text-canton-ink outline-none focus:border-canton-green"
              />
            </label>

            {error ? (
              <p className="rounded-xl bg-canton-orange px-4 py-3 text-sm font-black uppercase text-white">
                That passcode did not work.
              </p>
            ) : null}

            <button
              type="submit"
              className="h-14 rounded-xl bg-canton-green px-4 text-base font-black uppercase tracking-wide text-white"
            >
              Enter Admin
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
