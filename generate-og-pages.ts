/**
 * generate-og-pages.ts
 * 
 * Generates static HTML files for each article with correct Open Graph meta tags.
 * No Puppeteer needed — simply reads the SPA index.html shell and injects 
 * article-specific meta tags into the <head>.
 * 
 * Vercel serves static files from the filesystem BEFORE applying rewrites,
 * so these files will be served to Facebook's crawler with the correct og:image.
 * For normal users, the SPA shell hydrates and React Router takes over.
 */
import fs from 'fs';
import path from 'path';
import { articles } from './src/data/articles';

const DIST_DIR = path.resolve(process.cwd(), 'dist');
const SITE_URL = 'https://www.fabricegoffin.be';

// Read the original SPA shell
const spaShell = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf-8');

// Also generate pages for static routes with their own meta
const staticPages = [
  {
    route: '/',
    title: 'Fabrice Goffin — Schepen van Oostende',
    description: 'Ontdek de visie, standpunten en realisaties van Fabrice Goffin, Schepen van Dierenwelzijn, Digitalisering en Ontmoeting in Oostende.',
    image: `${SITE_URL}/og-image-v3.jpg`,
    type: 'website',
  },
  {
    route: '/over',
    title: 'Over Fabrice Goffin — Schepen van Oostende',
    description: 'Leer meer over Fabrice Goffin, Schepen in Oostende bevoegd voor Dierenwelzijn, Digitalisering en Ontmoeting.',
    image: `${SITE_URL}/og-image-v3.jpg`,
    type: 'website',
  },
  {
    route: '/nieuws',
    title: 'Nieuws — Fabrice Goffin',
    description: 'Blijf op de hoogte van het laatste nieuws over Fabrice Goffin en zijn werk als Schepen van Oostende.',
    image: `${SITE_URL}/og-image-v3.jpg`,
    type: 'website',
  },
  {
    route: '/standpunten',
    title: 'Standpunten — Fabrice Goffin',
    description: 'Ontdek de standpunten van Fabrice Goffin over Dierenwelzijn, Digitalisering en Ontmoeting in Oostende.',
    image: `${SITE_URL}/og-image-v3.jpg`,
    type: 'website',
  },
  {
    route: '/realisaties',
    title: 'Realisaties — Fabrice Goffin',
    description: 'Bekijk de realisaties van Fabrice Goffin als Schepen van Oostende.',
    image: `${SITE_URL}/og-image-v3.jpg`,
    type: 'website',
  },
  {
    route: '/contact',
    title: 'Contact — Fabrice Goffin',
    description: 'Neem contact op met Fabrice Goffin, Schepen van Oostende.',
    image: `${SITE_URL}/og-image-v3.jpg`,
    type: 'website',
  },
];

function generateMetaTags(page: { title: string; description: string; image: string; url: string; type: string }): string {
  return `
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="${page.type}" />
    <meta property="og:url" content="${page.url}" />
    <meta property="og:title" content="${page.title}" />
    <meta property="og:description" content="${page.description}" />
    <meta property="og:image" content="${page.image}" />
    <meta property="og:site_name" content="Fabrice Goffin" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${page.title}" />
    <meta name="twitter:description" content="${page.description}" />
    <meta name="twitter:image" content="${page.image}" />
    <link rel="canonical" href="${page.url}" />`;
}

function generatePage(metaTags: string, title: string, description: string): string {
  let html = spaShell;
  
  // Replace the title
  html = html.replace(
    /<title>.*?<\/title>/,
    `<title>${title}</title>`
  );
  
  // Replace the description
  html = html.replace(
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${description}" />`
  );
  
  // Replace the comment placeholder with actual OG tags
  html = html.replace(
    /<!-- Open Graph \/ Twitter meta tags are handled dynamically by react-helmet-async -->/,
    metaTags
  );
  
  return html;
}

function writePage(route: string, html: string): void {
  // Write as directory/index.html
  const dirPath = path.join(DIST_DIR, route);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  fs.writeFileSync(path.join(dirPath, 'index.html'), html);
  console.log(`✅ ${route}/index.html`);
}

console.log('\n🏗️  Generating OG pages...\n');

// Generate static pages
for (const page of staticPages) {
  const url = `${SITE_URL}${page.route === '/' ? '' : page.route}`;
  const metaTags = generateMetaTags({ ...page, url });
  const html = generatePage(metaTags, page.title, page.description);
  
  if (page.route === '/') {
    // Overwrite the root index.html
    fs.writeFileSync(path.join(DIST_DIR, 'index.html'), html);
    console.log('✅ /index.html (homepage)');
  } else {
    writePage(page.route, html);
  }
}

// Generate article pages
for (const article of articles) {
  const route = `/nieuws/${article.slug}`;
  const fullImage = article.image.startsWith('http') 
    ? article.image 
    : `${SITE_URL}${article.image}`;
  const url = `${SITE_URL}${route}`;
  const description = article.inhoud.slice(0, 150) + '...';
  const title = `${article.titel} — Fabrice Goffin`;
  
  const metaTags = generateMetaTags({
    title,
    description,
    image: fullImage,
    url,
    type: 'article',
  });
  
  const html = generatePage(metaTags, title, description);
  writePage(route, html);
}

console.log(`\n✨ Generated ${staticPages.length + articles.length} OG pages successfully!\n`);
