import { Suspense } from 'react';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { PageLoader, ProjectCardSkeleton } from '../../components/Skeleton';

/** Placeholder: will be replaced with real project list fetching */
async function ProjectList() {
  // TODO: fetch from /api/projects when API routes are implemented
  const projects: Array<{ id: string; name: string; status: string }> = [];

  if (projects.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 p-10 text-center">
        <h2 className="mb-2 text-lg font-medium text-gray-700">No projects yet</h2>
        <p className="text-sm text-gray-500">
          Create your first landing page by describing it in the prompt box.
        </p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p) => (
        <li key={p.id} className="rounded-lg border border-gray-200 p-5">
          <h3 className="font-semibold">{p.name}</h3>
          <p className="text-sm text-gray-500 capitalize">{p.status}</p>
        </li>
      ))}
    </ul>
  );
}

function ProjectsLoadingFallback() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">PageCraft Dashboard</h1>
        <p className="mt-2 text-gray-600">AI-powered landing page builder</p>
      </header>

      <main>
        <section className="mb-6">
          <h2 className="mb-4 text-xl font-semibold">Your Projects</h2>
          <ErrorBoundary
            fallback={
              <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-700">
                Failed to load projects. Please refresh the page.
              </div>
            }
          >
            <Suspense fallback={<ProjectsLoadingFallback />}>
              <ProjectList />
            </Suspense>
          </ErrorBoundary>
        </section>
      </main>
    </div>
  );
}
