export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-white/10 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <a href="#" className="flex items-center gap-2">
<span className="text-white font-bold text-lg tracking-tight">
            JD-<span className="text-blue-500">Ops</span>
          </span>
        </a>

        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} JD-Ops. All rights reserved.
        </p>

        <div className="flex gap-6 text-sm text-gray-500">
          <a href="#networks" className="hover:text-gray-300 transition-colors">
            Networks
          </a>
          <a href="#services" className="hover:text-gray-300 transition-colors">
            Services
          </a>
          <a href="#about" className="hover:text-gray-300 transition-colors">
            About
          </a>
        </div>
      </div>
    </footer>
  );
}
