import os
import urllib.request
import json
from duckduckgo_search import DDGS

os.makedirs('public/images/social', exist_ok=True)

query = "Fabrice Goffin Oostende"
images = []

print(f"Searching images for: {query}")
with DDGS() as ddgs:
    results = list(ddgs.images(query, max_results=30))
    
    count = 1
    for res in results:
        if count > 20:
            break
            
        img_url = res.get('image')
        if not img_url:
            continue
            
        try:
            # We add a fake user agent to avoid 403s
            req = urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0'})
            ext = img_url.split('.')[-1].split('?')[0]
            if ext.lower() not in ['jpg', 'jpeg', 'png']:
                ext = 'jpg' # default fallback
                
            filename = f"social_{count}.{ext}"
            filepath = os.path.join('public/images/social', filename)
            
            with urllib.request.urlopen(req, timeout=5) as response, open(filepath, 'wb') as out_file:
                data = response.read()
                out_file.write(data)
                
            images.append({
                "id": f"post_{count}",
                "image": f"/images/social/{filename}",
                "likes": 100 + (count * 47) % 500,
                "comments": 5 + (count * 13) % 50,
                "caption": res.get('title', f"Actief in Oostende voor onze burgers! #vooruitplus #oostende"),
                "span": "col-span-2 row-span-2" if count % 7 == 1 else ("col-span-1 row-span-2" if count % 4 == 0 else "col-span-1 row-span-1")
            })
            print(f"Downloaded {filename}")
            count += 1
        except Exception as e:
            print(f"Failed to download {img_url}: {e}")

# Generate TypeScript file
ts_content = f"""export interface InstagramPost {{
  id: string;
  image: string;
  likes: number;
  comments: number;
  caption: string;
  span: string;
}}

export const instagramPosts: InstagramPost[] = {json.dumps(images, indent=2)};
"""

with open('src/data/instagram.ts', 'w') as f:
    f.write(ts_content)

print("Successfully generated src/data/instagram.ts")
