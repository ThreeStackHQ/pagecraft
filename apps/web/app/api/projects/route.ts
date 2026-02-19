import { NextResponse } from 'next/server';
import { db, projects, eq, desc } from '@pagecraft/db';
import { getAuthUserId, unauthorized } from '@/lib/auth-helpers';

/**
 * GET /api/projects
 *
 * Returns all projects owned by the authenticated user, newest first.
 * Response: { projects: Project[] }
 */
export async function GET() {
  try {
    const userId = await getAuthUserId();
    if (!userId) return unauthorized();

    const userProjects = await db
      .select({
        id: projects.id,
        name: projects.name,
        status: projects.status,
        deviceType: projects.deviceType,
        stitchProjectId: projects.stitchProjectId,
        stitchDesignId: projects.stitchDesignId,
        createdAt: projects.createdAt,
        updatedAt: projects.updatedAt,
      })
      .from(projects)
      .where(eq(projects.userId, userId))
      .orderBy(desc(projects.createdAt));

    return NextResponse.json({ projects: userProjects });
  } catch (err) {
    console.error('[list-projects]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
