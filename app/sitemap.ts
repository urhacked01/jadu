import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://dhanlaxmihero.com';

  // Core pages
  const routes = [
    '',
    '/bikes',
    '/showrooms',
    '/about',
    '/contact',
    '/testimonials',
    '/services',
    '/finance-calculator',
    '/book-test-ride',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Add dynamic bikes routes if you have them
  // This would typically come from your data source
  // For example:
  /*
  const bikes = [
    { id: 'splendor-plus' },
    { id: 'super-splendor' },
    { id: 'karizma-xmr' },
    // etc.
  ];

  const bikeRoutes = bikes.map(bike => ({
    url: `${baseUrl}/bikes/${bike.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...bikeRoutes];
  */

  return routes;
}
