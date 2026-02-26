'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/dashboard';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const result = await signIn('credentials', { email, password, redirect: false });
      if (result?.error) {
        setError('Invalid email or password.');
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch { setError('Something went wrong.'); }
    finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="w-full max-w-sm space-y-6 rounded-xl border border-gray-800 bg-gray-900 p-8 shadow-xl">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl">✨</span>
            <span className="text-2xl font-bold text-white">PageCraft</span>
          </div>
          <p className="text-sm text-gray-400">Sign in to your account</p>
        </div>

        {error && <div className="rounded-md bg-red-950 px-4 py-3 text-sm text-red-400 border border-red-800">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-300">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              className="mt-1 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-300">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
              className="mt-1 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500" />
          </div>
          <button type="submit" disabled={loading}
            className="w-full rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-500 disabled:opacity-50">
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-500">
          No account?{' '}<Link href="/auth/signup" className="text-violet-400 font-medium hover:underline">Create one free</Link>
        </p>
      </div>
    </div>
  );
}
