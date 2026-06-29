import puppeteer from 'puppeteer';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { articles } from './src/data/articles';

const app = express();
const DIST_DIR = path.resolve(process.cwd(), 'dist');

// Serve static assets from the dist directory
app.use(express.static(DIST_DIR));

// Fallback all routes to index.html to allow client-side routing initially
app.get('*', (req, res) => {
  res.sendFile(path.resolve(DIST_DIR, 'index.html'));
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
    
    const page = await browser.newPage();
    
    // Optioneel: blokkeer netwerkverzoeken die niet nodig zijn (bv externe analytics) om sneller te renderen
    // await page.setRequestInterception(true);
    // page.on('request', (req) => { ... });

    for (const route of routes) {
      console.log(`⏳ Rendering: ${route}`);
      // Wacht tot er geen actieve netwerkverzoeken meer zijn gedurende 500ms (betekent dat React en Helmet klaar zijn)
      await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0', timeout: 30000 });
      
      // Get the full HTML
      const html = await page.content();
      
      // Create nested directories if needed
      const dirPath = path.join(DIST_DIR, route);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      
      // For the root route '/', it will overwrite dist/index.html
      // For others, it writes dist/over/index.html etc.
      // This allows simple static hosting like Netlify/Vercel or standard Apache/Nginx to serve the correct file
      fs.writeFileSync(path.join(dirPath, 'index.html'), html);
      console.log(`✅ Saved: ${path.join(route, 'index.html')}`);
    }
    
    await browser.close();
    console.log('✨ Prerendering completed successfully!');
  } catch (error) {
    console.error('❌ Prerendering failed:', error);
  } finally {
    server.close();
  }
});
