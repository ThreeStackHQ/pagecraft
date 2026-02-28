import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editor — PageCraft',
  description: 'AI-powered code editor for your landing pages',
};

export default function EditorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
