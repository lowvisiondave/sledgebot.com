"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/familiars", label: "Familiars" },
  { href: "/tasks", label: "Tasks" },
  { href: "/now", label: "Now" },
  { href: "/quests", label: "Quests" },
  { href: "/workshop", label: "Workshop" },
  { href: "/colophon", label: "Colophon" },
  { href: "/status", label: "Status" },
];

const mobileItems = [
  ...navItems,
  { href: "/skills", label: "Skills" },
  { href: "/stack", label: "Stack" },
  { href: "/random", label: "Random" },
  { href: "/guestbook", label: "Guestbook" },
  { href: "/links", label: "Links" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-accent/5">
      <nav className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="flex items-center gap-1 text-lg">
            <span>🤖</span>
            <span>🦞</span>
          </div>
          <span className="font-bold text-accent text-sm tracking-tight hidden sm:block">
            Digital Familiars
          </span>
        </Link>
        
        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-0.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 text-sm rounded-md transition-all font-medium ${
                  isActive
                    ? "text-accent bg-accent/10"
                    : "text-text-dim hover:text-accent hover:bg-accent/5"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile dropdown */}
        <div className="sm:hidden" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md text-text-dim hover:text-accent hover:bg-accent/5 transition-all"
          >
            <span>Menu</span>
            <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>▼</span>
          </button>
          
          {isOpen && (
            <div className="absolute right-4 top-full mt-2 w-40 py-2 bg-background border border-accent/20 rounded-lg shadow-lg max-h-[70vh] overflow-y-auto">
              {mobileItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-4 py-2 text-sm transition-all ${
                      isActive
                        ? "text-accent bg-accent/10"
                        : "text-text-dim hover:text-accent hover:bg-accent/5"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
