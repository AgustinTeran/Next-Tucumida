export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/misRestaurantes/',
    },
    sitemap: 'https://tucumida.com.ar/public/sitemap.xml',
  }
}