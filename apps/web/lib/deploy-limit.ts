import { db, exports as exportsTable, eq, and, gte, sql } from '@pagecraft/db';

export const FREE_TIER_DEPLOY_LIMIT = 1; // per month

export async function checkDeployLimit(
  userId: string,
  tier: string
): Promise<{ canDeploy: boolean; count: number; limit: number }> {
  if (tier === 'pro') {
    return { canDeploy: true, count: 0, limit: -1 };
  }

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const [result] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(exportsTable)
    .where(
      and(
        eq(exportsTable.userId, userId),
        eq(exportsTable.exportType, 'vercel'),
        gte(exportsTable.createdAt, startOfMonth)
      )
    );

  const deployCount = result?.count ?? 0;

  return {
    canDeploy: deployCount < FREE_TIER_DEPLOY_LIMIT,
    count: deployCount,
    limit: FREE_TIER_DEPLOY_LIMIT,
  };
}
