import { describe, it, expect } from 'vitest';
import { generateNextJsCode } from '../generator';
import type { StitchDesign } from '../schema';

describe('generateNextJsCode', () => {
  it('should generate Next.js files from Stitch design', () => {
    const testDesign: StitchDesign = {
      projectId: 'test-project',
      screenId: 'test-screen',
      deviceType: 'desktop',
      theme: {
        colors: {
          primary: '#6366f1',
          secondary: '#8b5cf6',
          accent: '#ec4899',
          background: '#ffffff',
          text: '#1f2937',
        },
        fonts: {
          heading: 'Inter',
          body: 'Inter',
        },
      },
      elements: [
        {
          id: 'hero-1',
          type: 'hero',
          style: {
            layout: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '16',
          },
          children: [
            {
              id: 'hero-heading',
              type: 'heading',
              props: {
                text: 'Hello World',
              },
              style: {
                fontSize: '4xl',
                fontWeight: 'bold',
              },
            },
          ],
        },
      ],
    };

    const result = generateNextJsCode(testDesign);

    expect(result.files).toBeDefined();
    expect(result.files.length).toBeGreaterThan(0);

    // Check for required files
    const filePaths = result.files.map(f => f.path);
    expect(filePaths).toContain('app/page.tsx');
    expect(filePaths).toContain('tailwind.config.js');
    expect(filePaths).toContain('package.json');
    expect(filePaths).toContain('README.md');
    expect(filePaths).toContain('app/layout.tsx');
    expect(filePaths).toContain('app/globals.css');

    // Check Hero component was extracted
    expect(filePaths).toContain('components/Hero.tsx');

    // Verify package.json content
    const packageJson = result.files.find(f => f.path === 'package.json');
    expect(packageJson).toBeDefined();
    expect(packageJson?.content).toContain('next');
    expect(packageJson?.content).toContain('tailwindcss');

    // Verify tailwind.config.js includes theme colors
    const tailwindConfig = result.files.find(f => f.path === 'tailwind.config.js');
    expect(tailwindConfig).toBeDefined();
    expect(tailwindConfig?.content).toContain('#6366f1'); // primary color
  });

  it('should validate input with Zod schema', () => {
    const invalidDesign = {
      projectId: 'test',
      // missing required fields
    };

    expect(() => generateNextJsCode(invalidDesign)).toThrow();
  });

  it('should generate responsive Tailwind classes', () => {
    const testDesign: StitchDesign = {
      projectId: 'test',
      screenId: 'test',
      deviceType: 'desktop',
      theme: {
        colors: {
          primary: '#000000',
          secondary: '#111111',
          accent: '#222222',
          background: '#ffffff',
          text: '#000000',
        },
        fonts: {
          heading: 'Arial',
          body: 'Arial',
        },
      },
      elements: [
        {
          id: 'test-1',
          type: 'hero',
          style: {
            layout: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
          },
          children: [
            {
              id: 'btn',
              type: 'button',
              props: { text: 'Click me', href: '/test' },
              style: {
                backgroundColor: '#6366f1',
                padding: '4',
                borderRadius: 'lg',
              },
            },
          ],
        },
      ],
    };

    const result = generateNextJsCode(testDesign);
    const heroComponent = result.files.find(f => f.path === 'components/Hero.tsx');

    expect(heroComponent).toBeDefined();
    expect(heroComponent?.content).toContain('flex');
    expect(heroComponent?.content).toContain('flex-col');
    expect(heroComponent?.content).toContain('items-center');
    expect(heroComponent?.content).toContain('justify-center');
  });

  it('should handle images correctly', () => {
    const testDesign: StitchDesign = {
      projectId: 'test',
      screenId: 'test',
      deviceType: 'desktop',
      theme: {
        colors: {
          primary: '#000',
          secondary: '#111',
          accent: '#222',
          background: '#fff',
          text: '#000',
        },
        fonts: {
          heading: 'Arial',
          body: 'Arial',
        },
      },
      elements: [
        {
          id: 'hero',
          type: 'hero',
          children: [
            {
              id: 'img-1',
              type: 'image',
              props: {
                src: '/hero.jpg',
                alt: 'Hero image',
              },
              style: {
                width: '800px',
                height: '600px',
              },
            },
          ],
        },
      ],
    };

    const result = generateNextJsCode(testDesign);
    const heroComponent = result.files.find(f => f.path === 'components/Hero.tsx');

    expect(heroComponent).toBeDefined();
    expect(heroComponent?.content).toContain('img');
    expect(heroComponent?.content).toContain('src="/hero.jpg"');
    expect(heroComponent?.content).toContain('alt="Hero image"');
  });
});
