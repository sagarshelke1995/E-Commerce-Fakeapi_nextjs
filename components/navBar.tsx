"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"

type NavItem = {
  href: string
  label: string
}

const navItems: NavItem[] = [
  { href: "/", label: "home" },
  { href: "/about-us", label: "about" },
  { href: "/contact-us", label: "contact" },
  { href: "/faq", label: "faq" },
  { href: "/product", label: "products" },
  { href: "/categories", label: "categories" },
]

export default function Navbar({
  onLinkClick,
}: {
  onLinkClick?: () => void
}) {
  const pathname = usePathname()

  return (
      <>
    <div className="flex flex-col md:flex-row items-center gap-6">
      {navItems.map((item) => {
        const isActive = pathname === item.href

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onLinkClick} // ✅ closes mobile menu
            aria-current={isActive ? "page" : undefined}
            className={clsx(
              "relative group font-semibold capitalize transition-colors",
              isActive
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {item.label}
            <span
              className={clsx(
                "absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300",
                isActive ? "w-full" : "w-0 group-hover:w-full"
              )}
            />
          </Link>
        )
      })}
    </div>
  </>
  )
}
