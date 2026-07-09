import { AppHeaderBar } from "@/components/app/AppHeaderBar";

type AdminLoginPageProps = {
  searchParams: Promise<{
    error?: string;
    sent?: string;
  }>;
};

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  const { error, sent } = await searchParams;

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
            Enter your approved admin email and we&apos;ll send a secure sign-in
            link.
          </p>

          <form
            action="/api/admin/login"
            method="post"
            className="mt-6 flex flex-col gap-4"
          >
            <label className="flex flex-col gap-2">
              <span className="text-xs font-black uppercase tracking-widest text-canton-muted">
                Admin Email
              </span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                className="h-12 rounded-xl border-2 border-canton-cream-line bg-canton-cream px-4 text-base font-bold text-canton-ink outline-none focus:border-canton-green"
              />
            </label>

            {sent ? (
              <p className="rounded-xl bg-canton-green px-4 py-3 text-sm font-black uppercase text-white">
                If that email is approved, a sign-in link is on the way.
              </p>
            ) : null}

            {error ? (
              <p className="rounded-xl bg-canton-orange px-4 py-3 text-sm font-black uppercase text-white">
                That sign-in link is invalid or expired.
              </p>
            ) : null}

            <button
              type="submit"
              className="h-14 rounded-xl bg-canton-green px-4 text-base font-black uppercase tracking-wide text-white"
            >
              Send Sign-In Link
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
