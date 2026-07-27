import Link from "next/link";

const footerLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/rules", label: "Rules" },
  { href: "/contact", label: "Contact" },
];

export function LegalFooter() {
  return (
    <footer className="bg-canton-cream-grid px-6 py-5 text-center text-[0.7rem] font-bold uppercase tracking-wide text-canton-muted">
      <nav aria-label="Legal and help links">
        <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          {footerLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="underline underline-offset-4">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
