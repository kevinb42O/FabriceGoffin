import fs from 'fs';
const content = fs.readFileSync('src/data/articles.ts', 'utf8');
const start = content.indexOf('export const articles: Article[] = [') + 'export const articles: Article[] = ['.length;
const end = content.lastIndexOf('];');
const arrayStr = '[' + content.substring(start, end) + ']';
// The arrayStr is technically a JS array literal, but the keys don't have quotes? Wait, they do!
// Let's just evaluate it and write JSON.
const data = eval(arrayStr);
fs.writeFileSync('dump.json', JSON.stringify(data, null, 2));
