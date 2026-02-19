import { db, subscriptions, projects, eq } from '@pagecraft/db';

export async function getUserTier(userId: string): Promise<'free' | 'pro'> {
  const [sub] = await db
    .select({ tier: subscriptions.tier, status: subscriptions.status })
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId))
    .limit(1);

  if (sub?.status === 'active' && sub.tier === 'pro') return 'pro';
  return 'free';
}

export async function canCreateProject(userId: string): Promise<boolean> {
  const tier = await getUserTier(userId);
  if (tier === 'pro') return true;

  // Free tier: max 3 projects
  const userProjects = await db
    .select({ id: projects.id })
    .from(projects)
    .where(eq(projects.userId, userId));

  return userProjects.length < 3;
}
