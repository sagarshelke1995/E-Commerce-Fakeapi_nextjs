import Link from "next/link";
import { Facebook, Twitter, Instagram, Github } from "lucide-react";
import { AuroraTextEffect } from "@/components/lightswind/aurora-text-effect";

const footerLinks = [
  {
    title: "Shop",
    links: [
      { name: "Home", href: "/" },
      { name: "Products", href: "/product" },
      { name: "Categories", href: "/categories" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "About Us", href: "/about-us" },
      { name: "Contact", href: "/contact-us" },
      { name: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms & Conditions", href: "/terms-and-conditions" },
      { name: "Cookie Policy", href: "/cookie-policy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-gray-100 to-gray-50 dark:from-zinc-900 dark:to-zinc-800 text-gray-900 dark:text-white pt-12">
      <div className="mx-auto max-w-7xl px-6 md:px-12 grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Brand & Description */}
        <div className="md:col-span-2">
          <Link href="/" className="text-3xl font-bold tracking-tight">
            <AuroraTextEffect
              text="MyStore"
              fontSize="clamp(2.2rem, 9vw, 4.5rem)"
              blurAmount="blur-md md:blur-lg"
              colors={{
                first: "bg-cyan-400",
                second: "bg-yellow-400",
                third: "bg-green-400",
                fourth: "bg-purple-500",
              }}
            />
          </Link>

          <p className="mt-3 max-w-sm text-sm text-gray-600 dark:text-gray-300">
            Your one-stop shop for modern products. Built with Next.js, Tailwind CSS & shadcn UI.
          </p>

          <div className="flex mt-4 gap-3">
            {[Facebook, Twitter, Instagram, Github].map((Icon, i) => (
              <Link
                key={i}
                href="#"
                aria-label={`social-${i}`}
                className="rounded-full border border-gray-300 dark:border-gray-600 p-2 hover:bg-indigo-600 hover:border-indigo-500 transition"
              >
                <Icon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
              </Link>
            ))}
          </div>
        </div>

        {/* Footer Links */}
        {footerLinks.map((section) => (
          <div key={section.title}>
            <h4 className="mb-4 font-semibold text-lg border-b border-gray-300 dark:border-gray-600 pb-1">
              {section.title}
            </h4>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              {section.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-indigo-500 transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t border-gray-300 dark:border-gray-700 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} MyStore. All rights reserved.
      </div>
    </footer>
  );
}
