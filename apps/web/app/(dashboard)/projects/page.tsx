import * as React from 'react';
import {
  Plus,
  FolderOpen,
  Pencil,
  Trash2,
  ExternalLink,
  Clock,
  Search,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

/* ─── Types ──────────────────────────────────────────────────────── */
interface Project {
  id: string;
  name: string;
  description: string;
  updatedAt: string;
  status: 'published' | 'draft';
  thumbnail: string | null;
}

/* ─── Mock data ──────────────────────────────────────────────────── */
const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'SaaS Landing Page',
    description: 'Modern SaaS product landing page with pricing',
    updatedAt: '2 hours ago',
    status: 'published',
    thumbnail: null,
  },
  {
    id: '2',
    name: 'Product Launch',
    description: 'Announcement page for new product launch',
    updatedAt: '1 day ago',
    status: 'draft',
    thumbnail: null,
  },
  {
    id: '3',
    name: 'Agency Portfolio',
    description: 'Creative agency showcase with case studies',
    updatedAt: '3 days ago',
    status: 'published',
    thumbnail: null,
  },
  {
    id: '4',
    name: 'Event Registration',
    description: 'Conference registration landing page',
    updatedAt: '5 days ago',
    status: 'draft',
    thumbnail: null,
  },
  {
    id: '5',
    name: 'App Store Page',
    description: 'Mobile app promotional landing page',
    updatedAt: '1 week ago',
    status: 'published',
    thumbnail: null,
  },
];

/* ─── Project card ───────────────────────────────────────────────── */
interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps): React.JSX.Element {
  return (
    <div
      className={cn(
        'glass-card rounded-xl overflow-hidden group',
        'hover:ring-1 hover:ring-violet-500/40 transition-all duration-200 animate-fade-in'
      )}
    >
      {/* Thumbnail */}
      <div className="relative h-40 bg-gradient-to-br from-violet-600/20 via-indigo-600/10 to-slate-500/5 flex items-center justify-center border-b border-border/50 overflow-hidden">
        <div className="flex flex-col items-center gap-1.5 text-muted-foreground/40">
          <FolderOpen className="h-10 w-10" />
          <span className="text-xs">No preview</span>
        </div>
        {/* Hover actions overlay */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            className="gap-1.5 h-8"
            aria-label={`Edit ${project.name}`}
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5 h-8"
            aria-label={`Open ${project.name}`}
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Open
          </Button>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="text-sm font-semibold text-foreground leading-tight truncate">
            {project.name}
          </h3>
          <Badge
            variant={project.status === 'published' ? 'success' : 'secondary'}
            className="text-[10px] capitalize shrink-0"
          >
            {project.status}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
          {project.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {project.updatedAt}
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-foreground"
              aria-label={`Edit ${project.name}`}
            >
              <Pencil className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-destructive"
              aria-label={`Delete ${project.name}`}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Empty state ────────────────────────────────────────────────── */
function EmptyProjects(): React.JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-fade-in">
      <div className="rounded-2xl bg-violet-600/10 border border-violet-500/20 p-6 mb-6 violet-glow">
        <Sparkles className="h-12 w-12 text-violet-500 mx-auto" />
      </div>
      <h2 className="text-xl font-bold text-foreground mb-2">
        Create your first landing page
      </h2>
      <p className="text-muted-foreground text-sm max-w-sm mb-6">
        Describe your product in plain English and PageCraft will generate a
        production-ready landing page in seconds.
      </p>
      <Button size="lg" className="gap-2">
        <Plus className="h-4 w-4" />
        Start Building
      </Button>
      <p className="text-xs text-muted-foreground mt-4">
        No credit card required · Free plan includes 10 generations
      </p>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function ProjectsPage(): React.JSX.Element {
  const hasProjects = MOCK_PROJECTS.length > 0;

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        {/* Search */}
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="search"
            placeholder="Search projects…"
            className={cn(
              'w-full h-9 rounded-md border border-input bg-background pl-9 pr-3 text-sm',
              'placeholder:text-muted-foreground',
              'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1',
              'transition-shadow'
            )}
          />
        </div>
        <Button className="gap-2 shrink-0">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Project count */}
      {hasProjects && (
        <p className="text-xs text-muted-foreground">
          {MOCK_PROJECTS.length} projects
        </p>
      )}

      {/* Grid or empty */}
      {hasProjects ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <EmptyProjects />
      )}
    </div>
  );
}
