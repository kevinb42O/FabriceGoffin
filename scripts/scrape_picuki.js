import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36');
  
  console.log("Navigating to Picuki profile: goffinfabrice");
  await page.goto('https://www.picuki.com/profile/goffinfabrice', { waitUntil: 'domcontentloaded' });
  
  const posts = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.box-photo')).map(el => {
      const img = el.querySelector('.post-image')?.getAttribute('src') || '';
      const caption = el.querySelector('.photo-description')?.innerText?.trim() || '';
      const likes = parseInt(el.querySelector('.icon-thumbs-up-alt')?.nextSibling?.textContent?.trim() || '0');
      const comments = parseInt(el.querySelector('.icon-chat')?.nextSibling?.textContent?.trim() || '0');
      return { img, caption, likes, comments };
    }).filter(p => p.img.length > 0);
  });
  
  console.log(`Found ${posts.length} posts on Picuki.`);
  
  if (posts.length === 0) {
    console.log("No posts found. Writing a fallback to check if profile exists.");
    const html = await page.content();
    fs.writeFileSync('picuki_debug.html', html);
    await browser.close();
    return;
  }
  
  const outDir = path.join(process.cwd(), 'public', 'images', 'social');
  if (fs.existsSync(outDir)) {
    fs.readdirSync(outDir).forEach(f => fs.unlinkSync(path.join(outDir, f)));
  } else {
    fs.mkdirSync(outDir, { recursive: true });
  }
  
  let count = 0;
  const validPosts = [];
  
  for (let i = 0; i < posts.length; i++) {
    if (count >= 20) break;
    
    let src = posts[i].img;
    
    try {
      const viewSource = await page.goto(src);
      const buffer = await viewSource.buffer();
      
      if (buffer && buffer.length > 1000) {
        const filename = `social_ig_${count + 1}.jpg`;
        fs.writeFileSync(path.join(outDir, filename), buffer);
        validPosts.push({
            id: `post_${count + 1}`,
            image: `/images/social/${filename}`,
            likes: posts[i].likes || 150,
            comments: posts[i].comments || 10,
            caption: posts[i].caption || "Vooruit Plus Oostende",
            span: (count + 1) % 7 === 1 ? "col-span-2 row-span-2" : ((count + 1) % 4 === 0 ? "col-span-1 row-span-2" : "col-span-1 row-span-1")
        });
        console.log(`Saved ${filename}`);
        count++;
      }
    } catch (e) {
      console.log(`Failed to save image ${i}:`, e.message);
    }
  }
  
  const tsContent = `export interface InstagramPost {
  id: string;
  image: string;
  likes: number;
  comments: number;
  caption: string;
  span: string;
}

export const instagramPosts: InstagramPost[] = ${JSON.stringify(validPosts, null, 2)};
`;

  fs.writeFileSync(path.join(process.cwd(), 'src', 'data', 'instagram.ts'), tsContent);
  console.log(`Successfully generated src/data/instagram.ts with ${validPosts.length} IG images.`);
  
  await browser.close();
})();
