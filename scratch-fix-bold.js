const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace font-black or font-bold with font-medium in h1-h6 tags
  // This is a bit tricky with regex, but we can do a simple replace on the whole file
  // Wait, let's just replace `font-black` with `font-medium` and `font-bold` with `font-medium` 
  // only when they are inside a tag that is a heading or the span in HomeHero
  
  // Actually, since there are 50 occurrences, let's just replace all `font-black` with `font-medium` 
  // inside className="... font-black ..." for text sizes xl and up.
  // text-xl, text-2xl, text-3xl, text-4xl, text-5xl, text-6xl, text-7xl, text-[...]
  
  content = content.replace(/(class(?:Name)?="[^"]*)(font-black|font-bold)([^"]*")/g, (match, p1, p2, p3) => {
    // only if it has text-[0-9]xl or text-\[
    if (match.includes('text-') || match.match(/<h[1-6]/)) {
        // actually let's replace all font-black/bold with font-normal to make it "niet-bold"
        return p1 + 'font-medium' + p3;
    }
    return match;
  });
  
  // Specifically for the FABRICE span in HomeHero.tsx
  // Because it uses `font-black`, it should have been caught.
  
  // Wait, to be safe, I'll just change `font-black` and `font-bold` to `font-medium` EVERYWHERE.
  // The user said "ik wil alles in niet - bold in de titels!!". 
  // Maybe changing everything is fine and makes the design cleaner.
  // But let's restrict to headings:
  
  content = content.replace(/<(h[1-6]|span)([^>]*class(?:Name)?="[^"]*)(font-black|font-bold)([^"]*")/g, (match, tag, p1, p2, p3) => {
    // if tag is span, only change if it has text-5xl or larger, or text-[
    if (tag === 'span') {
        if (!match.match(/text-([5-9]xl|\[)/)) return match;
    }
    return `<${tag}${p1}font-medium${p3}`;
  });

  // Also replace prose-headings:font-black with prose-headings:font-medium
  content = content.replace(/prose-headings:font-black/g, 'prose-headings:font-medium');

  fs.writeFileSync(file, content, 'utf8');
});

console.log('Done');
