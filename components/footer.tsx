import Link from "next/link";
import { Facebook, Twitter, Instagram, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-zinc-900 to-zinc-800 text-white pt-12">
      
      <div className="mx-auto max-w-7xl px-6 md:px-12 grid grid-cols-1 md:grid-cols-5 gap-10">
        
        {/* Brand & Description */}
        <div className="md:col-span-2">
          <Link href="/" className="text-3xl font-bold tracking-tight">
            MyStore
          </Link>
          <p className="mt-3 max-w-sm text-sm text-gray-300">
            Your one-stop shop for modern products. Built with Next.js, Tailwind CSS & shadcn UI.
          </p>
          <div className="flex mt-4 gap-3">
            {[Facebook, Twitter, Instagram, Github].map((Icon, i) => (
              <Link
                key={i}
                href="#"
                aria-label={`social-${i}`}
                className="rounded-full border border-gray-600 p-2 hover:bg-indigo-600 hover:border-indigo-500 transition"
              >
                <Icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="mb-4 font-semibold text-lg border-b border-gray-700 pb-1">
            Shop
          </h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link href="/" className="hover:text-indigo-500 transition">Home</Link>
            </li>
            <li>
              <Link href="/about-us" className="hover:text-indigo-500 transition">About Us</Link>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="mb-4 font-semibold text-lg border-b border-gray-700 pb-1">
            Support
          </h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link href="/contact-us" className="hover:text-indigo-500 transition">Contact</Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-indigo-500 transition">FAQ</Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="mb-4 font-semibold text-lg border-b border-gray-700 pb-1">
            Legal
          </h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link href="/privacy-policy" className="hover:text-indigo-500 transition">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms-and-conditions" className="hover:text-indigo-500 transition">Terms & Conditions</Link>
            </li>
            <li>
              <Link href="/cookie-policy" className="hover:text-indigo-500 transition">Cookie Policy</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t border-gray-700 py-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} MyStore. All rights reserved.
      </div>
    </footer>
  );
}
