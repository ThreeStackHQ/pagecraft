import Link from 'next/link';

export const metadata = {
  title: 'PageCraft — AI-Powered Landing Page Builder for Indie Hackers',
  description: 'Turn prompts into production-ready Next.js landing pages. Google Stitch AI + Monaco editor. Export or deploy to Vercel in seconds.',
  openGraph: {
    title: 'PageCraft — AI-Powered Landing Page Builder',
    description: 'Prompt to production-ready Next.js code in seconds',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PageCraft — AI Landing Page Builder',
    description: 'Turn prompts into production-ready Next.js landing pages',
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
            Landing Pages,
            <br />
            Built by AI
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Turn a simple prompt into production-ready Next.js code.
            <br />
            No templates. No drag-and-drop. Just AI + your vision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold text-lg transition-colors"
            >
              Start Building Free
            </Link>
            <Link
              href="/auth/login"
              className="px-8 py-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg font-semibold text-lg transition-colors"
            >
              View Demo
            </Link>
          </div>
          <p className="text-sm text-gray-400 mt-4">Free tier · No credit card required</p>
        </div>
      </header>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">Why PageCraft?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Feature 1: AI Design */}
          <div className="bg-gray-800/50 backdrop-blur border border-purple-500/20 rounded-xl p-8 hover:border-purple-500/40 transition-colors">
            <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">AI-Powered Design</h3>
            <p className="text-gray-400 leading-relaxed">
              Google Stitch AI generates pixel-perfect designs from your prompts. No design skills required.
            </p>
          </div>

          {/* Feature 2: Code Editor */}
          <div className="bg-gray-800/50 backdrop-blur border border-purple-500/20 rounded-xl p-8 hover:border-purple-500/40 transition-colors">
            <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Full Code Access</h3>
            <p className="text-gray-400 leading-relaxed">
              Monaco editor with TypeScript, React, and Tailwind highlighting. Edit anything.
            </p>
          </div>

          {/* Feature 3: Export/Deploy */}
          <div className="bg-gray-800/50 backdrop-blur border border-purple-500/20 rounded-xl p-8 hover:border-purple-500/40 transition-colors">
            <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Export or Deploy</h3>
            <p className="text-gray-400 leading-relaxed">
              Download as ZIP or deploy to Vercel with one click. Production-ready Next.js 14.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-4">Simple, Honest Pricing</h2>
        <p className="text-gray-400 text-center mb-12 text-lg">Build more. Pay less.</p>
        
        <div className="max-w-4xl mx-auto overflow-x-auto">
          <table className="w-full bg-gray-800/50 backdrop-blur border border-purple-500/20 rounded-xl overflow-hidden">
            <thead className="bg-purple-900/30">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">Feature</th>
                <th className="px-6 py-4 text-center font-semibold">PageCraft</th>
                <th className="px-6 py-4 text-center font-semibold text-gray-400">Framer</th>
                <th className="px-6 py-4 text-center font-semibold text-gray-400">v0.dev</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              <tr>
                <td className="px-6 py-4">Price</td>
                <td className="px-6 py-4 text-center font-bold text-purple-400">$19/mo</td>
                <td className="px-6 py-4 text-center text-gray-400">$15/mo</td>
                <td className="px-6 py-4 text-center text-gray-400">$20/mo</td>
              </tr>
              <tr>
                <td className="px-6 py-4">AI Design Generation</td>
                <td className="px-6 py-4 text-center">✅</td>
                <td className="px-6 py-4 text-center text-gray-400">❌</td>
                <td className="px-6 py-4 text-center text-gray-400">✅</td>
              </tr>
              <tr>
                <td className="px-6 py-4">Export Clean Code</td>
                <td className="px-6 py-4 text-center">✅ Next.js</td>
                <td className="px-6 py-4 text-center text-gray-400">❌ Proprietary</td>
                <td className="px-6 py-4 text-center text-gray-400">✅ React</td>
              </tr>
              <tr>
                <td className="px-6 py-4">One-Click Deploy</td>
                <td className="px-6 py-4 text-center">✅ Vercel</td>
                <td className="px-6 py-4 text-center text-gray-400">✅ Framer</td>
                <td className="px-6 py-4 text-center text-gray-400">❌</td>
              </tr>
              <tr>
                <td className="px-6 py-4">Code Editor</td>
                <td className="px-6 py-4 text-center">✅ Monaco</td>
                <td className="px-6 py-4 text-center text-gray-400">❌</td>
                <td className="px-6 py-4 text-center text-gray-400">✅</td>
              </tr>
              <tr className="bg-purple-900/20">
                <td className="px-6 py-4 font-bold">Best For</td>
                <td className="px-6 py-4 text-center text-sm">
                  <span className="text-purple-400 font-semibold">Indie Hackers</span>
                  <br />
                  <span className="text-gray-400">Full code control</span>
                </td>
                <td className="px-6 py-4 text-center text-sm text-gray-400">
                  Designers
                  <br />
                  No-code sites
                </td>
                <td className="px-6 py-4 text-center text-sm text-gray-400">
                  Developers
                  <br />
                  UI components
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="text-center mt-8">
          <Link
            href="/pricing"
            className="inline-block px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors"
          >
            View Full Pricing
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-20 bg-gray-900/50">
        <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center font-bold text-xl">
              1
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Describe Your Vision</h3>
              <p className="text-gray-400">
                Write a prompt like "SaaS landing page with hero, pricing table, and FAQ section"
              </p>
            </div>
          </div>

          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center font-bold text-xl">
              2
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">AI Generates Design + Code</h3>
              <p className="text-gray-400">
                Google Stitch creates the design. Our engine converts it to clean Next.js 14 + Tailwind code.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center font-bold text-xl">
              3
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Edit & Customize</h3>
              <p className="text-gray-400">
                Use Monaco editor to tweak anything. Live preview shows changes instantly.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center font-bold text-xl">
              4
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Export or Deploy</h3>
              <p className="text-gray-400">
                Download ZIP with full Next.js project, or deploy to Vercel with one click.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Placeholder */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto bg-gray-800/50 backdrop-blur border border-purple-500/20 rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">See It In Action</h2>
          <p className="text-gray-400 mb-8">
            Watch how PageCraft turns prompts into production-ready landing pages
          </p>
          <div className="aspect-video bg-gray-900/80 rounded-lg border border-purple-500/30 flex items-center justify-center">
            <div className="text-center">
              <svg className="w-20 h-20 mx-auto mb-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-400">Demo video coming soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="container mx-auto px-4 py-16 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400 mb-6">Built With</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="px-6 py-3 bg-gray-800/50 rounded-lg border border-gray-700">
              <span className="font-semibold text-gray-300">Next.js 14</span>
            </div>
            <div className="px-6 py-3 bg-gray-800/50 rounded-lg border border-gray-700">
              <span className="font-semibold text-gray-300">TypeScript</span>
            </div>
            <div className="px-6 py-3 bg-gray-800/50 rounded-lg border border-gray-700">
              <span className="font-semibold text-gray-300">Tailwind CSS</span>
            </div>
            <div className="px-6 py-3 bg-gray-800/50 rounded-lg border border-gray-700">
              <span className="font-semibold text-gray-300">Google Stitch AI</span>
            </div>
            <div className="px-6 py-3 bg-gray-800/50 rounded-lg border border-gray-700">
              <span className="font-semibold text-gray-300">Vercel</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur border border-purple-500/30 rounded-2xl p-12">
          <h2 className="text-4xl font-bold mb-4">Ready to Build?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join indie hackers shipping landing pages in minutes, not days.
          </p>
          <Link
            href="/auth/signup"
            className="inline-block px-10 py-4 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold text-lg transition-colors shadow-lg shadow-purple-500/20"
          >
            Start Free Trial
          </Link>
          <p className="text-sm text-gray-400 mt-4">3 free projects · Upgrade anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-gray-800">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2026 PageCraft by ThreeStack. Built for indie hackers.
          </p>
          <div className="flex gap-6">
            <Link href="/pricing" className="text-gray-400 hover:text-white text-sm transition-colors">
              Pricing
            </Link>
            <Link href="/auth/login" className="text-gray-400 hover:text-white text-sm transition-colors">
              Login
            </Link>
            <a
              href="https://github.com/ThreeStackHQ/pagecraft"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
