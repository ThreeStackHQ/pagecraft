import { NextRequest, NextResponse } from 'next/server';
import { db, projects, eq, and } from '@pagecraft/db';
import { getAuthUserId, unauthorized, notFound } from '@/lib/auth-helpers';

interface RouteContext {
  params: { id: string };
}

/**
 * GET /api/projects/:id
 *
 * Returns a single project (including status and generatedCode) owned by the
 * authenticated user. Use this to poll generation progress.
 */
export async function GET(_req: NextRequest, { params }: RouteContext) {
  try {
    const userId = await getAuthUserId();
    if (!userId) return unauthorized();

    const [project] = await db
      .select()
      .from(projects)
      .where(and(eq(projects.id, params.id), eq(projects.userId, userId)))
      .limit(1);

    if (!project) return notFound('Project not found');

    return NextResponse.json({ project });
  } catch (err) {
    console.error('[get-project]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * DELETE /api/projects/:id
 *
 * Permanently deletes a project owned by the authenticated user.
 * Returns 404 if not found or not owned by the caller.
 */
export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  try {
    const userId = await getAuthUserId();
    if (!userId) return unauthorized();

    const [deleted] = await db
      .delete(projects)
      .where(and(eq(projects.id, params.id), eq(projects.userId, userId)))
      .returning({ id: projects.id });

    if (!deleted) return notFound('Project not found');

    return NextResponse.json({ success: true, id: deleted.id });
  } catch (err) {
    console.error('[delete-project]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
