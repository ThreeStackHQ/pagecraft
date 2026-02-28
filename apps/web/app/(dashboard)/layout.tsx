import { redirect } from 'next/navigation';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';

async function getUser() {
  // TODO(sprint-1.7): Replace with next-auth session check
  // const session = await auth();
  // if (!session?.user) return null;
  return {
    name: 'Alex Johnson',
    email: 'alex@pagecraft.io',
    image: null,
    plan: 'Pro',
    creditsUsed: 34,
    creditsTotal: 100,
  };
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();
  if (!user) redirect('/auth/login');
  return <DashboardShell user={user}>{children}</DashboardShell>;
}
