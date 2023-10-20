export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/misRestaurantes',
    },
    // sitemap: 'https://acme.com/sitemap.xml',
  }
}