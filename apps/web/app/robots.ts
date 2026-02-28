import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard/', '/api/'],
      },
    ],
    sitemap: 'https://pagecraft.threestack.io/sitemap.xml',
    host: 'https://pagecraft.threestack.io',
  };
}
