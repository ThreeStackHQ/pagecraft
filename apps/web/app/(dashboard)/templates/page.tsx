'use client';

import * as React from 'react';
import { Search, Sparkles, Zap, Layout, ShoppingBag, BookOpen, Timer, Megaphone, BarChart2, Lock, Star, ArrowRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// ─── Template Data ────────────────────────────────────────────────────────────

type Category = 'SaaS' | 'Portfolio' | 'E-commerce' | 'Blog' | 'Marketing' | 'Waitlist' | 'Analytics';
type Complexity = 'Starter' | 'Intermediate' | 'Advanced';

interface Template {
  id: string;
  name: string;
  description: string;
  category: Category;
  complexity: Complexity;
  featured?: boolean;
  popular?: boolean;
  gradient: string;
  icon: React.ComponentType<{ className?: string }>;
  sections: string[];
  tags: string[];
}

const TEMPLATES: Template[] = [
  {
    id: 'saas-landing-dark',
    name: 'SaaS Landing — Dark',
    description: 'Professional dark-mode SaaS landing with hero, features, pricing, and FAQ.',
    category: 'SaaS',
    complexity: 'Intermediate',
    featured: true,
    popular: true,
    gradient: 'from-violet-600/30 to-purple-900/50',
    icon: Zap,
    sections: ['Hero', 'Features', 'Pricing', 'FAQ', 'Footer'],
    tags: ['dark', 'saas', 'pricing'],
  },
  {
    id: 'portfolio-minimal',
    name: 'Portfolio — Minimal',
    description: 'Clean minimal portfolio with projects grid and contact form.',
    category: 'Portfolio',
    complexity: 'Starter',
    featured: true,
    gradient: 'from-gray-600/30 to-zinc-900/50',
    icon: Layout,
    sections: ['About', 'Projects', 'Skills', 'Contact'],
    tags: ['minimal', 'portfolio', 'clean'],
  },
  {
    id: 'waitlist-launch',
    name: 'Waitlist — Pre-Launch',
    description: 'Viral waitlist page with email capture, social share, and live counter.',
    category: 'Waitlist',
    complexity: 'Starter',
    featured: true,
    popular: true,
    gradient: 'from-emerald-600/30 to-teal-900/50',
    icon: Timer,
    sections: ['Hero + Signup', 'Features Preview', 'Social Proof', 'FAQ'],
    tags: ['waitlist', 'launch', 'email'],
  },
  {
    id: 'ecommerce-store',
    name: 'E-commerce — Boutique',
    description: 'Elegant product showcase with cart, featured items, and brand story.',
    category: 'E-commerce',
    complexity: 'Advanced',
    gradient: 'from-pink-600/30 to-rose-900/50',
    icon: ShoppingBag,
    sections: ['Hero Banner', 'Featured Products', 'Categories', 'Newsletter'],
    tags: ['shop', 'products', 'boutique'],
  },
  {
    id: 'blog-editorial',
    name: 'Blog — Editorial',
    description: 'Modern editorial blog with featured posts, categories, and author bio.',
    category: 'Blog',
    complexity: 'Intermediate',
    gradient: 'from-orange-600/30 to-amber-900/50',
    icon: BookOpen,
    sections: ['Hero', 'Featured Post', 'Post Grid', 'Newsletter', 'Footer'],
    tags: ['blog', 'editorial', 'writing'],
  },
  {
    id: 'marketing-startup',
    name: 'Marketing — Startup',
    description: 'Bold startup page with animated hero, social proof, and CTA.',
    category: 'Marketing',
    complexity: 'Intermediate',
    popular: true,
    gradient: 'from-blue-600/30 to-indigo-900/50',
    icon: Megaphone,
    sections: ['Hero', 'Logos', 'Features', 'Testimonials', 'CTA', 'Footer'],
    tags: ['startup', 'bold', 'animated'],
  },
  {
    id: 'analytics-dashboard',
    name: 'Analytics — Dashboard',
    description: 'Metrics-focused landing with live chart previews and feature list.',
    category: 'Analytics',
    complexity: 'Advanced',
    gradient: 'from-cyan-600/30 to-sky-900/50',
    icon: BarChart2,
    sections: ['Hero + Dashboard Mockup', 'Features', 'Integrations', 'Pricing'],
    tags: ['analytics', 'metrics', 'charts'],
  },
  {
    id: 'saas-landing-light',
    name: 'SaaS Landing — Light',
    description: 'Clean light-mode SaaS page with gradient sections and trust badges.',
    category: 'SaaS',
    complexity: 'Intermediate',
    gradient: 'from-violet-400/20 to-purple-600/30',
    icon: Zap,
    sections: ['Hero', 'How It Works', 'Features', 'Pricing', 'Testimonials'],
    tags: ['light', 'saas', 'trust'],
  },
  {
    id: 'portfolio-developer',
    name: 'Portfolio — Developer',
    description: 'Terminal-inspired developer portfolio with CLI animation and GitHub stats.',
    category: 'Portfolio',
    complexity: 'Advanced',
    gradient: 'from-green-600/30 to-emerald-900/50',
    icon: Layout,
    sections: ['Terminal Hero', 'Projects', 'Tech Stack', 'Open Source', 'Contact'],
    tags: ['developer', 'terminal', 'github'],
  },
  {
    id: 'product-hunt-launch',
    name: 'Product Hunt Launch',
    description: 'Optimized for Product Hunt launches with upvote CTA and demo video.',
    category: 'Marketing',
    complexity: 'Starter',
    popular: true,
    gradient: 'from-orange-500/30 to-red-900/50',
    icon: Megaphone,
    sections: ['Hero + Demo', 'Key Features', 'Team', 'CTA'],
    tags: ['producthunt', 'launch', 'viral'],
  },
  {
    id: 'coming-soon',
    name: 'Coming Soon — Countdown',
    description: 'Countdown timer with email signup, social links, and teaser content.',
    category: 'Waitlist',
    complexity: 'Starter',
    gradient: 'from-purple-600/30 to-fuchsia-900/50',
    icon: Timer,
    sections: ['Countdown', 'Email Signup', 'Social Links'],
    tags: ['countdown', 'teaser', 'minimal'],
  },
  {
    id: 'saas-tool-comparison',
    name: 'SaaS — Comparison Page',
    description: 'Feature comparison table vs competitors with value proposition focus.',
    category: 'SaaS',
    complexity: 'Intermediate',
    gradient: 'from-violet-600/20 to-blue-900/40',
    icon: Zap,
    sections: ['Hero', 'Comparison Table', 'Why Us', 'Pricing', 'CTA'],
    tags: ['comparison', 'vs', 'features'],
  },
  {
    id: 'newsletter-landing',
    name: 'Newsletter Landing',
    description: 'Email newsletter landing with issue previews, author bio, and subscriber count.',
    category: 'Blog',
    complexity: 'Starter',
    gradient: 'from-yellow-600/30 to-amber-900/50',
    icon: BookOpen,
    sections: ['Hero + Signup', 'Recent Issues', 'Author Bio', 'Social Proof'],
    tags: ['newsletter', 'email', 'substack'],
  },
  {
    id: 'agency-services',
    name: 'Agency — Services',
    description: 'Premium agency page with services grid, case studies, and team section.',
    category: 'Marketing',
    complexity: 'Advanced',
    gradient: 'from-gray-500/30 to-slate-900/50',
    icon: Lock,
    sections: ['Hero', 'Services', 'Case Studies', 'Team', 'Contact'],
    tags: ['agency', 'premium', 'services'],
  },
  {
    id: 'mobile-app-landing',
    name: 'Mobile App Landing',
    description: 'App Store-style landing with phone mockups, feature highlights, and download CTAs.',
    category: 'Marketing',
    complexity: 'Intermediate',
    popular: true,
    gradient: 'from-sky-600/30 to-blue-900/50',
    icon: Sparkles,
    sections: ['Hero + App Mockup', 'Features', 'Screenshots', 'Reviews', 'Download'],
    tags: ['mobile', 'app', 'ios', 'android'],
  },
];

const CATEGORIES: { label: string; value: Category | 'All'; Icon: React.ComponentType<{ className?: string }> }[] = [
  { label: 'All Templates', value: 'All', Icon: Sparkles },
  { label: 'SaaS', value: 'SaaS', Icon: Zap },
  { label: 'Portfolio', value: 'Portfolio', Icon: Layout },
  { label: 'E-commerce', value: 'E-commerce', Icon: ShoppingBag },
  { label: 'Blog', value: 'Blog', Icon: BookOpen },
  { label: 'Marketing', value: 'Marketing', Icon: Megaphone },
  { label: 'Waitlist', value: 'Waitlist', Icon: Timer },
  { label: 'Analytics', value: 'Analytics', Icon: BarChart2 },
];

const COMPLEXITIES: { label: string; value: Complexity | 'All' }[] = [
  { label: 'All levels', value: 'All' },
  { label: 'Starter', value: 'Starter' },
  { label: 'Intermediate', value: 'Intermediate' },
  { label: 'Advanced', value: 'Advanced' },
];

const COMPLEXITY_COLORS: Record<Complexity, string> = {
  Starter: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  Intermediate: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Advanced: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
};

// ─── Template Card ──────────────────────────────────────────────────────────

function TemplateCard({ template, onUse }: { template: Template; onUse: (id: string) => void }) {
  const [hovered, setHovered] = React.useState(false);
  const Icon = template.icon;

  return (
    <div
      className="group relative bg-gray-900/60 border border-gray-800 rounded-xl overflow-hidden hover:border-violet-500/40 transition-all duration-200 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Preview area */}
      <div className={cn('relative h-44 bg-gradient-to-br overflow-hidden', template.gradient)}>
        {/* Mockup window chrome */}
        <div className="absolute inset-3 bg-gray-900/80 rounded-lg border border-gray-700/50 shadow-xl">
          <div className="flex items-center gap-1.5 px-3 py-2 border-b border-gray-700/30">
            <div className="w-2 h-2 rounded-full bg-red-500/50" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
            <div className="w-2 h-2 rounded-full bg-green-500/50" />
            <div className="flex-1 mx-2 bg-gray-800/60 rounded text-[9px] text-gray-600 px-2 py-0.5 text-center">
              {template.name.toLowerCase().replace(/\s+/g, '-')}.tsx
            </div>
          </div>
          {/* Section bars */}
          <div className="p-2 space-y-1.5">
            {template.sections.slice(0, 4).map((section, i) => (
              <div
                key={section}
                className="h-2 rounded-full bg-gray-700/60"
                style={{ width: `${[85, 65, 75, 55][i] ?? 60}%`, opacity: 0.5 + i * 0.1 }}
              />
            ))}
          </div>
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <Icon className="h-12 w-12 text-white" />
          </div>
        </div>

        {/* Hover overlay */}
        {hovered && (
          <div className="absolute inset-0 bg-violet-600/10 backdrop-blur-sm flex items-center justify-center">
            <button
              onClick={() => onUse(template.id)}
              className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg font-semibold text-sm shadow-lg text-white transition-colors"
            >
              <ArrowRight className="h-4 w-4" />
              Use Template
            </button>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-5 left-5 flex gap-1.5">
          {template.featured && (
            <span className="flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 bg-violet-600/80 rounded text-white">
              <Star className="h-2.5 w-2.5" />FEATURED
            </span>
          )}
          {template.popular && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 bg-orange-500/80 rounded text-white">
              🔥 POPULAR
            </span>
          )}
        </div>
      </div>

      {/* Card content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-sm text-foreground group-hover:text-violet-300 transition-colors">{template.name}</h3>
          <span className={cn('shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded border', COMPLEXITY_COLORS[template.complexity])}>
            {template.complexity}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mb-3 leading-relaxed line-clamp-2">{template.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          <span className="text-[10px] px-1.5 py-0.5 bg-gray-800 border border-gray-700 rounded text-gray-400">
            {template.category}
          </span>
          {template.sections.slice(0, 2).map((s) => (
            <span key={s} className="text-[10px] px-1.5 py-0.5 bg-gray-800/60 border border-gray-700/50 rounded text-gray-500">
              {s}
            </span>
          ))}
          {template.sections.length > 2 && (
            <span className="text-[10px] text-gray-600">+{template.sections.length - 2}</span>
          )}
        </div>

        <Button
          size="sm"
          className="w-full text-xs gap-1.5 h-8"
          onClick={() => onUse(template.id)}
        >
          <Check className="h-3.5 w-3.5" />
          Use This Template
        </Button>
      </div>
    </div>
  );
}

// ─── Templates Gallery Page ──────────────────────────────────────────────────

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = React.useState<Category | 'All'>('All');
  const [activeComplexity, setActiveComplexity] = React.useState<Complexity | 'All'>('All');
  const [search, setSearch] = React.useState('');
  const [usedTemplate, setUsedTemplate] = React.useState<string | null>(null);

  const filtered = React.useMemo(() => {
    return TEMPLATES.filter((t) => {
      if (activeCategory !== 'All' && t.category !== activeCategory) return false;
      if (activeComplexity !== 'All' && t.complexity !== activeComplexity) return false;
      if (search) {
        const q = search.toLowerCase();
        return t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.tags.some((tag) => tag.includes(q));
      }
      return true;
    });
  }, [activeCategory, activeComplexity, search]);

  const featured = filtered.filter((t) => t.featured);
  const rest = filtered.filter((t) => !t.featured);

  const handleUse = (id: string) => {
    setUsedTemplate(id);
    // TODO: POST /api/projects/create with template_id
    setTimeout(() => setUsedTemplate(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header + search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <p className="text-muted-foreground text-sm">{TEMPLATES.length} templates · Start from a proven design</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search templates…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-3 bg-gray-900/60 border border-gray-800 rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500/60 transition-colors"
          />
        </div>
      </div>

      <div className="flex gap-6">
        {/* Filter Sidebar */}
        <aside className="hidden lg:flex flex-col w-48 shrink-0 gap-4">
          {/* Categories */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-2 px-2">Category</p>
            <div className="space-y-0.5">
              {CATEGORIES.map(({ label, value, Icon }) => (
                <button
                  key={value}
                  onClick={() => setActiveCategory(value)}
                  className={cn(
                    'flex items-center gap-2.5 w-full text-left px-2.5 py-2 rounded-md text-sm transition-colors',
                    activeCategory === value
                      ? 'bg-violet-600/15 text-violet-300 font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  )}
                >
                  <Icon className={cn('h-4 w-4 shrink-0', activeCategory === value ? 'text-violet-400' : 'text-muted-foreground')} />
                  {label}
                  <span className={cn('ml-auto text-[10px]', activeCategory === value ? 'text-violet-400' : 'text-muted-foreground/50')}>
                    {value === 'All' ? TEMPLATES.length : TEMPLATES.filter((t) => t.category === value).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Complexity */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-2 px-2">Complexity</p>
            <div className="space-y-0.5">
              {COMPLEXITIES.map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => setActiveComplexity(value)}
                  className={cn(
                    'flex items-center gap-2.5 w-full text-left px-2.5 py-2 rounded-md text-sm transition-colors',
                    activeComplexity === value
                      ? 'bg-violet-600/15 text-violet-300 font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  )}
                >
                  <span className={cn('w-2 h-2 rounded-full', value === 'Starter' ? 'bg-emerald-400' : value === 'Intermediate' ? 'bg-blue-400' : value === 'Advanced' ? 'bg-violet-400' : 'bg-gray-500')} />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0 space-y-8">
          {/* Mobile category pills */}
          <div className="lg:hidden flex gap-2 flex-wrap">
            {CATEGORIES.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setActiveCategory(value)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-medium border transition-colors',
                  activeCategory === value
                    ? 'bg-violet-600 border-violet-500 text-white'
                    : 'bg-gray-900/60 border-gray-800 text-muted-foreground hover:border-gray-700'
                )}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Featured row */}
          {featured.length > 0 && !search && activeCategory === 'All' && activeComplexity === 'All' && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Star className="h-4 w-4 text-violet-400" />
                <h2 className="text-sm font-semibold text-foreground">Featured Templates</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {featured.map((t) => (
                  <TemplateCard key={t.id} template={t} onUse={handleUse} />
                ))}
              </div>
            </div>
          )}

          {/* All/filtered templates */}
          {rest.length > 0 || search || activeCategory !== 'All' || activeComplexity !== 'All' ? (
            <div>
              {!search && activeCategory === 'All' && activeComplexity === 'All' && (
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-sm font-semibold text-foreground">All Templates</h2>
                  <span className="text-xs text-muted-foreground">({rest.length})</span>
                </div>
              )}
              {(search || activeCategory !== 'All' || activeComplexity !== 'All') && (
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-sm font-semibold text-foreground">
                    {filtered.length} result{filtered.length !== 1 ? 's' : ''}
                    {search && <span className="text-muted-foreground font-normal"> for &ldquo;{search}&rdquo;</span>}
                  </h2>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {(search || activeCategory !== 'All' || activeComplexity !== 'All' ? filtered : rest).map((t) => (
                  <TemplateCard key={t.id} template={t} onUse={handleUse} />
                ))}
              </div>
            </div>
          ) : null}

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <Search className="h-10 w-10 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">No templates found</p>
              <p className="text-sm mt-1">Try adjusting your filters or search query</p>
              <button
                onClick={() => { setSearch(''); setActiveCategory('All'); setActiveComplexity('All'); }}
                className="mt-4 text-sm text-violet-400 hover:text-violet-300 underline transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Success toast */}
      {usedTemplate && (
        <div className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-3 bg-emerald-600 rounded-lg shadow-lg text-white text-sm font-medium animate-fade-in z-50">
          <Check className="h-4 w-4" />
          Template added to your projects!
        </div>
      )}
    </div>
  );
}
