import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db, projects, eq } from '@pagecraft/db';
import { StitchClient } from '@pagecraft/stitch-mcp';
import { getAuthUserId, unauthorized } from '@/lib/auth-helpers';
import { canCreateProject } from '@/lib/tier';

const schema = z.object({
  name: z.string().min(1).max(100),
  prompt: z.string().min(10).max(2000),
  deviceType: z.enum(['MOBILE', 'DESKTOP', 'TABLET']).optional().default('DESKTOP'),
});

/**
 * Fires Stitch generation in the background and updates the project record
 * when done (or failed). This runs fire-and-forget — the HTTP response is
 * already sent by the time this executes.
 */
async function runStitchGeneration(
  projectId: string,
  prompt: string,
  deviceType: string,
): Promise<void> {
  const apiKey = process.env.STITCH_API_KEY ?? '';
  const client = new StitchClient(apiKey);

  try {
    // createProject + generateScreen are currently stubbed in @pagecraft/stitch-mcp.
    // When the MCP bridge is implemented they will work transparently here.
    const stitchProject = await client.createProject(`pagecraft-${projectId}`);
    const screen = await client.generateScreen({
      projectId: stitchProject.id,
      prompt,
      deviceType: deviceType.toLowerCase() as 'mobile' | 'desktop' | 'tablet',
    });

    await db
      .update(projects)
      .set({
        stitchProjectId: stitchProject.id,
        stitchDesignId: screen.id,
        status: 'complete',
        updatedAt: new Date(),
      })
      .where(eq(projects.id, projectId));
  } catch (err) {
    console.error('[stitch-generation] projectId=%s error=%o', projectId, err);
    await db
      .update(projects)
      .set({ status: 'failed', updatedAt: new Date() })
      .where(eq(projects.id, projectId));
  }
}

/**
 * POST /api/projects/create
 *
 * Body: { name, prompt, deviceType? }
 * Returns 202 { projectId, status: 'generating' } immediately.
 * Generation runs in the background via setTimeout.
 */
export async function POST(req: NextRequest) {
  try {
    const userId = await getAuthUserId();
    if (!userId) return unauthorized();

    const body = await req.json() as unknown;
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message ?? 'Invalid input' },
        { status: 400 },
      );
    }

    const { name, prompt, deviceType } = parsed.data;

    const allowed = await canCreateProject(userId);
    if (!allowed) {
      return NextResponse.json(
        { error: 'Project limit reached. Upgrade to Pro for unlimited projects.' },
        { status: 403 },
      );
    }

    const [project] = await db
      .insert(projects)
      .values({
        userId,
        name,
        status: 'generating',
        deviceType: deviceType.toLowerCase(),
      })
      .returning({ id: projects.id, status: projects.status });

    if (!project) {
      return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    }

    // Fire-and-forget: kick off Stitch generation without blocking the response
    setTimeout(() => {
      runStitchGeneration(project.id, prompt, deviceType).catch((err) => {
        console.error('[create-project background]', err);
      });
    }, 0);

    return NextResponse.json(
      { projectId: project.id, status: project.status },
      { status: 202 },
    );
  } catch (err) {
    console.error('[create-project]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
