import os
import urllib.request
import json
import imghdr
from duckduckgo_search import DDGS

os.makedirs('public/images/social', exist_ok=True)

# Clean up old broken files
for f in os.listdir('public/images/social'):
    os.remove(os.path.join('public/images/social', f))

query = "Fabrice Goffin Oostende"
images = []

print(f"Searching images for: {query}")
with DDGS() as ddgs:
    results = list(ddgs.images(query, max_results=100))
    
    count = 1
    for res in results:
        if count > 20:
            break
            
        img_url = res.get('image')
        if not img_url:
            continue
            
        # Skip known problematic domains
        if 'facebook.com' in img_url or 'instagram.com' in img_url or 'fbsbx.com' in img_url:
            continue
            
        try:
            req = urllib.request.Request(
                img_url, 
                headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'}
            )
            
            # Temporary filepath
            temp_filepath = os.path.join('public/images/social', f"temp_social_{count}")
            
            with urllib.request.urlopen(req, timeout=5) as response, open(temp_filepath, 'wb') as out_file:
                data = response.read()
                out_file.write(data)
                
            # Verify it is an actual image
            img_type = imghdr.what(temp_filepath)
            if not img_type:
                os.remove(temp_filepath)
                print(f"Skipped {img_url} (Not an image)")
                continue
                
            # Rename to final filepath
            filename = f"social_{count}.{img_type}"
            filepath = os.path.join('public/images/social', filename)
            os.rename(temp_filepath, filepath)
                
            caption_title = res.get('title', "Fabrice Goffin in actie voor Oostende")
            # Clean caption if it contains weird characters
            caption = caption_title[:100] + "..." if len(caption_title) > 100 else caption_title
            
            images.append({
                "id": f"post_{count}",
                "image": f"/images/social/{filename}",
                "likes": 100 + (count * 47) % 500,
                "comments": 5 + (count * 13) % 50,
                "caption": caption,
                "span": "col-span-2 row-span-2" if count % 7 == 1 else ("col-span-1 row-span-2" if count % 4 == 0 else "col-span-1 row-span-1")
            })
            print(f"Successfully downloaded {filename}")
            count += 1
            
        except Exception as e:
            print(f"Failed to download {img_url}: {str(e)[:50]}")

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

print(f"Successfully generated src/data/instagram.ts with {len(images)} valid images.")
