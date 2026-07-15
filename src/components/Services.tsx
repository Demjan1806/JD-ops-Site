const services = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    ),
    title: "Infrastructure Management",
    description:
      "Design, deploy, and maintain robust infrastructure tailored to your scale — from bare metal to fully managed cloud.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    title: "Cloud Operations",
    description:
      "Multi-cloud strategy, cost optimisation, and continuous delivery pipelines that keep your deployments fast and safe.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: "Process Automation",
    description:
      "Eliminate manual overhead with automated workflows, CI/CD pipelines, and infrastructure-as-code practices.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Monitoring & Reliability",
    description:
      "Full-stack observability, alerting, and on-call runbooks so issues are caught and resolved before they reach your users.",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-gray-950 py-24 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14">
          <p className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-3">
            What we do
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Services built for reliability
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-gray-900 border border-white/10 rounded-xl p-8 hover:border-lime-500/30 transition-colors group"
            >
              <div className="text-lime-400 mb-4 group-hover:text-lime-300 transition-colors">
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">
                {service.title}
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
