import { NextRequest, NextResponse } from 'next/server';
import JSZip from 'jszip';
import { db, projects, exports as exportsTable, eq, and, gte, sql } from '@pagecraft/db';
import { getAuthUserId, unauthorized, notFound } from '@/lib/auth-helpers';
import { getUserTier } from '@/lib/tier';

const FREE_TIER_EXPORT_LIMIT = 3; // per project per month

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

/**
 * GET /api/projects/:id/export?type=nextjs|html
 *
 * Exports the generated project code as a ZIP file (Next.js) or static HTML file.
 * Rate limited for free tier: max 3 exports per project per month.
 */
export async function GET(req: NextRequest, { params }: RouteContext) {
  try {
    const userId = await getAuthUserId();
    if (!userId) return unauthorized();

    const exportType = req.nextUrl.searchParams.get('type') ?? 'nextjs';
    if (exportType !== 'nextjs' && exportType !== 'html') {
      return NextResponse.json(
        { error: 'Invalid export type. Use type=nextjs or type=html' },
        { status: 400 }
      );
    }

    // Verify project ownership
    const [project] = await db
      .select()
      .from(projects)
      .where(and(eq(projects.id, params.id), eq(projects.userId, userId)))
      .limit(1);

    if (!project) return notFound('Project not found');

    if (!project.generatedCode) {
      return NextResponse.json(
        { error: 'Project has no generated code yet. Please wait for generation to complete.' },
        { status: 400 }
      );
    }

    // Rate limit check for free tier
    const tier = await getUserTier(userId);
    if (tier === 'free') {
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const [result] = await db
        .select({ count: sql<number>`count(*)::int` })
        .from(exportsTable)
        .where(
          and(
            eq(exportsTable.projectId, params.id),
            eq(exportsTable.userId, userId),
            gte(exportsTable.createdAt, startOfMonth)
          )
        );

      if ((result?.count ?? 0) >= FREE_TIER_EXPORT_LIMIT) {
        return NextResponse.json(
          {
            error: `Free tier allows ${FREE_TIER_EXPORT_LIMIT} exports per project per month. Upgrade to Pro for unlimited exports.`,
            upgradeUrl: '/pricing',
          },
          { status: 402 }
        );
      }
    }

    const generatedCode = project.generatedCode as GeneratedCode;
    const files: GeneratedFile[] = generatedCode.files ?? [];
    const projectSlug = project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'pagecraft-project';

    let body: Buffer;
    let contentType: string;
    let filename: string;

    if (exportType === 'nextjs') {
      body = await buildNextJsZip(projectSlug, files);
      contentType = 'application/zip';
      filename = `${projectSlug}.zip`;
    } else {
      body = Buffer.from(buildHtmlExport(project.name, files));
      contentType = 'text/html; charset=utf-8';
      filename = `${projectSlug}.html`;
    }

    // Track the export
    await db.insert(exportsTable).values({
      projectId: params.id,
      userId,
      exportType,
    });

    return new NextResponse(new Uint8Array(body), {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': body.length.toString(),
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('[export-project]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ─── ZIP Builder ──────────────────────────────────────────────────────────────

async function buildNextJsZip(projectSlug: string, files: GeneratedFile[]): Promise<Buffer> {
  const zip = new JSZip();
  const folder = zip.folder(projectSlug)!;

  const filePaths = files.map((f) => f.path);

  // Add all generated files
  for (const file of files) {
    folder.file(file.path, file.content);
  }

  // Add boilerplate files that may not be in generated output
  if (!filePaths.includes('next.config.js')) {
    folder.file('next.config.js', NEXT_CONFIG);
  }

  if (!filePaths.includes('tsconfig.json')) {
    folder.file('tsconfig.json', TSCONFIG);
  }

  if (!filePaths.some((p) => p.includes('globals.css'))) {
    folder.file('app/globals.css', GLOBALS_CSS);
  }

  if (!filePaths.some((p) => p.includes('layout'))) {
    folder.file('app/layout.tsx', ROOT_LAYOUT);
  }

  // .gitignore
  folder.file('.gitignore', GITIGNORE);

  return Buffer.from(await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' }));
}

// ─── HTML Builder ─────────────────────────────────────────────────────────────

function buildHtmlExport(projectName: string, files: GeneratedFile[]): string {
  // Extract any inline styles from generated CSS files
  const cssFile = files.find((f) => f.path.endsWith('.css') && !f.path.includes('globals'));
  const mainPage = files.find((f) => f.path === 'app/page.tsx' || f.path === 'page.tsx');

  const inlineStyles = cssFile?.content ?? '';
  const notice = mainPage
    ? `<!-- Source: ${mainPage.path} (React/Next.js component - see ZIP export for full project) -->`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(projectName)}</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  ${inlineStyles ? `<style>\n${inlineStyles}\n  </style>` : ''}
</head>
<body class="bg-white antialiased">
  ${notice}
  <div id="root">
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div class="text-center px-6">
        <div class="w-16 h-16 bg-indigo-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-3">${escapeHtml(projectName)}</h1>
        <p class="text-gray-500 mb-6 max-w-md">This project was generated by PageCraft.<br />For the full interactive experience, use the Next.js export.</p>
        <div class="flex gap-3 justify-center">
          <a href="#" class="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
            Download Next.js Project
          </a>
          <a href="https://pagecraft.threestack.io" target="_blank" class="px-5 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            Open PageCraft
          </a>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ─── Boilerplate templates ─────────────────────────────────────────────────────

const NEXT_CONFIG = `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
`;

const TSCONFIG = JSON.stringify(
  {
    compilerOptions: {
      target: 'es5',
      lib: ['dom', 'dom.iterable', 'esnext'],
      allowJs: true,
      skipLibCheck: true,
      strict: true,
      noEmit: true,
      esModuleInterop: true,
      module: 'esnext',
      moduleResolution: 'bundler',
      resolveJsonModule: true,
      isolatedModules: true,
      jsx: 'preserve',
      incremental: true,
      plugins: [{ name: 'next' }],
      paths: { '@/*': ['./*'] },
    },
    include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
    exclude: ['node_modules'],
  },
  null,
  2
);

const GLOBALS_CSS = `@tailwind base;
@tailwind components;
@tailwind utilities;
`;

const ROOT_LAYOUT = `import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'My App',
  description: 'Generated by PageCraft',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
`;

const GITIGNORE = `# Dependencies
node_modules/

# Next.js
.next/
out/

# Environment
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
`;
