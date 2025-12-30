"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";

import NavBar from "./navBar";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">

          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl"
          >
            <span className="rounded-lg bg-indigo-600 px-2 py-1 text-white">
              M
            </span>
            <span className="hidden sm:block">MyStore</span>
          </Link>

          {/* DESKTOP */}
          <div className="hidden md:flex items-center gap-6">
            <NavBar />

            <Link
              href="/cart"
              className="relative rounded-xl p-2 hover:bg-muted transition"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-indigo-600 text-[10px] text-white flex items-center justify-center">
                2
              </span>
            </Link>

            <ThemeToggle />
          </div>

          {/* MOBILE ACTIONS */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />

            <Link
              href="/cart"
              className="relative rounded-xl p-2 hover:bg-muted transition"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-indigo-600 text-[10px] text-white flex items-center justify-center">
                2
              </span>
            </Link>

            <button
              onClick={() => setOpen(!open)}
              className="rounded-xl p-2 hover:bg-muted transition"
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        ref={menuRef}
        className={`absolute left-0 right-0 top-full z-40 transition-all duration-300 ease-out md:hidden
        ${open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"}`}
      >
        <div className="mx-3 mt-2 rounded-2xl border border-border bg-background shadow-xl backdrop-blur-lg">
          <div className="flex flex-col gap-3 p-4">

            {/* NAV LINKS */}
            <NavBar onLinkClick={() => setOpen(false)} />

            
          </div>
        </div>
      </div>
    </header>
  );
}
