import { auth } from '@/auth'
import { getUserTier } from '@/lib/tier'
import { PLANS } from '@/lib/stripe'
import UpgradeButton from './UpgradeButton'

interface Feature {
  label: string
  free: string
  pro: string
}

const FEATURES: Feature[] = [
  { label: 'Projects', free: '3', pro: 'Unlimited' },
  { label: 'Exports / month', free: '5', pro: 'Unlimited' },
  { label: 'AI page generation', free: '✓', pro: '✓' },
  { label: 'Code download', free: '✓', pro: '✓' },
  { label: 'Vercel deploy', free: '—', pro: '✓' },
  { label: 'Priority support', free: '—', pro: '✓' },
]

export default async function PricingPage(): Promise<JSX.Element> {
  const session = await auth()
  const currentTier = session?.user?.id ? await getUserTier(session.user.id) : 'free'

  return (
    <main className="min-h-screen bg-gray-950 text-white py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2">Simple, transparent pricing</h1>
        <p className="text-center text-gray-400 mb-12">
          Start free. Upgrade when you need more.
        </p>

        {/* Plan cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Free plan */}
          <div className="relative rounded-2xl border border-gray-800 bg-gray-900 p-8 flex flex-col">
            {currentTier === 'free' && (
              <span className="absolute top-4 right-4 bg-gray-700 text-gray-300 text-xs font-semibold px-3 py-1 rounded-full">
                Current Plan
              </span>
            )}
            <h2 className="text-2xl font-bold mb-1">{PLANS.free.name}</h2>
            <div className="flex items-end gap-1 mb-2">
              <span className="text-4xl font-extrabold">$0</span>
              <span className="text-gray-400 mb-1">/mo</span>
            </div>
            <p className="text-gray-400 mb-6 text-sm">Perfect for trying out PageCraft.</p>
            <ul className="space-y-2 text-sm text-gray-300 mb-8 flex-1">
              <li>✓ {PLANS.free.projects} projects</li>
              <li>✓ {PLANS.free.exportsPerMonth} exports per month</li>
              <li>✓ AI page generation</li>
              <li>✓ Code download</li>
            </ul>
            <div className="rounded-xl border border-gray-700 bg-gray-800 py-3 text-center text-sm font-medium text-gray-400 cursor-default">
              Free forever
            </div>
          </div>

          {/* Pro plan */}
          <div className="relative rounded-2xl border border-indigo-500 bg-gray-900 p-8 flex flex-col shadow-[0_0_40px_rgba(99,102,241,0.15)]">
            {currentTier === 'pro' && (
              <span className="absolute top-4 right-4 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Current Plan
              </span>
            )}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wide">
                Most Popular
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-1">{PLANS.pro.name}</h2>
            <div className="flex items-end gap-1 mb-2">
              <span className="text-4xl font-extrabold">$19</span>
              <span className="text-gray-400 mb-1">/mo</span>
            </div>
            <p className="text-gray-400 mb-6 text-sm">Everything you need to ship fast.</p>
            <ul className="space-y-2 text-sm text-gray-300 mb-8 flex-1">
              <li>✓ Unlimited projects</li>
              <li>✓ Unlimited exports</li>
              <li>✓ AI page generation</li>
              <li>✓ Code download</li>
              <li>✓ Vercel deploy</li>
              <li>✓ Priority support</li>
            </ul>
            {currentTier === 'pro' ? (
              <div className="rounded-xl bg-indigo-800 py-3 text-center text-sm font-medium text-indigo-200 cursor-default">
                Active subscription
              </div>
            ) : (
              <UpgradeButton />
            )}
          </div>
        </div>

        {/* Feature comparison table */}
        <h2 className="text-2xl font-bold text-center mb-6">Feature comparison</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800 bg-gray-900">
                <th className="text-left px-6 py-4 font-semibold text-gray-400">Feature</th>
                <th className="px-6 py-4 font-semibold text-gray-300 text-center">Free</th>
                <th className="px-6 py-4 font-semibold text-indigo-400 text-center">Pro</th>
              </tr>
            </thead>
            <tbody>
              {FEATURES.map((feature, i) => (
                <tr
                  key={feature.label}
                  className={`border-b border-gray-800 last:border-0 ${i % 2 === 0 ? 'bg-gray-950' : 'bg-gray-900/50'}`}
                >
                  <td className="px-6 py-4 text-gray-300">{feature.label}</td>
                  <td className="px-6 py-4 text-center text-gray-400">{feature.free}</td>
                  <td className="px-6 py-4 text-center text-indigo-300 font-medium">{feature.pro}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
