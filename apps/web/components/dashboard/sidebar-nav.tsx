'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FolderOpen,
  LayoutTemplate,
  Settings,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Projects',
    href: '/projects',
    icon: FolderOpen,
  },
  {
    title: 'Templates',
    href: '/templates',
    icon: LayoutTemplate,
    badge: 'New',
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

interface SidebarNavProps {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
}

export function SidebarNav({
  collapsed = false,
  onCollapse,
}: SidebarNavProps): React.JSX.Element {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'relative flex flex-col h-full border-r border-border/60 bg-[hsl(var(--sidebar-bg))] transition-all duration-300 ease-in-out',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div
        className={cn(
          'flex items-center gap-3 border-b border-border/60 px-4 py-4',
          collapsed && 'justify-center px-0'
        )}
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-600 violet-glow-sm">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        {!collapsed && (
          <div className="animate-fade-in">
            <span className="text-base font-bold tracking-tight text-foreground">
              PageCraft
            </span>
            <div className="text-[10px] text-muted-foreground font-medium -mt-0.5">
              AI Page Builder
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto sidebar-scroll px-2 py-3 space-y-0.5">
        {!collapsed && (
          <div className="px-2 pb-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
              Menu
            </span>
          </div>
        )}
        {navItems.map((item) => {
          const isActive =
            item.href === '/dashboard'
              ? pathname === '/dashboard'
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.title : undefined}
              className={cn(
                'group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-150',
                collapsed && 'justify-center px-0 py-2.5',
                isActive
                  ? 'bg-violet-600/15 text-violet-600 dark:text-violet-400 dark:bg-violet-600/20 violet-glow-sm'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              )}
            >
              <item.icon
                className={cn(
                  'shrink-0 h-4 w-4 transition-colors',
                  isActive
                    ? 'text-violet-600 dark:text-violet-400'
                    : 'text-muted-foreground group-hover:text-foreground'
                )}
              />
              {!collapsed && (
                <span className="flex-1 animate-fade-in">{item.title}</span>
              )}
              {!collapsed && item.badge && (
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-violet-600/20 text-violet-500 border border-violet-500/30 animate-fade-in">
                  {item.badge}
                </span>
              )}
              {isActive && (
                <div
                  className={cn(
                    'absolute left-0 w-0.5 h-7 bg-violet-600 rounded-r-full',
                    collapsed ? 'hidden' : 'block'
                  )}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-border/60 p-2">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'w-full h-8 text-muted-foreground hover:text-foreground',
            collapsed ? 'w-full' : 'justify-start gap-2 px-2 w-full'
          )}
          onClick={() => onCollapse?.(!collapsed)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4" />
              <span className="text-xs">Collapse</span>
            </>
          )}
        </Button>
      </div>
    </aside>
  );
}
