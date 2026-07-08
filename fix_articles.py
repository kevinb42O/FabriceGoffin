import re
import json
from datetime import datetime

with open("src/data/articles.ts", "r") as f:
    content = f.read()

start_idx = content.find("export const articles: Article[] = [") + len("export const articles: Article[] = [")
end_idx = content.rfind("];")
array_content = content[start_idx:end_idx]

# Split by "  }," or "  }"
objects_raw = re.split(r'  \},?\n', array_content)

objects = []
for obj in objects_raw:
    obj = obj.strip()
    if not obj: continue
    if not obj.startswith("{"):
        obj = "{" + obj
    if not obj.endswith("}"):
        obj = obj + "\n  }"
    
    # We need to parse these manually since they are not valid JSON (no quotes around keys in TS? Actually they do have quotes here).
    # Wait, in the TS file, the keys are enclosed in double quotes. Let's try to json.loads it.
    try:
        # trailing commas can break json.loads
        obj_clean = re.sub(r',\s*\}', '}', obj)
        data = json.loads(obj_clean)
        objects.append(data)
    except Exception as e:
        # Fallback to regex extraction
        slug = re.search(r'"slug": "(.*?)"', obj).group(1)
        titel = re.search(r'"titel": "(.*?)"', obj).group(1)
        inhoud = re.search(r'"inhoud": "(.*?)"', obj).group(1)
        image = re.search(r'"image": "(.*?)"', obj).group(1)
        datum = re.search(r'"datum": "(.*?)"', obj).group(1)
        featured_match = re.search(r'"featured": (true|false)', obj)
        featured = True if featured_match and featured_match.group(1) == "true" else False
        
        fullText = []
        ft_match = re.search(r'"fullText": \[\s*(.*?)\s*\]', obj, re.DOTALL)
        if ft_match:
            ft_raw = ft_match.group(1)
            # Find all strings in quotes
            fullText = re.findall(r'"(.*?)"(?:,|$)', ft_raw)
        
        objects.append({
            "slug": slug,
            "titel": titel,
            "inhoud": inhoud,
            "fullText": fullText,
            "image": image,
            "datum": datum,
            "featured": featured
        })

# Custom date parsing for sorting
months_nl = {
    "januari": 1, "februari": 2, "maart": 3, "april": 4, "mei": 5, "juni": 6,
    "juli": 7, "augustus": 8, "september": 9, "oktober": 10, "november": 11, "december": 12,
    "jan": 1, "feb": 2, "mrt": 3, "apr": 4, "jun": 6, "jul": 7, "aug": 8, "sep": 9, "okt": 10, "nov": 11, "dec": 12
}

def parse_date(date_str):
    date_str = date_str.lower()
    
    if "zomer 2026" in date_str:
        return datetime(2026, 7, 15)
        
    for m_name, m_num in months_nl.items():
        if m_name in date_str:
            # find year
            year_match = re.search(r'\d{4}', date_str)
            year = int(year_match.group()) if year_match else 2025
            
            # find day
            day_match = re.search(r'\b\d{1,2}\b', date_str.replace(str(year), ''))
            day = int(day_match.group()) if day_match else 1
            
            return datetime(year, m_num, day)
            
    return datetime(2000, 1, 1)

objects.sort(key=lambda x: parse_date(x['datum']), reverse=True)

# Generate unique slugs and fix titles
seen_slugs = set()
import unicodedata
def slugify(value):
    value = unicodedata.normalize('NFKD', value).encode('ascii', 'ignore').decode('ascii')
    value = re.sub(r'[^\w\s-]', '', value.lower())
    return re.sub(r'[-\s]+', '-', value).strip('-_')

for obj in objects:
    # Full titles without ...
    if obj["titel"].endswith("...") and obj["fullText"]:
        obj["titel"] = obj["fullText"][0]
        
    # Unique slug
    base_slug = slugify(obj["titel"])
    slug = base_slug
    counter = 1
    while slug in seen_slugs:
        slug = f"{base_slug}-{counter}"
        counter += 1
    seen_slugs.add(slug)
    obj["slug"] = slug
    
    # We remove featured flag entirely or set it to false for all except maybe the first one?
    # User said "fuck die vurige maandagen lol (moet blijven maar niet bovenaan!)"
    # The first item will naturally be the featured one in the code `articles[0]` if none are featured.
    obj["featured"] = False

# Reconstruct the file
ts_objects = []
for obj in objects:
    fullText_str = ",\n      ".join([json.dumps(t) for t in obj["fullText"]])
    ts_obj = f"""  {{
    "slug": "{obj['slug']}",
    "titel": {json.dumps(obj['titel'])},
    "inhoud": {json.dumps(obj['inhoud'])},
    "fullText": [
      {fullText_str}
    ],
    "image": "{obj['image']}",
    "datum": "{obj['datum']}",
    "featured": false
  }}"""
    ts_objects.append(ts_obj)

final_content = """export interface Article {
  slug: string;
  titel: string;
  inhoud: string;
  fullText: string[];
  image: string;
  datum: string;
  featured: boolean;
}

export const articles: Article[] = [
""" + ",\n".join(ts_objects) + "\n];\n"

with open("src/data/articles.ts", "w") as f:
    f.write(final_content)

print("Done sorting and fixing!")
