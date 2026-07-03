# Top Dog Hoops Domain Setup

Canonical app name:

* Top Dog Hoops

Planned domain:

* `topdoghoops.com`
* `www.topdoghoops.com`

---

## Current Namecheap State

The screenshot shows the domain still using default/parking-style records:

* `www` CNAME points to `parkingpage.namecheap.com.`
* `@` uses a URL redirect to the `www` domain
* Mail settings are using Namecheap email forwarding

This is fine before launch, but these web records need to change once the Vercel project is ready.

---

## Vercel Setup

In Vercel:

1. Open the Top Dog Hoops project.
2. Go to Project Settings.
3. Open Domains.
4. Add `topdoghoops.com`.
5. Also add `www.topdoghoops.com` if Vercel does not add it automatically.
6. Follow the exact DNS values Vercel shows for the project.

Vercel's current guidance:

* Apex domains like `topdoghoops.com` use an A record.
* Subdomains like `www.topdoghoops.com` use a CNAME record.

Source: https://vercel.com/docs/domains/working-with-domains/add-a-domain

---

## Expected Namecheap Web Records

Use Vercel's dashboard as the source of truth, but the usual setup is:

| Type | Host | Value | TTL |
| --- | --- | --- | --- |
| A Record | `@` | Vercel-provided apex IP | Automatic or 30 min |
| CNAME Record | `www` | Vercel-provided CNAME target | Automatic or 30 min |

Important:

* Delete the `www` record pointing to `parkingpage.namecheap.com.`
* Delete the `@` URL Redirect Record before adding the Vercel apex record.
* Keep email forwarding records only if email forwarding is still needed.
* Do not change nameservers unless you decide to move DNS management into Vercel.

---

## App URL References

Use this base URL in production environment variables:

```txt
APP_BASE_URL=https://topdoghoops.com
```

Use this for parent invite and child pairing links:

```txt
https://topdoghoops.com/invite/accept?token=...
https://topdoghoops.com/pair/...
```
