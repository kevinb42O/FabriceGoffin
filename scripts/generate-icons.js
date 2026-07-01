import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const svgContent = fs.readFileSync(path.join(process.cwd(), 'public', 'pwa-icon.svg'), 'utf8');
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { margin: 0; padding: 0; background: transparent; }
          svg { width: 100vw; height: 100vh; display: block; }
        </style>
      </head>
      <body>
        ${svgContent}
      </body>
    </html>
  `;
  
  await page.setContent(html);
  
  // 192x192
  await page.setViewport({ width: 192, height: 192 });
  await page.screenshot({ path: path.join(process.cwd(), 'public', 'pwa-192x192.png'), omitBackground: true });
  
  // 512x512
  await page.setViewport({ width: 512, height: 512 });
  await page.screenshot({ path: path.join(process.cwd(), 'public', 'pwa-512x512.png'), omitBackground: true });

  await browser.close();
  console.log('Icons generated successfully.');
})();
