# Fabrice Goffin — Persoonlijke website

Statisch geprerenderde React-site voor Fabrice Goffin, Schepen van Dierenwelzijn, Digitalisering & Ontmoeting in Oostende.

## Stack

- **Vite 6** + **React 19** + **TypeScript 5.8**
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **Motion** (Framer Motion successor) voor animaties
- **react-router-dom 7** voor client-side routing
- **react-helmet-async** voor per-route metadata
- **Puppeteer** voor build-time prerendering naar statische HTML

## Vereisten

- Node.js ≥ 20
- npm

## Installeren & lokaal draaien

```bash
npm install
npm run dev          # http://localhost:3000
```

## Scripts

| Script | Wat het doet |
| --- | --- |
| `npm run dev` | Vite dev-server op poort 3000 |
| `npm run build` | Vite build → sitemap.xml + robots.txt → prerender alle routes naar statische HTML |
| `npm run preview` | Vite preview van de productiebuild |
| `npm run lint` | `tsc --noEmit` typecheck |
| `npm run clean` | Verwijdert `dist/` |

## Productie-build

`npm run build` produceert in `dist/`:

- gehashte JS/CSS-assets
- per route een `index.html` (`/`, `/over`, `/standpunten`, `/doelen`, `/nieuws`, `/nieuws/:slug`, `/contact`) zodat elke route direct serveerbaar is door statische hosts (Netlify, Vercel, Apache, Nginx)
- `sitemap.xml`
- `robots.txt`

Statische host moet bij een 404 fallback'en op `index.html` zodat client-side routing blijft werken voor onbekende paden.

## Projectstructuur

```
src/
  App.tsx                 Routes
  main.tsx                Entry (hydrate of render)
  index.css               Tailwind + globale styles
  components/             Herbruikbare UI
  pages/                  Eén bestand per route
  data/
    contact.ts            Single source of truth voor e-mail / telefoon / socials
    articles.ts           Nieuwsartikelen
    standpunten.ts        Standpunten
    instagram.ts          Social-wall tegels
public/
  favicon.svg
  images/                 Statische beelden (worden 1-op-1 gekopieerd)
  videos/                 Statische video's
generate-sitemap.ts       Build-step: sitemap + robots
prerender.ts              Build-step: Puppeteer prerendering
```

## Contactgegevens wijzigen

Alle publieke contactdata staan in [src/data/contact.ts](src/data/contact.ts). Eén plek aanpassen → footer, contactformulier en social-wall pikken het automatisch op.
