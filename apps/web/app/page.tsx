import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PageCraft — AI Landing Page Builder for Indie Hackers',
  description: 'Turn prompts into production-ready Next.js landing pages. Google Stitch AI + Monaco editor. Export or deploy to Vercel in seconds. Free tier available.',
  keywords: ['landing page builder', 'AI website builder', 'Next.js', 'indie hacker', 'no-code', 'Vercel', 'Tailwind CSS'],
  authors: [{ name: 'ThreeStack', url: 'https://threestack.io' }],
  openGraph: {
    title: 'PageCraft — AI Landing Page Builder for Indie Hackers',
    description: 'Turn prompts into production-ready Next.js landing pages in seconds. Free tier, no credit card.',
    url: 'https://pagecraft.threestack.io',
    siteName: 'PageCraft',
    type: 'website',
    images: [
      {
        url: 'https://pagecraft.threestack.io/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PageCraft — AI Landing Page Builder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PageCraft — AI Landing Page Builder',
    description: 'Turn prompts into production-ready Next.js landing pages. Free tier available.',
    creator: '@threestack_io',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: 'https://pagecraft.threestack.io',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'PageCraft',
  applicationCategory: 'DeveloperApplication',
  description: 'AI-powered landing page builder for indie hackers. Prompt to production-ready Next.js code.',
  url: 'https://pagecraft.threestack.io',
  author: {
    '@type': 'Organization',
    name: 'ThreeStack',
    url: 'https://threestack.io',
  },
  offers: [
    {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      name: 'Free',
      description: '3 projects, 5 exports/month',
    },
    {
      '@type': 'Offer',
      price: '9',
      priceCurrency: 'USD',
      name: 'Pro',
      description: 'Unlimited projects and exports',
    },
  ],
  featureList: [
    'AI design generation with Google Stitch',
    'Monaco code editor with TypeScript support',
    'One-click Vercel deployment',
    'ZIP export with full Next.js project',
    'Templates gallery',
  ],
};

const testimonials = [
  {
    name: 'Alex Chen',
    role: 'Indie Hacker',
    avatar: 'AC',
    quote: "Shipped my SaaS landing page in 20 minutes. Used to take me days. PageCraft is the real deal.",
  },
  {
    name: 'Sarah K.',
    role: 'Founder, DevTools.io',
    avatar: 'SK',
    quote: "Finally an AI tool that gives me real Next.js code. Not some drag-and-drop prison with vendor lock-in.",
  },
  {
    name: 'Marcus R.',
    role: 'Solo Developer',
    avatar: 'MR',
    quote: "Generated 4 landing page variants in an hour for A/B testing. The code export is actually clean.",
  },
];

const features = [
  {
    icon: (
      <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'AI-Powered Design',
    description: 'Google Stitch AI generates pixel-perfect designs from your prompts. No design skills needed.',
  },
  {
    icon: (
      <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: 'Monaco Code Editor',
    description: 'Edit every pixel with VS Code-quality TypeScript/React/Tailwind highlighting and autocomplete.',
  },
  {
    icon: (
      <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
    title: 'One-Click Deploy',
    description: 'Export as ZIP or deploy to Vercel instantly. Get a production URL in under 60 seconds.',
  },
  {
    icon: (
      <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    title: 'Templates Gallery',
    description: 'Start from 15+ battle-tested templates: SaaS, Portfolio, E-commerce, Blog. Fully editable.',
  },
  {
    icon: (
      <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Clean Code Output',
    description: 'Get real, maintainable Next.js 14 + TypeScript + Tailwind CSS. No proprietary formats.',
  },
  {
    icon: (
      <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
      </svg>
    ),
    title: 'Live Preview',
    description: 'Instant preview as you edit. Desktop, tablet, and mobile breakpoints at a glance.',
  },
];

export default function LandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-gray-950 text-white">

        {/* Nav */}
        <nav className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur border-b border-gray-800/50">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="font-bold text-lg">PageCraft</span>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm">
              <Link href="#features" className="text-gray-400 hover:text-white transition-colors">Features</Link>
              <Link href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link>
              <Link href="#testimonials" className="text-gray-400 hover:text-white transition-colors">Reviews</Link>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/auth/login" className="text-sm text-gray-400 hover:text-white transition-colors">
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-semibold transition-colors"
              >
                Start Free
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="container mx-auto px-4 pt-20 pb-16 text-center">
          <div className="max-w-5xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-900/40 border border-purple-500/30 rounded-full text-purple-300 text-sm mb-8">
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              Powered by Google Stitch AI
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
                Landing Pages
              </span>
              <br />
              <span className="text-white">Built by AI,</span>
              <br />
              <span className="text-white">Owned by You</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed max-w-3xl mx-auto">
              Describe your product. Get production-ready Next.js code.
              <br className="hidden md:block" />
              Edit in Monaco. Deploy to Vercel in seconds.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link
                href="/auth/signup"
                className="px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold text-lg transition-colors shadow-lg shadow-purple-500/20"
              >
                Build My Landing Page →
              </Link>
              <Link
                href="#demo"
                className="px-8 py-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg font-semibold text-lg transition-colors"
              >
                Watch Demo
              </Link>
            </div>
            <p className="text-sm text-gray-500">Free tier · 3 projects · No credit card required</p>

            {/* Browser mockup */}
            <div id="demo" className="mt-16 max-w-4xl mx-auto">
              <div className="bg-gray-800/60 backdrop-blur border border-gray-700/50 rounded-xl overflow-hidden shadow-2xl shadow-purple-900/20">
                <div className="bg-gray-900 flex items-center gap-2 px-4 py-3 border-b border-gray-700/50">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/70" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                    <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  </div>
                  <div className="flex-1 mx-4 bg-gray-800 rounded text-xs text-gray-400 px-3 py-1 text-center">
                    pagecraft.threestack.io/dashboard
                  </div>
                </div>
                <div className="aspect-video bg-gradient-to-br from-gray-900 via-purple-950/30 to-gray-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-purple-500/30">
                      <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-gray-400 text-sm">Demo video coming soon</p>
                    <p className="text-gray-600 text-xs mt-1">PageCraft Editor Preview</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* How It Works */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4">From Prompt to Production</h2>
            <p className="text-gray-400 text-lg">Four steps. Minutes, not days.</p>
          </div>
          <div className="max-w-3xl mx-auto">
            {[
              { step: '01', title: 'Describe Your Vision', desc: 'Type a prompt like "SaaS landing page, dark mode, pricing section, FAQ"' },
              { step: '02', title: 'AI Generates Design', desc: 'Google Stitch creates a pixel-perfect design. Takes about 60 seconds.' },
              { step: '03', title: 'Edit With Monaco', desc: 'Open the full Monaco editor. TypeScript, Tailwind, React — full code access.' },
              { step: '04', title: 'Export or Deploy', desc: 'Download a complete Next.js ZIP, or push to Vercel with one click.' },
            ].map(({ step, title, desc }, i) => (
              <div key={i} className="flex items-start gap-6 mb-10 last:mb-0">
                <div className="flex-shrink-0 w-14 h-14 bg-purple-600/20 border border-purple-500/30 rounded-xl flex items-center justify-center">
                  <span className="text-purple-400 font-bold text-sm">{step}</span>
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold mb-2">{title}</h3>
                  <p className="text-gray-400 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="container mx-auto px-4 py-20">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4">Everything You Need to Ship</h2>
            <p className="text-gray-400 text-lg">No subscriptions to tools you don&apos;t need.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-gray-900/60 border border-gray-800 rounded-xl p-6 hover:border-purple-500/30 transition-colors group"
              >
                <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-600/30 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison Table */}
        <section id="pricing" className="container mx-auto px-4 py-20">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4">How We Compare</h2>
            <p className="text-gray-400 text-lg">Full code control. No lock-in. Indie-hacker pricing.</p>
          </div>
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full bg-gray-900/60 border border-gray-800 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-800/50 border-b border-gray-700">
                  <th className="px-6 py-4 text-left font-semibold text-gray-300">Feature</th>
                  <th className="px-6 py-4 text-center font-semibold">
                    <span className="text-purple-400">PageCraft</span>
                    <br />
                    <span className="text-xs text-gray-400 font-normal">Free / $9/mo</span>
                  </th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-400">
                    Framer
                    <br />
                    <span className="text-xs font-normal">$15/mo</span>
                  </th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-400">
                    v0.dev
                    <br />
                    <span className="text-xs font-normal">$20/mo</span>
                  </th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-400">
                    Carrd
                    <br />
                    <span className="text-xs font-normal">$19/yr</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {[
                  ['AI Design Generation', '✅', '❌', '✅', '❌'],
                  ['Export Clean Code', '✅ Next.js', '❌ Proprietary', '✅ React', '❌'],
                  ['Monaco Code Editor', '✅', '❌', '✅', '❌'],
                  ['One-Click Vercel Deploy', '✅', '✅ Framer', '❌', '❌'],
                  ['Custom Domain', '✅', '✅', '❌', '✅'],
                  ['Free Tier', '✅', '✅', '✅', '✅'],
                  ['Production-Ready Output', '✅', '⚠️', '✅', '❌'],
                ].map(([feature, ...cols], i) => (
                  <tr key={i} className="hover:bg-gray-800/20 transition-colors">
                    <td className="px-6 py-4 text-gray-300">{feature}</td>
                    <td className="px-6 py-4 text-center text-purple-300 font-medium">{cols[0]}</td>
                    <td className="px-6 py-4 text-center text-gray-400">{cols[1]}</td>
                    <td className="px-6 py-4 text-center text-gray-400">{cols[2]}</td>
                    <td className="px-6 py-4 text-center text-gray-400">{cols[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pricing cards */}
          <div className="max-w-2xl mx-auto mt-16 grid md:grid-cols-2 gap-6">
            <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-8">
              <h3 className="font-bold text-xl mb-1">Free</h3>
              <div className="text-3xl font-extrabold mb-4">$0 <span className="text-sm font-normal text-gray-400">/month</span></div>
              <ul className="space-y-2 mb-8 text-sm text-gray-300">
                {['3 projects', '5 exports/month', 'Monaco editor', 'ZIP download', 'Community support'].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/auth/signup" className="block text-center py-3 border border-gray-700 hover:border-gray-600 rounded-lg font-semibold transition-colors">
                Get Started Free
              </Link>
            </div>
            <div className="bg-purple-600/10 border border-purple-500/50 rounded-xl p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-purple-600 text-xs font-bold rounded-full">
                MOST POPULAR
              </div>
              <h3 className="font-bold text-xl mb-1">Pro</h3>
              <div className="text-3xl font-extrabold mb-4 text-purple-300">$9 <span className="text-sm font-normal text-gray-400">/month</span></div>
              <ul className="space-y-2 mb-8 text-sm text-gray-300">
                {['Unlimited projects', 'Unlimited exports', 'Vercel deployment', 'Templates gallery', 'Priority support'].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-purple-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/auth/signup?plan=pro" className="block text-center py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold transition-colors">
                Start Pro Trial
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="container mx-auto px-4 py-20">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4">Indie Hackers Love PageCraft</h2>
            <p className="text-gray-400 text-lg">Built by hackers, for hackers.</p>
          </div>
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-gray-900/60 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-600/30 rounded-full flex items-center justify-center text-purple-300 font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.role}</p>
                  </div>
                </div>
                <div className="mb-3 flex">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-purple-900/30 via-purple-900/20 to-pink-900/20 border border-purple-500/20 rounded-2xl p-12">
            <h2 className="text-4xl font-bold mb-4">Ship Your First Page Today</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join indie hackers shipping landing pages in minutes, not weeks.
            </p>
            <Link
              href="/auth/signup"
              className="inline-block px-10 py-4 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold text-lg transition-colors shadow-lg shadow-purple-500/20"
            >
              Build My Landing Page — Free
            </Link>
            <p className="text-sm text-gray-500 mt-4">No credit card · 3 free projects · Cancel anytime</p>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="container mx-auto px-4 pb-12">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-600 text-sm mb-6">Built with</p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              {['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Google Stitch AI', 'Monaco Editor', 'Vercel'].map((tech) => (
                <div key={tech} className="px-4 py-2 bg-gray-900 rounded-lg border border-gray-800">
                  <span className="text-gray-400 text-sm">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-900 py-8">
          <div className="container mx-auto px-4 max-w-5xl flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-gray-400 text-sm">© 2026 PageCraft by ThreeStack</span>
            </div>
            <div className="flex gap-6 text-sm">
              {[
                { label: 'Pricing', href: '/pricing' },
                { label: 'Login', href: '/auth/login' },
                { label: 'Sign Up', href: '/auth/signup' },
                { label: 'GitHub', href: 'https://github.com/ThreeStackHQ/pagecraft' },
              ].map(({ label, href }) => (
                <Link key={label} href={href} className="text-gray-500 hover:text-white transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
