import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36');
  
  const targetUrl = 'https://imginn.com/goffinfabrice/';
  console.log("Navigating to", targetUrl);
  await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });
  
  const html = await page.content();
  fs.writeFileSync('imginn_debug.html', html);
  
  const posts = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.items .item')).map(el => {
      const img = el.querySelector('img')?.getAttribute('src') || el.querySelector('img')?.getAttribute('data-src') || '';
      return img;
    }).filter(src => src.length > 0);
  });
  
  console.log(`Found ${posts.length} posts on Imginn.`);
  await browser.close();
})();
