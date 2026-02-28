'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { Download, Rocket, Monitor, Tablet, Smartphone, Save, ChevronRight, File, Folder, FolderOpen, Sparkles, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// Monaco editor loaded client-side only (no SSR)
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false, loading: () => <EditorLoadingSkeleton /> });

function EditorLoadingSkeleton() {
  return (
    <div className="flex items-center justify-center h-full bg-[#1e1e1e] text-gray-400 gap-2">
      <Loader2 className="h-5 w-5 animate-spin text-violet-400" />
      <span className="text-sm">Loading editor…</span>
    </div>
  );
}

// ─── File Tree ───────────────────────────────────────────────────────────────

interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  language?: string;
  children?: FileNode[];
  content?: string;
}

const INITIAL_FILES: FileNode[] = [
  {
    id: 'page',
    name: 'page.tsx',
    type: 'file',
    language: 'typescript',
    content: `import React from 'react';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-pink-400">
          Ship Faster with AI
        </h1>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Generate production-ready landing pages in seconds.
          No templates. No drag-and-drop. Just AI + your vision.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="px-8 py-4 bg-violet-600 hover:bg-violet-700 rounded-lg font-bold text-lg transition-colors">
            Start Building Free →
          </button>
          <button className="px-8 py-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg font-semibold text-lg transition-colors">
            View Demo
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { title: 'AI Design', desc: 'Google Stitch generates pixel-perfect designs from prompts' },
            { title: 'Monaco Editor', desc: 'VS Code-quality TypeScript + Tailwind editing experience' },
            { title: 'One-Click Deploy', desc: 'Push to Vercel instantly with production-ready Next.js code' },
          ].map((f) => (
            <div key={f.title} className="bg-gray-900/60 border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
`,
  },
  {
    id: 'styles',
    name: 'styles',
    type: 'folder',
    children: [
      {
        id: 'globals',
        name: 'globals.css',
        type: 'file',
        language: 'css',
        content: `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: 263 35% 6%;
  --foreground: 0 0% 98%;
}

body {
  background: hsl(var(--background));
  color: hsl(var(--foreground));
  font-family: 'Inter', sans-serif;
}
`,
      },
    ],
  },
  {
    id: 'components',
    name: 'components',
    type: 'folder',
    children: [
      {
        id: 'hero',
        name: 'Hero.tsx',
        type: 'file',
        language: 'typescript',
        content: `import React from 'react';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref?: string;
}

export function Hero({ title, subtitle, ctaText, ctaHref = '#' }: HeroProps) {
  return (
    <section className="text-center py-24 px-4">
      <h1 className="text-6xl font-extrabold mb-6">{title}</h1>
      <p className="text-xl text-gray-300 mb-10">{subtitle}</p>
      <a href={ctaHref} className="px-8 py-4 bg-violet-600 hover:bg-violet-700 rounded-lg font-bold text-lg transition-colors">
        {ctaText}
      </a>
    </section>
  );
}
`,
      },
    ],
  },
  {
    id: 'config',
    name: 'next.config.ts',
    type: 'file',
    language: 'typescript',
    content: `import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // PageCraft generated config
  reactStrictMode: true,
};

export default nextConfig;
`,
  },
];

function flattenFiles(nodes: FileNode[]): FileNode[] {
  return nodes.flatMap((n) => (n.type === 'file' ? [n] : flattenFiles(n.children ?? [])));
}

// ─── File Tree Item ──────────────────────────────────────────────────────────

