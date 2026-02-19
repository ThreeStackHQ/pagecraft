'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Plus, ChevronRight, Home, Menu, X } from 'lucide-react';
import { SidebarNav } from './sidebar-nav';
import { UserMenu } from './user-menu';
import { ThemeToggle } from './theme-toggle';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  title: string;
  href: string;
}

const ROUTE_LABELS: Record<string, string> = {
  dashboard: 'Dashboard',
  projects: 'Projects',
  templates: 'Templates',
  settings: 'Settings',
};

function buildBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean);
  const crumbs: BreadcrumbItem[] = [{ title: 'Home', href: '/dashboard' }];

  let currentPath = '';
  for (const segment of segments) {
    currentPath += `/${segment}`;
    const label = ROUTE_LABELS[segment];
    if (label && segment !== 'dashboard') {
      crumbs.push({ title: label, href: currentPath });
    }
  }

  return crumbs;
}

interface DashboardShellProps {
  children: React.ReactNode;
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    plan?: string;
    creditsUsed?: number;
    creditsTotal?: number;
  } | null;
}

export function DashboardShell({
  children,
  user,
}: DashboardShellProps): React.JSX.Element {
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);

  const breadcrumbs = buildBreadcrumbs(pathname);
  const pageTitle =
    ROUTE_LABELS[pathname.split('/').filter(Boolean).pop() ?? ''] ??
    'Dashboard';

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar — desktop */}
      <div className="hidden lg:flex lg:flex-col lg:shrink-0">
        <SidebarNav
          collapsed={sidebarCollapsed}
          onCollapse={setSidebarCollapsed}
        />
      </div>

      {/* Sidebar — mobile */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex flex-col transition-transform duration-300 ease-in-out lg:hidden',
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <SidebarNav
          collapsed={false}
          onCollapse={() => setMobileSidebarOpen(false)}
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
          aria-label="Close sidebar"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        {/* Top header */}
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border/60 bg-background/95 backdrop-blur-sm px-4 lg:px-6">
          {/* Mobile hamburger */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-muted-foreground"
            onClick={() => setMobileSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex-1 min-w-0">
            <ol className="flex items-center gap-1 text-sm">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.href} className="flex items-center gap-1">
                  {index > 0 && (
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50 shrink-0" />
                  )}
                  {index === 0 ? (
                    <Link
                      href={crumb.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Home"
                    >
                      <Home className="h-3.5 w-3.5" />
                    </Link>
                  ) : index === breadcrumbs.length - 1 ? (
                    <span className="font-medium text-foreground truncate">
                      {crumb.title}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="text-muted-foreground hover:text-foreground transition-colors truncate"
                    >
                      {crumb.title}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Credits/Plan badge */}
            <Badge variant="violet" className="hidden sm:flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
              {user?.plan ?? 'Free'} Plan
            </Badge>

            {/* Theme toggle */}
            <ThemeToggle />

            {/* New Project CTA */}
            <Button
              size="sm"
              className="gap-1.5 hidden sm:flex"
              aria-label="Create new project"
            >
              <Plus className="h-4 w-4" />
              New Project
            </Button>
            <Button
              size="icon"
              className="sm:hidden h-9 w-9"
              aria-label="Create new project"
            >
              <Plus className="h-4 w-4" />
            </Button>

            {/* User menu */}
            <UserMenu user={user} />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto max-w-6xl px-4 py-6 lg:px-8">
            {/* Page title */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                {pageTitle}
              </h1>
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
