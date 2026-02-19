import * as React from 'react';
import { LayoutTemplate, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function TemplatesPage(): React.JSX.Element {
  return (
    <div className="space-y-6">
      {/* Coming soon banner */}
      <div className="glass-card rounded-xl p-8 flex flex-col items-center text-center animate-fade-in border border-violet-500/20 violet-glow">
        <div className="rounded-2xl bg-violet-600/10 border border-violet-500/20 p-5 mb-5">
          <LayoutTemplate className="h-10 w-10 text-violet-500" />
        </div>
        <div className="flex items-center gap-2 mb-3">
          <h2 className="text-xl font-bold text-foreground">
            Template Library
          </h2>
          <Badge variant="violet">Coming Soon</Badge>
        </div>
        <p className="text-muted-foreground text-sm max-w-md mb-6">
          Browse our curated library of professionally designed landing page
          templates. Pick one, customize it with your content, and launch in
          minutes.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button variant="outline" className="gap-2" disabled>
            <Sparkles className="h-4 w-4" />
            Browse Templates
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            Get notified when available →
          </Button>
        </div>
      </div>

      {/* Category placeholders */}
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Template Categories
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {[
            'SaaS & Software',
            'Agency & Portfolio',
            'E-commerce',
            'Events',
            'Startup',
            'Personal Brand',
            'Restaurant',
            'Real Estate',
          ].map((category) => (
            <div
              key={category}
              className="glass-card rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground text-center cursor-not-allowed opacity-60 animate-fade-in"
            >
              {category}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
