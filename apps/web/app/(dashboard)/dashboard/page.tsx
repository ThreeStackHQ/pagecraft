import * as React from 'react';
import Link from 'next/link';
import {
  Plus,
  Sparkles,
  TrendingUp,
  FolderOpen,
  Zap,
  ArrowRight,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

/* ─── Mock data ─────────────────────────────────────────────────── */
const MOCK_RECENT_PROJECTS = [
  {
    id: '1',
    name: 'SaaS Landing Page',
    updatedAt: '2 hours ago',
    status: 'published' as const,
    thumbnail: null,
  },
  {
    id: '2',
    name: 'Product Launch',
    updatedAt: '1 day ago',
    status: 'draft' as const,
    thumbnail: null,
  },
  {
    id: '3',
    name: 'Agency Portfolio',
    updatedAt: '3 days ago',
    status: 'published' as const,
    thumbnail: null,
  },
];

/* ─── Sub-components ─────────────────────────────────────────────── */
interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: string;
  accentClass?: string;
}

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  accentClass = 'bg-violet-600/10 text-violet-500',
}: StatCardProps): React.JSX.Element {
  return (
    <div className="glass-card rounded-xl p-5 flex flex-col gap-3 animate-fade-in">
      <div className="flex items-start justify-between">
        <div className={cn('rounded-lg p-2', accentClass)}>
          <Icon className="h-5 w-5" />
        </div>
        {trend && (
          <Badge variant="success" className="text-[10px]">
            <TrendingUp className="h-3 w-3 mr-0.5" />
            {trend}
          </Badge>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-sm font-medium text-foreground/80 mt-0.5">{title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    updatedAt: string;
    status: 'published' | 'draft';
    thumbnail: null;
  };
}

function RecentProjectCard({ project }: ProjectCardProps): React.JSX.Element {
  return (
    <div className="glass-card rounded-xl overflow-hidden group cursor-pointer hover:ring-1 hover:ring-violet-500/40 transition-all duration-200 animate-fade-in">
      {/* Thumbnail placeholder */}
      <div className="h-32 bg-gradient-to-br from-violet-600/20 via-indigo-600/10 to-transparent flex items-center justify-center border-b border-border/50">
        <div className="flex flex-col items-center gap-1.5 text-muted-foreground/50">
          <FolderOpen className="h-8 w-8" />
          <span className="text-xs">Preview coming soon</span>
        </div>
      </div>
      {/* Info */}
      <div className="p-3 flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">
            {project.name}
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <Clock className="h-3 w-3 text-muted-foreground/60" />
            <span className="text-xs text-muted-foreground">
              {project.updatedAt}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Badge
            variant={project.status === 'published' ? 'success' : 'secondary'}
            className="text-[10px] capitalize"
          >
            {project.status}
          </Badge>
          <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </div>
  );
}

/* ─── Empty state ────────────────────────────────────────────────── */
function EmptyState(): React.JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-fade-in">
      <div className="rounded-2xl bg-violet-600/10 border border-violet-500/20 p-6 mb-6 violet-glow">
        <Sparkles className="h-12 w-12 text-violet-500 mx-auto" />
      </div>
      <h2 className="text-xl font-bold text-foreground mb-2">
        Create your first landing page
      </h2>
      <p className="text-muted-foreground text-sm max-w-sm mb-6">
        Describe your product and PageCraft will generate a complete,
        production-ready landing page in seconds.
      </p>
      <Button size="lg" className="gap-2">
        <Plus className="h-4 w-4" />
        Start Building
      </Button>
      <p className="text-xs text-muted-foreground mt-4">
        No credit card required · Free plan includes 10 generations
      </p>
    </div>
  );
}

/* ─── Credits usage bar ──────────────────────────────────────────── */
interface CreditsBarProps {
  used: number;
  total: number;
}

function CreditsBar({ used, total }: CreditsBarProps): React.JSX.Element {
  const pct = Math.min((used / total) * 100, 100);
  const isHigh = pct >= 80;

  return (
    <div className="glass-card rounded-xl p-5 animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-violet-500" />
          <span className="text-sm font-semibold text-foreground">
            Credits Used
          </span>
        </div>
        <span
          className={cn(
            'text-sm font-bold',
            isHigh ? 'text-amber-500' : 'text-foreground'
          )}
        >
          {used} / {total}
        </span>
      </div>
      <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-700',
            isHigh ? 'bg-amber-500' : 'bg-violet-600'
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-muted-foreground">
          {total - used} credits remaining
        </span>
        {isHigh && (
          <Button variant="link" size="sm" className="h-auto py-0 text-xs">
            Upgrade plan
          </Button>
        )}
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function DashboardPage(): React.JSX.Element {
  // In a real implementation, fetch from API/DB
  const hasProjects = MOCK_RECENT_PROJECTS.length > 0;
  const creditsUsed = 34;
  const creditsTotal = 100;

  return (
    <div className="space-y-8">
      {/* Stats row */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Projects"
            value={hasProjects ? MOCK_RECENT_PROJECTS.length : 0}
            subtitle="Across all pages"
            icon={FolderOpen}
            trend="+2 this week"
          />
          <StatCard
            title="Credits Used"
            value={creditsUsed}
            subtitle={`of ${creditsTotal} total`}
            icon={Zap}
            accentClass="bg-amber-500/10 text-amber-500"
          />
          <StatCard
            title="Pages Published"
            value={
              MOCK_RECENT_PROJECTS.filter((p) => p.status === 'published')
                .length
            }
            subtitle="Live on the web"
            icon={ExternalLink}
            accentClass="bg-emerald-500/10 text-emerald-500"
            trend="Active"
          />
          <StatCard
            title="AI Generations"
            value={34}
            subtitle="Total prompts run"
            icon={Sparkles}
            accentClass="bg-violet-600/10 text-violet-500"
          />
        </div>
      </section>

      {/* Credits usage */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <CreditsBar used={creditsUsed} total={creditsTotal} />
        </div>

        {/* Quick actions */}
        <div className="lg:col-span-2 glass-card rounded-xl p-5 animate-fade-in">
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="justify-start gap-2 h-12 border-dashed border-violet-500/30 hover:bg-violet-600/5 hover:border-violet-500/60"
            >
              <Plus className="h-4 w-4 text-violet-500" />
              <div className="text-left">
                <p className="text-sm font-medium">New Project</p>
                <p className="text-xs text-muted-foreground">
                  Generate from prompt
                </p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="justify-start gap-2 h-12 border-dashed hover:bg-accent"
              asChild
            >
              <Link href="/templates">
                <Sparkles className="h-4 w-4 text-muted-foreground" />
                <div className="text-left">
                  <p className="text-sm font-medium">Browse Templates</p>
                  <p className="text-xs text-muted-foreground">
                    Start from a template
                  </p>
                </div>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Recent projects */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-foreground">
            Recent Projects
          </h2>
          {hasProjects && (
            <Button variant="ghost" size="sm" className="gap-1 text-xs" asChild>
              <Link href="/projects">
                View all
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          )}
        </div>

        {hasProjects ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MOCK_RECENT_PROJECTS.map((project) => (
              <RecentProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </section>
    </div>
  );
}
