"use client";

import { useState, useEffect } from "react";

const links = [
  { label: "Networks", href: "#networks" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-gray-950/98 backdrop-blur-sm border-white/10"
          : "bg-gray-950 border-white/10"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#" className="flex flex-col leading-none gap-0.5">
          <span className="text-white font-bold text-2xl tracking-tight">
            JD-<span className="text-blue-500">Ops</span>
          </span>
          <span className="font-mono text-gray-500 text-xs tracking-widest uppercase">
            Validator Infrastructure
          </span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-gray-400 hover:text-white transition-colors tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
