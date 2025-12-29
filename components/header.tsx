import Link from "next/link"

import NavBar from "./navBar"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Header() {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        <Link href="/" className="text-lg font-semibold text-foreground">
          MyApp
        </Link>

        <nav className="flex items-center gap-6">
            <NavBar/>
          <div className="min-w-9">
           <ThemeToggle /></div>
        </nav>
      </div>
    </header>
  )
}
