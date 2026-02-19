import { redirect } from 'next/navigation';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';

/**
 * Dashboard layout — wraps all (dashboard) routes with the shell.
 *
 * Auth check: In a real implementation this would use next-auth's auth()
 * to get the session and redirect unauthenticated users to /login.
 * For Sprint 1.6 the shell is rendered with a mock user so the UI can
 * be reviewed; swap getUser() for a real session lookup in Sprint 1.7.
 */
async function getUser(): Promise<{
  name: string;
  email: string;
  image: string | null;
  plan: string;
  creditsUsed: number;
  creditsTotal: number;
} | null> {
  // TODO(sprint-1.7): Replace with next-auth session check
  // const session = await auth();
  // if (!session?.user) return null;
  // return session.user;

  // For now, return a mock user so the dashboard is explorable.
  // Returning null here would trigger the /login redirect.
  return {
    name: 'Alex Johnson',
    email: 'alex@pagecraft.io',
    image: null,
    plan: 'Pro',
    creditsUsed: 34,
    creditsTotal: 100,
  };
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<React.JSX.Element> {
  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  return <DashboardShell user={user}>{children}</DashboardShell>;
}
