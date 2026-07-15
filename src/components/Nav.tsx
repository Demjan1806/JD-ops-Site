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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gray-950/98 backdrop-blur-sm"
          : "bg-gray-950"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-24 flex items-center justify-between">
        <a href="#" className="flex items-center gap-4">
          <img
            src="https://jdo-jb.github.io/jdo-site/JDO-logo.png"
            alt="JDO"
            className="h-16 w-16 rounded-full object-cover ring-2 ring-lime-500/30 shadow-lg shadow-blue-900/40"
          />
          <div className="flex flex-col leading-none gap-1">
            <span className="text-white font-bold text-3xl tracking-tight">
              JD-<span className="text-lime-400">Ops</span>
            </span>
            <span className="font-mono text-gray-500 text-xs tracking-widest uppercase">
              Validator Infrastructure
            </span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-gray-400 hover:text-lime-400 transition-colors tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* gradient bottom border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, #3b82f6, #14b8a6 50%, #a3e635)" }}
      />
    </nav>
  );
}
