const activeNetworks = ["Solana", "Avalanche", "Monad", "Harmony"];

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center bg-gray-950 relative overflow-hidden pt-28">
      {/* dot grid */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* blue glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-24 relative z-10 w-full">
        <p className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-6">
          Validator Operations &amp; Infrastructure Consulting
        </p>

        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6 max-w-3xl">
          Operations that{" "}
          <span className="text-blue-400">scale with you.</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
          JD-Ops runs professional validator infrastructure and helps businesses
          streamline operations — from bare-metal nodes to full-stack DevOps.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <a
            href="#networks"
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-medium px-8 py-4 rounded-lg transition-colors"
          >
            View networks
          </a>
          <a
            href="#services"
            className="inline-flex items-center justify-center border border-white/20 hover:border-white/40 text-white font-medium px-8 py-4 rounded-lg transition-colors"
          >
            Our services
          </a>
        </div>

        {/* active networks row */}
        <div className="border-t border-white/10 pt-8">
          <p className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-4">
            Active on
          </p>
          <div className="flex flex-wrap gap-3">
            {activeNetworks.map((name) => (
              <div
                key={name}
                className="flex items-center gap-2 bg-gray-900 border border-white/10 rounded-lg px-4 py-2.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="text-white text-sm font-medium">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
