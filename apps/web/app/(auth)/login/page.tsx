import * as React from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LoginPage(): React.JSX.Element {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      {/* Background gradient */}
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-br from-violet-950/30 via-background to-background" />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600 violet-glow mb-3">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">PageCraft</h1>
          <p className="text-sm text-muted-foreground mt-1">
            AI-powered landing pages
          </p>
        </div>

        {/* Login card */}
        <div className="glass-card rounded-2xl p-8 space-y-4">
          <div className="text-center mb-2">
            <h2 className="text-lg font-semibold text-foreground">
              Welcome back
            </h2>
            <p className="text-sm text-muted-foreground">
              Sign in to your account
            </p>
          </div>

          {/* Placeholder form — auth to be wired in Sprint 1.7 */}
          <div className="space-y-3">
            <input
              type="email"
              placeholder="Email address"
              className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <Button className="w-full" asChild>
              <Link href="/dashboard">Sign in</Link>
            </Button>
          </div>

          <p className="text-center text-xs text-muted-foreground pt-2">
            Don&apos;t have an account?{' '}
            <Link
              href="#"
              className="text-violet-500 hover:underline font-medium"
            >
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
