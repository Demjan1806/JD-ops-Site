const stats = [
  { value: "50+", label: "Projects delivered", sub: "Across all verticals" },
  { value: "30+", label: "Clients served", sub: "From startups to enterprise" },
  { value: "8+", label: "Years experience", sub: "In validator operations" },
];

export default function Stats() {
  return (
    <section className="bg-gray-900 border-y border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`py-8 sm:py-0 sm:px-8 ${i === 0 ? "sm:pl-0" : ""} ${i === stats.length - 1 ? "sm:pr-0" : ""}`}
            >
              <div className="w-12 h-0.5 mb-4 rounded-full" style={{ background: "linear-gradient(90deg, #3b82f6, #a3e635)" }} />
              <div className="text-4xl font-bold mb-1 brand-gradient">{stat.value}</div>
              <div className="text-sm font-medium text-gray-300 mb-1">{stat.label}</div>
              <div className="font-mono text-xs text-gray-500">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
