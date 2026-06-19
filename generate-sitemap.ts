import fs from 'fs';
import path from 'path';
import { articles } from './src/data/articles';

const SITE_URL = 'https://fabricegoffin.be'; // Change this to the real production URL when ready
const DIST_DIR = path.resolve(process.cwd(), 'dist');

const routes = [
  '/',
  '/over',
  '/contact',
  '/standpunten',
  '/doelen',
  '/nieuws',
  '/privacy',
  '/voorwaarden',
  ...articles.map(a => `/nieuws/${a.slug}`)
];

// 1. Generate Sitemap
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    route => `  <url>
    <loc>${SITE_URL}${route}</loc>
    <changefreq>${route.includes('/nieuws/') ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemap);
console.log('✅ sitemap.xml generated');

// 2. Generate robots.txt
const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml`;

fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), robotsTxt);
console.log('✅ robots.txt generated');
