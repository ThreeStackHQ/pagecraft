'use client'

import { useState } from 'react'

export default function UpgradeButton(): JSX.Element {
  const [loading, setLoading] = useState(false)

  async function handleUpgrade(): Promise<void> {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier: 'pro' }),
      })
      const data: unknown = await res.json()
      const { url } = data as { url: string }
      if (url) {
        window.location.href = url
      }
    } catch (err) {
      console.error('Checkout error:', err)
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleUpgrade}
      disabled={loading}
      className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed py-3 text-center text-sm font-semibold text-white transition-colors"
    >
      {loading ? 'Redirecting…' : 'Upgrade to Pro'}
    </button>
  )
}