function FileTreeItem({ node, depth, activeId, onSelect, expandedFolders, onToggleFolder }: {
  node: FileNode;
  depth: number;
  activeId: string;
  onSelect: (node: FileNode) => void;
  expandedFolders: Set<string>;
  onToggleFolder: (id: string) => void;
}) {
  const isExpanded = expandedFolders.has(node.id);
  const isActive = node.id === activeId;

  if (node.type === 'folder') {
    return (
      <div>
        <button
          onClick={() => onToggleFolder(node.id)}
          className="flex items-center gap-1.5 w-full text-left px-2 py-1 rounded text-sm text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-colors"
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
        >
          {isExpanded ? <FolderOpen className="h-3.5 w-3.5 text-yellow-400 shrink-0" /> : <Folder className="h-3.5 w-3.5 text-yellow-400 shrink-0" />}
          <span>{node.name}</span>
          <ChevronRight className={cn('h-3 w-3 ml-auto transition-transform', isExpanded && 'rotate-90')} />
        </button>
        {isExpanded && node.children?.map((child) => (
          <FileTreeItem key={child.id} node={child} depth={depth + 1} activeId={activeId} onSelect={onSelect} expandedFolders={expandedFolders} onToggleFolder={onToggleFolder} />
        ))}
      </div>
    );
  }

  return (
    <button
      onClick={() => onSelect(node)}
      className={cn(
        'flex items-center gap-1.5 w-full text-left px-2 py-1 rounded text-sm transition-colors',
        isActive ? 'bg-violet-600/20 text-violet-300' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
      )}
      style={{ paddingLeft: `${depth * 12 + 8}px` }}
    >
      <File className={cn('h-3.5 w-3.5 shrink-0', isActive ? 'text-violet-400' : 'text-gray-500')} />
      <span className="truncate">{node.name}</span>
    </button>
  );
}

// ─── Preview Sizes ──────────────────────────────────────────────────────────

type PreviewSize = 'desktop' | 'tablet' | 'mobile';

const PREVIEW_WIDTHS: Record<PreviewSize, string> = {
  desktop: '100%',
  tablet: '768px',
  mobile: '375px',
};

// ─── Main Editor Page ────────────────────────────────────────────────────────

export default function EditorPage() {
  const [activeFileId, setActiveFileId] = React.useState('page');
  const [fileContents, setFileContents] = React.useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    flattenFiles(INITIAL_FILES).forEach((f) => { if (f.content) map[f.id] = f.content; });
    return map;
  });
  const [previewSize, setPreviewSize] = React.useState<PreviewSize>('desktop');
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [saveStatus, setSaveStatus] = React.useState<'saved' | 'saving' | 'unsaved'>('saved');
  const [expandedFolders, setExpandedFolders] = React.useState<Set<string>>(new Set(['styles', 'components']));

  const autoSaveRef = React.useRef<ReturnType<typeof setTimeout>>();
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  const activeFile = flattenFiles(INITIAL_FILES).find((f) => f.id === activeFileId);
  const activeContent = fileContents[activeFileId] ?? '';

  // Auto-save debounced 2s
  const handleEditorChange = React.useCallback((value: string | undefined) => {
    if (value === undefined) return;
    setFileContents((prev) => ({ ...prev, [activeFileId]: value }));
    setSaveStatus('unsaved');
    if (autoSaveRef.current) clearTimeout(autoSaveRef.current);
    autoSaveRef.current = setTimeout(() => {
      setSaveStatus('saving');
      // TODO: persist to API
      setTimeout(() => setSaveStatus('saved'), 600);
    }, 2000);
  }, [activeFileId]);

  // Update preview on content change
  React.useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const html = fileContents['page'] ?? '';
    const previewHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script src="https://cdn.tailwindcss.com"></script>
  <style>body { margin: 0; font-family: Inter, sans-serif; }</style>
</head>
<body class="bg-gray-950 text-white">
  <div id="preview-root">
    <!-- PageCraft Live Preview -->
    <div style="padding: 2rem; text-align: center; color: #9ca3af;">
      <div style="font-size: 0.875rem; margin-bottom: 0.5rem;">📄 Live Preview</div>
      <div style="font-size: 0.75rem; color: #6b7280;">Editing: ${activeFile?.name ?? 'page.tsx'}</div>
      <div style="margin-top: 2rem; padding: 1.5rem; background: #111827; border-radius: 0.75rem; border: 1px solid #374151; text-align: left;">
        <pre style="color: #8b5cf6; font-size: 0.75rem; white-space: pre-wrap; overflow: hidden; max-height: 300px;">${html.slice(0, 500).replace(/</g, '&lt;').replace(/>/g, '&gt;')}${html.length > 500 ? '\n...' : ''}</pre>
      </div>
    </div>
  </div>
