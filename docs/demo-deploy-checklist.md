# Demo Deploy Checklist

Goal: get a shareable Top Dog Hoops demo live for review.

The current demo is frontend-only and uses mocked data. Supabase and Resend are documented but not required for this demo.

---

## 1. Confirm Local Build

If the local dev server is running, stop it first with `Ctrl + C`. Next.js dev and build both use `.next`, so running them at the same time can create stale cache errors.

From the project folder:

```bash
./scripts/build-local.sh
```

If `pnpm` is available globally, this also works:

```bash
pnpm build
```

---

## 2. Push Latest Code to GitHub

Use the GitHub repo connected to Vercel.

Recommended commit message:

```txt
Rename to Top Dog Hoops and prepare demo deploy
```

---

## 3. Create or Open Vercel Project

In Vercel:

1. Add New Project.
2. Import the GitHub repo.
3. Framework preset should be Next.js.
4. Build command should be:

```txt
pnpm build
```

5. Install command should be:

```txt
pnpm install
```

6. Output directory should stay as the default.

---

## 4. Environment Variables

For this UI-only demo, no Supabase or Resend variables are required yet.

Optional for demo:

```txt
APP_BASE_URL=https://YOUR-VERCEL-DEMO-URL.vercel.app
```

After the domain is connected:

```txt
APP_BASE_URL=https://topdoghoops.com
```

---

## 5. Deploy Preview URL

Before connecting the custom domain, send the temporary Vercel URL to your friend/client.

Suggested review links:

* `/`
* `/invite/accept`
* `/parent/link-request`
* `/family`
* `/family/marcus-johnson/device-setup`
* `/pair/test-token`
* `/player`
* `/player-entry`
* `/leaderboards`
* `/parent-approval`
* `/parent-approval/submission-1`

---

## 6. Connect Domain

Follow:

* `/docs/domain-setup.md`

Use the exact DNS values Vercel shows for the project.

---

## 7. Demo Caveats

Tell reviewers:

* This is a clickable frontend demo.
* Data is mocked.
* Parent email links are not sending yet.
* QR code is decorative for now.
* Supabase approval/submission storage comes next.
