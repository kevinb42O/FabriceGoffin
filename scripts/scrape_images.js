import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Set a real user agent
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36');
  
  const query = encodeURIComponent("Fabrice Goffin Oostende");
  console.log(`Navigating to search page for: Fabrice Goffin Oostende`);
  
  await page.goto(`https://duckduckgo.com/?q=${query}&iax=images&ia=images`, { waitUntil: 'networkidle2' });
  
  // Wait for image tiles to load
  try {
    await page.waitForSelector('img.tile--img__img', { timeout: 10000 });
  } catch(e) {
    console.log("Could not find standard DDG image selector, trying alternative...");
  }
  
  // Scroll a bit to load lazy images
  await page.evaluate(() => window.scrollBy(0, 1000));
  await new Promise(r => setTimeout(r, 2000));
  await page.evaluate(() => window.scrollBy(0, 1000));
  await new Promise(r => setTimeout(r, 2000));
  
  console.log("Extracting image URLs...");
  
  const images = await page.evaluate(() => {
    // Try different possible selectors for DuckDuckGo images
    let imgs = Array.from(document.querySelectorAll('img.tile--img__img, img.module--images__img'));
    if (imgs.length === 0) {
      imgs = Array.from(document.querySelectorAll('img'));
    }
    
    return imgs.map(img => {
      // Get the best available source
      return img.getAttribute('src') || img.getAttribute('data-src') || "";
    }).filter(src => src.length > 0 && !src.includes('logo') && !src.includes('icon'));
  });
  
  console.log(`Found ${images.length} images. Downloading top 20...`);
  
  const outDir = path.join(process.cwd(), 'public', 'images', 'social');
  
  // Clean directory
  if (fs.existsSync(outDir)) {
    fs.readdirSync(outDir).forEach(f => fs.unlinkSync(path.join(outDir, f)));
  } else {
    fs.mkdirSync(outDir, { recursive: true });
  }
  
  let count = 0;
  const validImages = [];
  
  for (let i = 0; i < images.length; i++) {
    if (count >= 20) break;
    
    let src = images[i];
    if (src.startsWith('//')) {
      src = 'https:' + src;
    }
    
    try {
      let buffer;
      if (src.startsWith('data:image')) {
        // Handle base64
        const base64Data = src.split(',')[1];
        buffer = Buffer.from(base64Data, 'base64');
      } else {
        // Fetch via puppeteer page to bypass bot protections completely
        const viewSource = await page.goto(src);
        buffer = await viewSource.buffer();
      }
      
      if (buffer && buffer.length > 1000) { // skip tiny icons
        const filename = `social_${count + 1}.jpg`; // save all as jpg for simplicity
        fs.writeFileSync(path.join(outDir, filename), buffer);
        validImages.push(filename);
        console.log(`Saved ${filename}`);
        count++;
      }
    } catch (e) {
      console.log(`Failed to save image ${i}:`, e.message);
    }
  }
  
  // Generate TypeScript
  const posts = validImages.map((filename, idx) => {
    const num = idx + 1;
    return {
      id: `post_${num}`,
      image: `/images/social/${filename}`,
      likes: 100 + (num * 47) % 500,
      comments: 5 + (num * 13) % 50,
      caption: "Fabrice Goffin in actie voor Oostende! Samen maken we de stad beter. #vooruitplus #oostende",
      span: num % 7 === 1 ? "col-span-2 row-span-2" : (num % 4 === 0 ? "col-span-1 row-span-2" : "col-span-1 row-span-1")
    };
  });
  
  const tsContent = `export interface InstagramPost {
  id: string;
  image: string;
  likes: number;
  comments: number;
  caption: string;
  span: string;
}

export const instagramPosts: InstagramPost[] = ${JSON.stringify(posts, null, 2)};
`;

  fs.writeFileSync(path.join(process.cwd(), 'src', 'data', 'instagram.ts'), tsContent);
  console.log(`Successfully generated src/data/instagram.ts with ${validImages.length} images.`);
  
  await browser.close();
})();
