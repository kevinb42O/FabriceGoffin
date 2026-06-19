import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36');
  
  console.log("Searching Picuki for Fabrice Goffin...");
  await page.goto('https://www.picuki.com/search/Fabrice%20Goffin', { waitUntil: 'domcontentloaded' });
  
  const profiles = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.profile-result')).map(el => {
      const username = el.querySelector('.profile-name-bottom')?.innerText || '';
      const fullname = el.querySelector('.profile-name-top')?.innerText || '';
      return { username, fullname };
    });
  });
  
  console.log("Found profiles:", profiles);
  await browser.close();
})();
