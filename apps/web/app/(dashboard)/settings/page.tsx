import * as React from 'react';
import {
  User,
  Bell,
  CreditCard,
  Shield,
  Globe,
  Key,
  ChevronRight,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface SettingsSection {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  status?: 'available' | 'soon';
}

const SETTINGS_SECTIONS: SettingsSection[] = [
  {
    id: 'profile',
    title: 'Profile',
    description: 'Manage your account name, email, and avatar',
    icon: User,
    status: 'available',
  },
  {
    id: 'billing',
    title: 'Billing & Credits',
    description: 'Manage your subscription, plan, and credit usage',
    icon: CreditCard,
    status: 'available',
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'Configure email and in-app notification preferences',
    icon: Bell,
    status: 'available',
  },
  {
    id: 'security',
    title: 'Security',
    description: 'Password, two-factor authentication, and active sessions',
    icon: Shield,
    status: 'available',
  },
  {
    id: 'domains',
    title: 'Custom Domains',
    description: 'Connect your own domain to your published pages',
    icon: Globe,
    badge: 'Pro',
    status: 'soon',
  },
  {
    id: 'api',
    title: 'API Keys',
    description: 'Generate and manage API keys for integrations',
    icon: Key,
    status: 'soon',
    badge: 'Soon',
  },
];

export default function SettingsPage(): React.JSX.Element {
  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Manage your account settings, billing, and preferences.
      </p>

      <div className="grid grid-cols-1 gap-3">
        {SETTINGS_SECTIONS.map((section) => {
          const Icon = section.icon;
          const isAvailable = section.status === 'available';

          return (
            <div
              key={section.id}
              className="glass-card rounded-xl px-5 py-4 flex items-center gap-4 animate-fade-in group hover:ring-1 hover:ring-border/80 transition-all duration-150 cursor-pointer"
            >
              <div className="rounded-lg bg-muted/60 p-2.5 shrink-0">
                <Icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-semibold text-foreground">
                    {section.title}
                  </span>
                  {section.badge && (
                    <Badge
                      variant={
                        section.badge === 'Pro' ? 'violet' : 'secondary'
                      }
                      className="text-[10px] px-1.5 py-0"
                    >
                      {section.badge}
                    </Badge>
                  )}
                  {!isAvailable && !section.badge && (
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                      Soon
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {section.description}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </div>
          );
        })}
      </div>

      {/* Danger zone */}
      <div>
        <h3 className="text-sm font-semibold text-destructive uppercase tracking-wider mb-3">
          Danger Zone
        </h3>
        <div className="glass-card rounded-xl p-5 border border-destructive/20 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-0.5">
                Delete Account
              </h4>
              <p className="text-xs text-muted-foreground">
                Permanently delete your account and all associated data.
                This action cannot be undone.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="shrink-0 border-destructive/30 text-destructive hover:bg-destructive/10 hover:border-destructive"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
