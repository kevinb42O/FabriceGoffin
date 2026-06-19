import https from 'https';

https.get('https://fabricegoffin.be/', (res) => {
  let data = '';
  res.on('data', (c) => data += c);
  res.on('end', () => {
    const imgRegex = /<img[^>]+src=\"([^\">]+)\"/g;
    let match;
    const urls = new Set();
    while ((match = imgRegex.exec(data)) !== null) {
      if(match[1].endsWith('.jpg') || match[1].endsWith('.png')) urls.add(match[1]);
    }
    console.log(Array.from(urls).join('\n'));
  });
});
