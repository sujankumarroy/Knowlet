"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { usePathname } from "next/navigation";
import { ROUTES_WITHOUT_FOOTER } from "@/config/app";

const footerLinks = {
  explore: [
    { label: "Library", href: "/library" },
    { label: "Search", href: "/search" },
  ],

  support: [
    { label: "Help", href: "/help" },
    { label: "Contact Us", href: "/contact" },
  ],

  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
};

export default function Footer() {
  const pathname = usePathname();

  if (ROUTES_WITHOUT_FOOTER.includes(pathname)) return null;

  return (
    <footer className="pb-15 border-t border-border bg-card text-foreground">
      <div className="mx-auto max-w-6xl px-5 py-12">
        {/* Main footer */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="inline-block text-xl font-bold tracking-tight"
            >
              Knowlet
            </Link>

            <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
              Free study materials, notes, previous year questions, and learning
              resources for students.
            </p>
          </div>

          {/* Explore */}
          <FooterColumn title="Explore" links={footerLinks.explore} />

          {/* Support */}
          <FooterColumn title="Support" links={footerLinks.support} />

          {/* Legal */}
          <FooterColumn title="Legal" links={footerLinks.legal} />
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Knowlet. All rights reserved.
          </p>

          <a
            href="mailto:knowlet.official@gmail.com"
            className="inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <Mail className="h-3.5 w-3.5" />
            Contact us
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
}) {
  return (
    <div>
      <h2 className="text-sm font-semibold">{title}</h2>

      <nav className="mt-4 flex flex-col gap-2.5">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="w-fit text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
