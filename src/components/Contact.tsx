"use client";

export default function Contact() {
  return (
    <section id="contact" className="bg-gray-950 py-24 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <p className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-3">
              // Get in touch
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Let&apos;s talk about your operations.
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              Whether you have a clear project in mind or just want to explore
              what better operations could look like for your business, we are
              happy to have that conversation.
            </p>

            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3 text-gray-400">
                <svg className="w-4 h-4 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@jd-ops.nl</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <svg className="w-4 h-4 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Amsterdam, Netherlands</span>
              </div>
            </div>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full bg-gray-900 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Email</label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="w-full bg-gray-900 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Company</label>
              <input
                type="text"
                placeholder="Your company"
                className="w-full bg-gray-900 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Message</label>
              <textarea
                rows={5}
                placeholder="Tell us about your project..."
                className="w-full bg-gray-900 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-lg transition-colors"
            >
              Send message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
