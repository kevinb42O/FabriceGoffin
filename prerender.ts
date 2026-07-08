import puppeteer from 'puppeteer';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { articles } from './src/data/articles';

const app = express();
const DIST_DIR = path.resolve(process.cwd(), 'dist');

// Keep a copy of the original clean index.html before prerendering overwrites it
const ORIGINAL_INDEX_HTML = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf-8');

// Serve static assets from the dist directory
app.use(express.static(DIST_DIR));

// Fallback all routes to the ORIGINAL index.html (the clean SPA shell)
app.get('*', (_req, res) => {
  res.type('html').send(ORIGINAL_INDEX_HTML);
});

const PORT = 3001;

const server = app.listen(PORT, async () => {
  console.log(`\n🚀 Starting Prerendering process on http://localhost:${PORT}...`);
  
  const routes = [
    '/',
    '/over',
    '/contact',
    '/standpunten',
    '/realisaties',
    '/nieuws',
    '/privacy',
    '/voorwaarden',
    ...articles.map(a => `/nieuws/${a.slug}`)
  ];

  try {
    const browser = await puppeteer.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    });

    for (const route of routes) {
      console.log(`⏳ Rendering: ${route}`);
      
      // Create a FRESH page for each route to prevent Helmet tag leakage
      const page = await browser.newPage();
      
      await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0', timeout: 30000 });
      
      const html = await page.content();
      await page.close();
      
      // Create nested directories and write index.html (for directory-based serving)
      const dirPath = path.join(DIST_DIR, route);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      fs.writeFileSync(path.join(dirPath, 'index.html'), html);
      
      // Also write a flat .html file for Vercel's cleanUrls feature
      // e.g. /over -> dist/over.html, /nieuws/slug -> dist/nieuws/slug.html
      // This ensures Vercel serves the pre-rendered file BEFORE the rewrite fallback
      if (route !== '/') {
        const flatPath = path.join(DIST_DIR, `${route}.html`);
        const flatDir = path.dirname(flatPath);
        if (!fs.existsSync(flatDir)) {
          fs.mkdirSync(flatDir, { recursive: true });
        }
        fs.writeFileSync(flatPath, html);
        console.log(`✅ Saved: ${route}/index.html + ${route}.html`);
      } else {
        console.log(`✅ Saved: /index.html`);
      }
    }
    
    await browser.close();
    console.log('✨ Prerendering completed successfully!');
  } catch (error) {
    console.error('❌ Prerendering failed:', error);
  } finally {
    server.close();
  }
});
