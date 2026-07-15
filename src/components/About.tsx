const values = [
  { title: "Transparency", description: "No black boxes. You always know what we are doing and why." },
  { title: "Reliability", description: "We build for uptime. Every decision is made with stability in mind." },
  { title: "Speed", description: "Faster iteration, not shortcuts. We help you move quickly without breaking things." },
];

export default function About() {
  return (
    <section id="about" className="bg-gray-900 py-24 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-3">
              About JD-Ops
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Serious about operations.
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              JD-Ops was founded with one goal: make complex operations simple.
              We work with companies at every stage — from early-stage startups
              setting up their first production environment to enterprises
              optimizing systems at scale.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Our hands-on approach means we embed with your team, understand
              your constraints, and deliver solutions that actually stick. No
              generic playbooks — just pragmatic work that moves the needle.
            </p>
          </div>

          <div className="space-y-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="border-l-2 border-blue-500/40 pl-6"
              >
                <h3 className="text-white font-semibold mb-1">{value.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
