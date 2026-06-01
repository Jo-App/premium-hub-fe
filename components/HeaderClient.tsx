"use client";

import { useState } from "react";
import type { SiteMenu } from "@/app/lib/api";

export default function HeaderClient({ menus }: { menus: SiteMenu[] }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14 md:h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-full bg-[var(--brand)] flex items-center justify-center">
            <span className="text-white text-xs font-bold">B</span>
          </div>
          <span className="font-bold text-sm text-[var(--foreground)] hidden sm:block">
            Busan Private Rentals
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {menus.map((m) => (
            <a
              key={m.id}
              href={m.link_url}
              className="px-3 py-2 text-sm text-gray-600 hover:text-[var(--brand)] transition-colors rounded-lg hover:bg-[var(--brand-light)]"
            >
              {m.name}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="hidden md:flex items-center gap-1.5 bg-[var(--brand)] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[var(--brand-dark)] transition-colors"
        >
          상담신청
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-gray-600"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="메뉴 열기"
        >
          {menuOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-1">
          {menus.map((m) => (
            <a
              key={m.id}
              href={m.link_url}
              onClick={() => setMenuOpen(false)}
              className="py-2 px-3 text-sm text-gray-700 rounded-lg hover:bg-[var(--brand-light)] hover:text-[var(--brand)]"
            >
              {m.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-2 bg-[var(--brand)] text-white text-sm font-semibold px-4 py-2.5 rounded-lg text-center"
          >
            상담신청
          </a>
        </div>
      )}
    </header>
  );
}
