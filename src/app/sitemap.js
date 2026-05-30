export default function sitemap() {
  const baseUrl = 'https://novastacklabs.com';
  
  const routes = [
    '',
    '/about',
    '/services',
    '/technologies',
    '/process',
    '/portfolio',
    '/pricing',
    '/blog',
    '/careers',
    '/contact',
    '/faq',
    '/industries',
    '/privacy',
    '/terms',
    '/cookie-policy'
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/blog' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : route === '/services' || route === '/portfolio' ? 0.9 : 0.7,
  }));
}
