'use client';

import * as React from 'react';
import { LogOut, Settings, User, CreditCard, ChevronDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuGroup,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface UserMenuProps {
  user?: { name?: string | null; email?: string | null; image?: string | null; plan?: string; creditsUsed?: number; creditsTotal?: number; } | null;
}

export function UserMenu({ user }: UserMenuProps): React.JSX.Element {
  const displayName = user?.name ?? 'Guest User';
  const displayEmail = user?.email ?? 'guest@pagecraft.io';
  const initials = displayName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  const plan = user?.plan ?? 'Free';
  const creditsUsed = user?.creditsUsed ?? 0;
  const creditsTotal = user?.creditsTotal ?? 10;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 h-10 px-2 rounded-lg hover:bg-accent">
          <Avatar className="h-7 w-7">
            <AvatarImage src={user?.image ?? ''} alt={displayName} />
            <AvatarFallback className="text-xs bg-violet-600 text-white font-semibold">{initials}</AvatarFallback>
          </Avatar>
          <span className="hidden sm:block text-sm font-medium max-w-[120px] truncate">{displayName}</span>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.image ?? ''} alt={displayName} />
                <AvatarFallback className="text-xs bg-violet-600 text-white font-semibold">{initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{displayName}</p>
                <p className="text-xs text-muted-foreground truncate">{displayEmail}</p>
              </div>
            </div>
            <div className="mt-1 rounded-md bg-muted/60 px-2.5 py-2 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Badge variant="violet" className="text-[10px] px-1.5 py-0">{plan}</Badge>
                <span className="text-xs text-muted-foreground">plan</span>
              </div>
              <div className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">{creditsUsed}</span>{' / '}{creditsTotal} credits
              </div>
            </div>
            <div className="w-full h-1 rounded-full bg-muted overflow-hidden">
              <div className="h-full rounded-full bg-violet-600 transition-all duration-500" style={{ width: `${Math.min((creditsUsed / creditsTotal) * 100, 100)}%` }} />
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="gap-2 cursor-pointer"><User className="h-4 w-4 text-muted-foreground" /><span>Profile</span></DropdownMenuItem>
          <DropdownMenuItem className="gap-2 cursor-pointer"><CreditCard className="h-4 w-4 text-muted-foreground" /><span>Billing & Credits</span></DropdownMenuItem>
          <DropdownMenuItem className="gap-2 cursor-pointer"><Settings className="h-4 w-4 text-muted-foreground" /><span>Settings</span></DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 cursor-pointer text-destructive focus:text-destructive">
          <LogOut className="h-4 w-4" /><span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
