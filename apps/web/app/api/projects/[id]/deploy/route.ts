import { NextResponse } from 'next/server';
import { db, projects, exports as exportsTable, eq, and } from '@pagecraft/db';
import { getAuthUserId, unauthorized, notFound } from '@/lib/auth-helpers';
import { getUserTier } from '@/lib/tier';
import { checkDeployLimit, FREE_TIER_DEPLOY_LIMIT } from '@/lib/deploy-limit';

const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const VERCEL_API = 'https://api.vercel.com';

interface RouteContext {
  params: { id: string };
}

interface GeneratedFile {
  path: string;
  content: string;
}

interface GeneratedCode {
  files: GeneratedFile[];
}

interface VercelFile {
  file: string;
  data: string;
  encoding: 'utf-8';
}

interface VercelDeploymentResponse {
  id: string;
  url: string;
  readyState: string;
}

async function createVercelDeployment(
  projectName: string,
  files: VercelFile[]
): Promise<VercelDeploymentResponse> {
  const response = await fetch(`${VERCEL_API}/v13/deployments`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${VERCEL_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: projectName,
      files,
      projectSettings: {
        framework: 'nextjs',
      },
      target: 'production',
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Vercel deploy failed: ${error}`);
  }

  return response.json() as Promise<VercelDeploymentResponse>;
}

async function pollDeployment(deploymentId: string): Promise<string> {
  const maxAttempts = 36; // 3 minutes at 5s intervals

  for (let i = 0; i < maxAttempts; i++) {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const response = await fetch(
      `${VERCEL_API}/v13/deployments/${deploymentId}`,
      { headers: { Authorization: `Bearer ${VERCEL_TOKEN}` } }
    );

    if (!response.ok) continue;

    const data = (await response.json()) as VercelDeploymentResponse;

    if (data.readyState === 'READY') {
      return `https://${data.url}`;
    }

    if (data.readyState === 'ERROR') {
      throw new Error('Deployment failed on Vercel');
    }
  }

  throw new Error('Deployment timed out after 3 minutes');
}

/**
 * POST /api/projects/:id/deploy
 *
 * Deploys the project to Vercel via the REST API (file upload approach).
 * Free tier: 1 deploy/month. Pro: unlimited.
 */
export async function POST(_req: Request, { params }: RouteContext) {
  try {
    if (!VERCEL_TOKEN) {
      return NextResponse.json(
        { error: 'Vercel integration not configured' },
        { status: 503 }
      );
    }

    const userId = await getAuthUserId();
    if (!userId) return unauthorized();

    // Load project + verify ownership
    const [project] = await db
      .select()
      .from(projects)
      .where(and(eq(projects.id, params.id), eq(projects.userId, userId)))
      .limit(1);

    if (!project) return notFound('Project not found');

    if (!project.generatedCode) {
      return NextResponse.json(
        { error: 'Project has no generated code. Generate or edit the code first.' },
        { status: 400 }
      );
    }

    // Check tier + deploy limit
    const tier = await getUserTier(userId);
    const { canDeploy, count } = await checkDeployLimit(userId, tier);

    if (!canDeploy) {
      return NextResponse.json(
        {
          error: `Deploy limit reached. Free plan: ${FREE_TIER_DEPLOY_LIMIT} deploy/month (used: ${count}). Upgrade to Pro for unlimited deploys.`,
          upgradeUrl: '/pricing',
        },
        { status: 402 }
      );
    }

    // Convert generatedCode files to Vercel file format
    const generatedCode = project.generatedCode as GeneratedCode;
    const files: VercelFile[] = (generatedCode.files ?? []).map((f) => ({
      file: f.path,
      data: f.content,
      encoding: 'utf-8' as const,
    }));

    if (files.length === 0) {
      return NextResponse.json(
        { error: 'Project has no files to deploy.' },
        { status: 400 }
      );
    }

    // Create Vercel deployment
    const projectName = `pagecraft-${params.id.slice(0, 8)}`;
    const deployment = await createVercelDeployment(projectName, files);

    // Poll until ready (max 3 min)
    const deploymentUrl = await pollDeployment(deployment.id);

    // Store in exports table
    await db.insert(exportsTable).values({
      projectId: params.id,
      userId,
      exportType: 'vercel',
      deploymentUrl,
    });

    return NextResponse.json({
      url: deploymentUrl,
      deploymentId: deployment.id,
      status: 'deployed',
    });
  } catch (err) {
    console.error('[deploy-project]', err);
    const message = err instanceof Error ? err.message : 'Deployment failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
