import assert from 'node:assert/strict';
import puppeteer, { type Page } from 'puppeteer';
import { mkdir } from 'node:fs/promises';
import { mobileScore } from '../src/lib/mobileHomeMotion';

const origin = process.env.TEST_URL ?? 'http://localhost:3000';
const browser = await puppeteer.launch({ headless: true, executablePath: process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
const page = await browser.newPage();
const errors: string[] = [];
page.on('pageerror', error => errors.push(error.message));
const pause = (ms = 400) => new Promise(resolve => setTimeout(resolve, ms));
await mkdir('artifacts/mobile-implementation', { recursive: true });

async function go(moment: number) {
  await page.evaluate(value => {
    const root = document.querySelector<HTMLElement>('.mobile-intro')!;
    const stage = document.querySelector<HTMLElement>('.mobile-stage')!;
    scrollTo(0, scrollY + root.getBoundingClientRect().top + (root.offsetHeight - stage.offsetHeight) * value / 10.15);
  }, moment);
  await pause(700);
}
async function swipe(target: Page, x: number, y: number, dx: number, dy: number) {
  const client = await target.createCDPSession();
  await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] });
  for (let step = 1; step <= 10; step++) {
    await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x + dx * step / 10, y: y + dy * step / 10 }] });
    await pause(20);
  }
  await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await client.detach();
  await pause(600);
}
try {
  for (const [width, height] of [[320, 568], [375, 667], [390, 844], [430, 932], [768, 1024], [844, 390]]) {
    await page.setViewport({ width, height, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
    await page.goto(origin, { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);
    await go(mobileScore.gallery);
    await page.waitForSelector('.mobile-stage[data-mobile-ready="true"]', { timeout: 15000 });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `Overflow at ${width} × ${height}`);
    assert.equal(await page.$eval('.mobile-stage', n => n.getAttribute('data-mobile-scene')), 'gallery');
    await page.screenshot({ path: `artifacts/mobile-implementation/verified-${width}.png` });
    console.log(`Mobile ${width} × ${height}: WebGL and shared scroll scene active, no horizontal overflow.`);
  }
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
  await page.goto(origin, { waitUntil: 'networkidle0' });
  for (let index = 0; index < 6; index++) {
    await go(mobileScore.gallery + index / 5 * (mobileScore.galleryEnd - mobileScore.gallery));
    await page.waitForFunction(i => document.querySelector('.mobile-stage')?.getAttribute('data-mobile-index') === String(i), {}, index);
    assert.equal(await page.$eval('.mobile-point-read', n => n.getAttribute('href')), `/standpunten?p=${String(index + 1).padStart(2, '0')}`);
  }
  await go(mobileScore.galleryEnd);
  const lastRest = await page.$eval('.mobile-canvas', n => ({ top: n.getBoundingClientRect().top, width: n.getBoundingClientRect().width }));
  await go(mobileScore.galleryEnd + .5);
  const lastExit = await page.$eval('.mobile-canvas', n => ({ top: n.getBoundingClientRect().top, width: n.getBoundingClientRect().width }));
  assert.ok(lastExit.top < lastRest.top - 100 && lastExit.width > lastRest.width * 1.25, 'Last photograph must rise AND grow through the news handoff.');
  await page.screenshot({ path: 'artifacts/mobile-implementation/verified-last-photo-handoff.png' });
  await go(mobileScore.galleryEnd);
  const lastReverse = await page.$eval('.mobile-canvas', n => n.getBoundingClientRect().width);
  assert.ok(Math.abs(lastReverse - lastRest.width) < 2, 'Reverse scrolling must restore the final photograph.');
  await go(mobileScore.gallery + .3);
  const beforeTouch = await page.evaluate(() => scrollY);
  await swipe(page, 190, 650, 0, -170);
  assert.ok(await page.evaluate(() => scrollY) > beforeTouch + 30, 'Vertical touch scroll must work across the 3D photograph.');
  await go(6.6);
  await page.tap('.mobile-gallery-controls > div button:first-child');
  await page.waitForFunction(() => document.querySelector('.mobile-stage')?.getAttribute('data-mobile-index') === '0');
  await go(1.4);
  await page.screenshot({ path: 'artifacts/mobile-implementation/verified-travelling-title.png' });
  await go(3.9);
  assert.ok(Number(await page.$eval('.mobile-biography', n => getComputedStyle(n).getPropertyValue('--bio-shift').replace('px', ''))) < -100, 'Native scroll must reveal the rest of the biography.');
  await page.goto(`${origin}/#home-standpunten`, { waitUntil: 'networkidle0' });
  await page.waitForFunction(() => document.querySelector('.mobile-stage')?.getAttribute('data-mobile-scene') === 'gallery');
  await go(mobileScore.release);
  await page.$eval('#home-news', n => n.scrollIntoView());
  const rail = '#home-news .overflow-x-auto';
  const box = await page.$eval(rail, n => ({ top: n.getBoundingClientRect().top, left: n.scrollLeft }));
  await swipe(page, 310, Math.min(700, box.top + 100), -235, 0);
  assert.ok(await page.$eval(rail, n => n.scrollLeft) > box.left + 50, 'News must swipe horizontally.');
  await page.$eval('.cinema-chapter-list', n => n.scrollIntoView({ block: 'center' }));
  await page.tap('.cinema-chapter-list button:nth-child(2)');
  assert.ok(await page.$eval('#cinema-heading', n => n.textContent?.includes('Gemeenteraad')));
  await page.$eval('.cinema-player-controls', n => n.scrollIntoView({ block: 'center' }));
  await page.tap('.cinema-player-controls button[aria-pressed]');
  assert.equal(await page.$eval('.cinema-player-controls button[aria-pressed]', n => n.getAttribute('aria-pressed')), 'true');
  const socialTop = await page.$eval('#home-social', n => n.getBoundingClientRect().top + scrollY);
  const positions: string[] = [];
  for (const offset of [-300, 250, 550]) {
    await page.evaluate(y => scrollTo(0, y), socialTop + offset);
    await pause();
    positions.push(await page.$eval('.social-photograph', n => (n as HTMLElement).style.transform));
    await page.screenshot({ path: `artifacts/mobile-implementation/verified-social-${offset}.png` });
  }
  assert.equal(new Set(positions).size, 3, 'The social photographs must fan out with scrolling.');
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await pause();
  assert.equal(await page.$('.mobile-stage'), null);
  assert.equal(await page.$('.social-finale--animated'), null);
  assert.ok(await page.$('.standpoints-static'));
  assert.deepEqual(errors, []);
  console.log('Pass: six matching policy links, reverse navigation, synthetic vertical touch and horizontal news swipe, biography, hash entry, video selection/audio, animated social finale and reduced motion.');
} finally {
  // Headless Chrome can linger while shutting down active media/GPU contexts.
  const cleanup = setTimeout(() => browser.process()?.kill('SIGKILL'), 5000);
  try { await browser.close(); } finally { clearTimeout(cleanup); }
}

