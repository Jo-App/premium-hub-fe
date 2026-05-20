"use client";

import { useState } from "react";

const navLinks = [
  { label: "분양안내", href: "#overview" },
  { label: "단지안내", href: "#features" },
  { label: "평면안내", href: "#floorplan" },
  { label: "오시는길", href: "#location" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14 md:h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-full bg-[var(--brand)] flex items-center justify-center">
            <span className="text-white text-xs font-bold">B</span>
          </div>
          <span className="text-sm font-semibold text-[var(--foreground)] hidden sm:block leading-tight">
            Busan Private Rentals
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[var(--brand)] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href="tel:1588-0000"
            className="flex items-center gap-1.5 text-sm font-medium border border-[var(--brand)] text-[var(--brand)] px-3 py-1.5 rounded hover:bg-[var(--brand-light)] transition-colors"
          >
            <PhoneIcon />
            상담 전화하기
          </a>
          <a
            href="#contact"
            className="text-sm font-medium bg-[var(--brand)] text-white px-3 py-1.5 rounded hover:bg-[var(--brand-dark)] transition-colors"
          >
            견학신청하기
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-gray-600"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="메뉴 열기"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-gray-700 py-1"
            >
              {link.label}
            </a>
          ))}
          <div className="flex gap-2 pt-2 border-t border-gray-100">
            <a
              href="tel:1588-0000"
              className="flex-1 text-center text-sm border border-[var(--brand)] text-[var(--brand)] py-2 rounded"
            >
              전화상담
            </a>
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="flex-1 text-center text-sm bg-[var(--brand)] text-white py-2 rounded"
            >
              견학신청
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
}
