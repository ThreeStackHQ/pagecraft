import { NextRequest } from 'next/server';
import { db, projects, eq, and } from '@pagecraft/db';
import { getAuthUserId } from '@/lib/auth-helpers';

const POLL_INTERVAL_MS = 2_000;
const TIMEOUT_MS = 5 * 60 * 1_000; // 5 minutes max

/**
 * GET /api/projects/:id/stream
 *
 * Server-Sent Events endpoint that polls the project status every 2 seconds
 * and emits updates until the project reaches a terminal state
 * ('complete' | 'failed') or the 5-minute timeout elapses.
 *
 * Event format:
 *   data: { projectId, status, stitchProjectId?, stitchDesignId?, updatedAt }
 *
 * Clients should close the EventSource connection on 'complete' or 'failed'.
 */
export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const userId = await getAuthUserId();
  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const started = Date.now();

      function send(payload: Record<string, unknown>) {
        const line = `data: ${JSON.stringify(payload)}\n\n`;
        controller.enqueue(encoder.encode(line));
      }

      function sendError(message: string) {
        send({ error: message });
        controller.close();
      }

      // Poll loop
      while (true) {
        if (Date.now() - started > TIMEOUT_MS) {
          send({ projectId: params.id, status: 'failed', reason: 'timeout' });
          controller.close();
          return;
        }

        let project: {
          id: string;
          status: string;
          stitchProjectId: string | null;
          stitchDesignId: string | null;
          updatedAt: Date;
        } | undefined;

        try {
          [project] = await db
            .select({
              id: projects.id,
              status: projects.status,
              stitchProjectId: projects.stitchProjectId,
              stitchDesignId: projects.stitchDesignId,
              updatedAt: projects.updatedAt,
            })
            .from(projects)
            .where(and(eq(projects.id, params.id), eq(projects.userId, userId)))
            .limit(1);
        } catch {
          sendError('Database error');
          return;
        }

        if (!project) {
          sendError('Project not found');
          return;
        }

        send({
          projectId: project.id,
          status: project.status,
          stitchProjectId: project.stitchProjectId,
          stitchDesignId: project.stitchDesignId,
          updatedAt: project.updatedAt,
        });

        // Terminal states — close the stream
        if (project.status === 'complete' || project.status === 'failed') {
          controller.close();
          return;
        }

        // Wait before next poll
        await new Promise<void>((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no', // disable Nginx buffering
    },
  });
}
