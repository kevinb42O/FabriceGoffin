import re
import json

new_titles = [
    "Nieuwe Publieke BBQ Geopend aan OC 't Kasteeltje",
    "Regenbooghuis aan Zee Viert Vijfjarig Bestaan",
    "Oostende als Slimme, Innovatieve Stad: Digitalisering voor de Toekomst",
    "Technologische Strijd tegen de Aziatische Hoornaar in Oostende",
    "Nieuwe Cricketkooi op het Sint-Catherinaplein: Sport en Sociale Cohesie",
    "Primeur in België: Humane Rattenbestrijding via Anticonceptie",
    "Sterkere Omheining voor de Bescherming van Onze Zeehonden",
    "Hartverwarmende Buurtbijeenkomst in Mariakerke",
    "Nieuw CASH-punt in de Zandvoordedorpstraat Versterkt de Lokale Handel",
    "Vlaams Verbod op Houden van Dieren na Mishandeling Een Feit",
    "Magische Avond: 700 Gasten en 110 Vrijwilligers Brengen Mensen Samen",
    "De VUB Komt naar Oostende: Wij Worden een Echte Universiteitsstad!",
    "Stop de Online Verkoop van Dieren: Asielen Zitten Vol",
    "Succesvolle Opruimactie in het Westerkwartier Versterkt het Buurtgevoel",
    "Visie op Technologie en Toekomst Gedeeld op Legal Future Congres",
    "OC De Schelpe Viert 40-Jarig Jubileum!",
    "Bouw Nieuw Centrum voor Dierenwelzijn in Volle Gang",
    "Feestelijke Heropening Gezinsplein in het Maria-Hendrikapark",
    "Nieuw Comfortabel Minibusje voor Minder Mobiele Wijkbewoners",
    "Acht Nieuwe Struikelstenen Onthuld ter Nagedachtenis aan Slachtoffers WOII",
    "Inspirerend Ontbijt met de KSA-leiders van Onze Stad",
    "In Gesprek met de Toekomst: Jong in 't Stadhuis",
    "Feestelijke Opening The Ostendian: Eerste Nieuwe Hotel in 25 Jaar",
    "Productief Overleg met GAIA: Strijden voor de Diervriendelijkste Stad",
    "Mijn Visie in De Krant van West-Vlaanderen: De Diervriendelijkste Stad"
]

import unicodedata
def slugify(value):
    value = unicodedata.normalize('NFKD', value).encode('ascii', 'ignore').decode('ascii')
    value = re.sub(r'[^\w\s-]', '', value.lower())
    return re.sub(r'[-\s]+', '-', value).strip('-_')

with open("dump.json", "r") as f:
    articles = json.load(f)

seen_slugs = set()

for i, art in enumerate(articles):
    if i < 25:
        art['titel'] = new_titles[i]
        
    # generate slug
    base_slug = slugify(art['titel'])
    slug = base_slug
    counter = 1
    while slug in seen_slugs:
        slug = f"{base_slug}-{counter}"
        counter += 1
    seen_slugs.add(slug)
    art['slug'] = slug

# Reconstruct articles.ts
ts_objects = []
for obj in articles:
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
    "featured": {'true' if obj.get('featured') else 'false'}
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
    
print("Titles updated professionally!")
