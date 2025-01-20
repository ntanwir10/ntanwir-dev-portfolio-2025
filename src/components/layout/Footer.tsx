import Link from "next/link";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/ntanwir10",
    icon: FaGithub,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/naumantanwir",
    icon: FaLinkedin,
  },
  {
    name: "Mail",
    href: "mailto:ntanwir10@gmail.com",
    icon: FaEnvelope,
  },
];

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center gap-4 py-8 md:flex-row md:justify-between md:py-4">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built with{" "}
          <Link
            href="https://nextjs.org"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Next.js
          </Link>
          {" and "}
          <Link
            href="https://tailwindcss.com"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Tailwind CSS
          </Link>
        </p>
        <div className="flex gap-4">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon className="h-5 w-5" />
                <span className="sr-only">{link.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
} 