</body>
</html>`;
    iframe.srcdoc = previewHtml;
  }, [fileContents, activeFile?.name]);

  const handleToggleFolder = React.useCallback((id: string) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const handleExport = () => {
    // TODO: call /api/projects/[id]/export
    alert('Export: ZIP download will be implemented (Sprint 1.10 API call)');
  };

  const handleDeploy = () => {
    // TODO: call Vercel deploy API
    alert('Deploy: Vercel one-click deploy will be implemented');
  };

  return (
    <div className="flex flex-col h-screen bg-[#0d0d14] text-white overflow-hidden">
      {/* ── Top Toolbar ─────────────────────────────────────────────────────── */}
      <header className="flex items-center h-12 px-3 gap-2 border-b border-gray-800/60 bg-[#12121a] shrink-0">
        {/* Logo */}
        <div className="flex items-center gap-2 mr-2">
          <div className="w-6 h-6 bg-violet-600 rounded flex items-center justify-center shrink-0">
            <Sparkles className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-sm font-semibold text-gray-200 hidden sm:block">PageCraft</span>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-800 mx-1" />

        {/* File name */}
        <div className="flex items-center gap-1.5 text-sm">
          <span className="text-gray-500">projects /</span>
          <span className="text-gray-300 font-medium">{activeFile?.name ?? 'page.tsx'}</span>
          {saveStatus === 'unsaved' && <span className="w-2 h-2 rounded-full bg-orange-400 ml-0.5" title="Unsaved changes" />}
          {saveStatus === 'saving' && <Loader2 className="w-3 h-3 animate-spin text-gray-400 ml-0.5" />}
          {saveStatus === 'saved' && <span className="text-[10px] text-gray-600 ml-1">saved</span>}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Preview size toggles */}
        <div className="hidden sm:flex items-center gap-0.5 bg-gray-800/60 rounded-lg p-1">
          {([
            { size: 'desktop' as PreviewSize, Icon: Monitor, label: 'Desktop' },
            { size: 'tablet' as PreviewSize, Icon: Tablet, label: 'Tablet' },
            { size: 'mobile' as PreviewSize, Icon: Smartphone, label: 'Mobile' },
          ] as const).map(({ size, Icon, label }) => (
            <button
              key={size}
              onClick={() => setPreviewSize(size)}
              title={label}
              className={cn('p-1.5 rounded-md transition-colors', previewSize === size ? 'bg-violet-600 text-white' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700')}
            >
              <Icon className="h-3.5 w-3.5" />
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-800 mx-1" />

        {/* Action buttons */}
        <button
          onClick={handleExport}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-md transition-colors text-gray-200"
        >
          <Download className="h-3.5 w-3.5" />
          <span className="hidden sm:block">Export</span>
        </button>
        <button
          onClick={handleDeploy}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-violet-600 hover:bg-violet-700 rounded-md transition-colors text-white"
        >
          <Rocket className="h-3.5 w-3.5" />
          <span className="hidden sm:block">Deploy</span>
        </button>
      </header>

      {/* ── Main Body ───────────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">
        {/* File Tree Panel */}
        {sidebarOpen && (
          <div className="w-52 shrink-0 flex flex-col border-r border-gray-800/60 bg-[#12121a] overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 border-b border-gray-800/40">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">Files</span>
              <button onClick={() => setSidebarOpen(false)} className="text-gray-600 hover:text-gray-300 transition-colors" aria-label="Close file tree">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-1.5 sidebar-scroll">
              {INITIAL_FILES.map((node) => (
                <FileTreeItem
                  key={node.id}
                  node={node}
                  depth={0}
                  activeId={activeFileId}
                  onSelect={(n) => setActiveFileId(n.id)}
                  expandedFolders={expandedFolders}
                  onToggleFolder={handleToggleFolder}
                />
              ))}
            </div>
          </div>
        )}

        {/* Editor Pane */}
        <div className="flex flex-col flex-1 min-w-0 border-r border-gray-800/60 overflow-hidden">
          {/* Editor tabs */}
          <div className="flex items-center h-9 bg-[#0d0d14] border-b border-gray-800/40 px-2 gap-0 overflow-x-auto shrink-0">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="flex items-center gap-1 mr-2 text-gray-500 hover:text-gray-300 transition-colors text-xs"
                title="Open file tree"
              >
                <Folder className="h-3.5 w-3.5" />
              </button>
            )}
            <div className="flex items-center gap-1 px-3 py-1 bg-[#1e1e2e] border-t border-violet-500 text-xs text-gray-200 rounded-t shrink-0">
              <File className="h-3 w-3 text-violet-400 shrink-0" />
              <span>{activeFile?.name ?? 'page.tsx'}</span>
            </div>
          </div>

          {/* Monaco */}
          <div className="flex-1 overflow-hidden editor-container">
            <MonacoEditor
              height="100%"
              language={activeFile?.language ?? 'typescript'}
              value={activeContent}
              onChange={handleEditorChange}
              theme="vs-dark"
              options={{
                fontSize: 13,
                fontFamily: '"JetBrains Mono", "Fira Code", "Cascadia Code", Menlo, Monaco, "Courier New", monospace',
                fontLigatures: true,
                lineNumbers: 'on',
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                tabSize: 2,
                automaticLayout: true,
                padding: { top: 12, bottom: 12 },
                smoothScrolling: true,
                cursorSmoothCaretAnimation: 'on',
                renderLineHighlight: 'gutter',
                bracketPairColorization: { enabled: true },
                formatOnPaste: true,
                suggest: { showKeywords: true },
              }}
            />
          </div>
        </div>

        {/* Preview Pane */}
        <div className="flex flex-col flex-1 min-w-0 bg-gray-950 overflow-hidden">
          {/* Preview header */}
          <div className="flex items-center h-9 bg-[#0d0d14] border-b border-gray-800/40 px-3 shrink-0">
            <div className="flex items-center gap-1.5 flex-1 min-w-0">
              <div className="flex gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
              <div className="flex-1 mx-2 bg-gray-800/60 rounded text-[11px] text-gray-500 px-2 py-0.5 text-center truncate">
                localhost:3000 — {previewSize}
              </div>
            </div>
          </div>

          {/* Preview iframe container */}
          <div className="flex-1 overflow-auto flex justify-center bg-gray-900/50 p-2">
            <div
              className="relative transition-all duration-300 ease-in-out h-full"
              style={{ width: PREVIEW_WIDTHS[previewSize], minWidth: previewSize !== 'desktop' ? '200px' : '100%' }}
            >
              <iframe
                ref={iframeRef}
                title="Live Preview"
                className="w-full h-full bg-white rounded-sm"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Status Bar ──────────────────────────────────────────────────────── */}
      <footer className="flex items-center h-6 px-3 gap-4 bg-violet-900/30 border-t border-violet-800/30 text-[11px] text-gray-500 shrink-0">
        <span className="text-violet-400 font-medium">PageCraft Editor</span>
        <span>TypeScript · React · Tailwind</span>
        <div className="flex-1" />
        <span className="flex items-center gap-1">
          {saveStatus === 'saved' && '✓ Auto-saved'}
          {saveStatus === 'saving' && '⟳ Saving…'}
          {saveStatus === 'unsaved' && '● Unsaved changes'}
        </span>
        <span>ln 1, col 1</span>
      </footer>
    </div>
  );
}
