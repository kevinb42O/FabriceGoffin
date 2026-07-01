/**
 * Tijdlijn data — overgenomen uit "FG realisatie - bevoegdheden.xlsx".
 * 5 bevoegdheden, elk met realisaties (afgerond) en/of lopende projecten.
 * De bron bevat enkel titels (geen jaartallen, geen omschrijvingen).
 */

export type TimelineCategory =
  | 'Dierenwelzijn'
  | 'Buurten & Wijken'
  | 'Digitalisatie'
  | "OC's"
  | 'Overige projecten algemeen';

export type TimelineStatus = 'Realisatie' | 'Lopend';

export interface TimelineItem {
  id: string;
  category: TimelineCategory;
  status: TimelineStatus;
  title: string;
  image?: string;
}

export const tijdlijn: TimelineItem[] = [
  // ─────────────────── Dierenwelzijn — Lopende projecten ───────────────────
  { id: 'dw-l-1', category: 'Dierenwelzijn', status: 'Lopend', title: 'Gaia zoo van de toekomst in Oostende', image: "/realisaties/gaiazoovandetoekomst.jpg" },
  { id: 'dw-l-2', category: 'Dierenwelzijn', status: 'Lopend', title: 'Hondenfestival onder stad Oostende' , image: "/realisaties/Hondenfestival onder stad Oostende.webp" },
  { id: 'dw-l-3', category: 'Dierenwelzijn', status: 'Lopend', title: 'Aziatische Hoornaar - preventie + vallen in publieke ruimtes' , image: "/realisaties/Aziatische Hoornaar - preventie + vallen in publieke ruimtes.jpeg" },
  { id: 'dw-l-4', category: 'Dierenwelzijn', status: 'Lopend', title: 'Diervriendelijk horeca label' , image: "/realisaties/Diervriendelijk horeca label.jpeg" },
  { id: 'dw-l-5', category: 'Dierenwelzijn', status: 'Lopend', title: 'Aanleg van stads drink-fontijntjes voor honden op drukke plaatsen' , image: "/realisaties/Aanleg van stads drink-fontijntjes voor honden op drukke plaatsen.webp" },

  // ─────────────────── Dierenwelzijn — Realisaties ───────────────────
  { id: 'dw-r-1', category: 'Dierenwelzijn', status: 'Realisatie', title: 'Degelijke afsluiting voor de zeehonden' , image: "/realisaties/Degelijke afsluiting voor de zeehonden.webp" },
  { id: 'dw-r-2', category: 'Dierenwelzijn', status: 'Realisatie', title: 'Verbod op houden van dieren bij verwaarlozing of mishandeling' , image: "/realisaties/Verbod op houden van dieren bij verwaarlozing of mishandeling.jpeg" },
  { id: 'dw-r-3', category: 'Dierenwelzijn', status: 'Realisatie', title: "Lezingen in de OC's rond omgaan met honden / gevaar" , image: "/realisaties/Lezingen in de OC's rond omgaan met honden : gevaar.webp" },
  { id: 'dw-r-4', category: 'Dierenwelzijn', status: 'Realisatie', title: 'Effectief voeding voor zwerfkatten en budget' , image: "/realisaties/Effectief voeding voor zwerfkatten en budget .jpeg" },
  { id: 'dw-r-5', category: 'Dierenwelzijn', status: 'Realisatie', title: 'Samenwerking met de politie versterkt met structureel overleg' , image: "/realisaties/Samenwerking met de politie versterkt met structureel overleg .png" },
  { id: 'dw-r-6', category: 'Dierenwelzijn', status: 'Realisatie', title: 'Financiële steun aan VOC is verhoogd' , image: "/realisaties/Financiële steun aan VOC is verhoogd.jpg" },
  { id: 'dw-r-7', category: 'Dierenwelzijn', status: 'Realisatie', title: 'Geluidsarm vuurwerk' , image: "/realisaties/Geluidsarm vuurwerk.jpg" },
  { id: 'dw-r-8', category: 'Dierenwelzijn', status: 'Realisatie', title: 'Publieke oproep voor voorzichtigheid tijdens het rijden in de stad, voor de meeuwenjongeren' , image: "/realisaties/Publieke oproep voor voorzichtigheid tijdens het rijden in de stad, voor de meeuwenjongeren .jpg" },
  { id: 'dw-r-9', category: 'Dierenwelzijn', status: 'Realisatie', title: 'Van traditioneel dierenasiel naar Centrum voor dierenwelzijn' , image: "/realisaties/Van traditioneel dierenasiel naar Centrum voor dierenwelzijn.webp" },
  { id: 'dw-r-10', category: 'Dierenwelzijn', status: 'Realisatie', title: 'Bij huwelijken mogen dieren aanwezig zijn' , image: "/realisaties/Bij huwelijken mogen dieren aanwezig zijn.jpg" },
  { id: 'dw-r-11', category: 'Dierenwelzijn', status: 'Realisatie', title: 'Gesprekken met paardekoetsen - structureel overleg tijdens de warme dagen - Uitdoof' , image: "/realisaties/Gesprekken met paardekoetsen - structureel overleg tijdens de warme dagen - Uitdoof .jpg" },
  { id: 'dw-r-12', category: 'Dierenwelzijn', status: 'Realisatie', title: 'Effectief verbod op vuurwerk' , image: "/realisaties/Effectief verbod op vuurwerk.webp" },
  { id: 'dw-r-13', category: 'Dierenwelzijn', status: 'Realisatie', title: 'Nieuw hondenfestival sinds verleden jaar / Aan duin en Zee' , image: "/realisaties/Nieuw hondenfestival sinds verleden jaar : Aan duin en Zee.jpeg" },
  { id: 'dw-r-14', category: 'Dierenwelzijn', status: 'Realisatie', title: 'Structurele samenwerking met Gaia' , image: "/realisaties/Structurele samenwerking met Gaia.jpeg" },
  { id: 'dw-r-15', category: 'Dierenwelzijn', status: 'Realisatie', title: 'Effectief tweewekelijks een structureel overleg met het Centrum voor dierenwelzijn' , image: "/realisaties/Effectief tweewekelijks een structureel overleg met het Centrum voor dierenwelzijn.jpg" },
  { id: 'dw-r-16', category: 'Dierenwelzijn', status: 'Realisatie', title: 'Effectief driewekelijks een structureel overleg met het VOC' , image: "/realisaties/Effectief driewekelijks een structureel overleg met het VOC.jpeg" },
  { id: 'dw-r-17', category: 'Dierenwelzijn', status: 'Realisatie', title: 'Structureel overleg met het North Seal Team rond de zeehonden' , image: "/realisaties/Structureel overleg met het North Seal Team rond de zeehonden .jpg" },
  { id: 'dw-r-18', category: 'Dierenwelzijn', status: 'Realisatie', title: 'Bijkomende hondenlosloopweides (o.a. Zandvoorde)' , image: "/realisaties/Bijkomende hondenlosloopweides (o.a. Zandvoorde).png" },
  { id: 'dw-r-19', category: 'Dierenwelzijn', status: 'Realisatie', title: 'Bescherming voor de dieren binnen de kinderboerderij' , image: "/realisaties/Bescherming voor de dieren binnen de kinderboerderij.jpg" },
  { id: 'dw-r-20', category: 'Dierenwelzijn', status: 'Realisatie', title: 'Oproep om watervogels niet te voederen' , image: "/realisaties/Oproep om watervogels niet te voederen.avif" },
  { id: 'dw-r-21', category: 'Dierenwelzijn', status: 'Realisatie', title: 'Voorbereidingen om volledig over te stappen naar innovatieve en diervriendelijke aanpak om de rattenpopulatie onder controle te houden' , image: "/realisaties/Voorbereidingen om volledig over te stappen naar innovatieve en diervriendelijke aanpak om de rattenpopulatie onder controle te houden.avif" },

  // ─────────────────── Buurten & Wijken — Lopend ───────────────────
  { id: 'bw-l-1', category: 'Buurten & Wijken', status: 'Lopend', title: 'Wijkprikkels' , image: "/realisaties/Wijkprikkels .jpeg" },

  // ─────────────────── Buurten & Wijken — Realisaties ───────────────────
  { id: 'bw-r-1', category: 'Buurten & Wijken', status: 'Realisatie', title: 'Gratis Soepbedeling in de wijken / warmte bijbrengen', image: "/realisaties/Gratis Soepbedeling in de wijken: warmte bijbrengen.png" },
  { id: 'bw-r-2', category: 'Buurten & Wijken', status: 'Realisatie', title: 'Griefbieb (nieuwe wijk)' , image: "/realisaties/Griefbieb (nieuwe wijk).jpg" },
  { id: 'bw-r-3', category: 'Buurten & Wijken', status: 'Realisatie', title: 'Structurele ondersteuning voor de stripbeurs in OC de Blomme' , image: "/realisaties/Structurele ondersteuning voor de stripbeurs in OC de Blomme .jpg" },

  // ─────────────────── Digitalisatie — Realisaties ───────────────────
  { id: 'ict-r-1', category: 'Digitalisatie', status: 'Realisatie', title: "Lezingen rond A.I. in de OC's" , image: "/realisaties/Lezingen rond A.I. in de OC's .png" },
  { id: 'ict-r-2', category: 'Digitalisatie', status: 'Realisatie', title: 'Verderzetten van de Digibanken' , image: "/realisaties/Verderzetten van de Digibanken.jpg" },

  // ─────────────────── Digitalisatie — Lopend ───────────────────
  { id: 'ict-l-1', category: 'Digitalisatie', status: 'Lopend', title: 'Voorbereiding implementatie Digital Twin + omzet naar Digital Brain' , image: "/realisaties/Voorbereiding implementatie Digital Twin + omzet naar Digital Brain.webp" },
  { id: 'ict-l-2', category: 'Digitalisatie', status: 'Lopend', title: 'AI-veiligheidstoepassingen en Europese samenwerking inzake cybersecurity' , image: "/realisaties/AI-veiligheidstoepassingen en Europese samenwerking inzake cybersecurity.jpeg" },
  { id: 'ict-l-3', category: 'Digitalisatie', status: 'Lopend', title: 'Herzieninning / verbetering Eaglebee' , image: "/realisaties/Herzieninning : verbetering Eaglebee.png" },

  // ─────────────────── OC's — Lopend ───────────────────
  { id: 'oc-l-1', category: "OC's", status: 'Lopend', title: 'Evaluatie en aanpassing zaalreglement' , image: "/realisaties/Evaluatie en aanpassing zaalreglement.jpg" },
  { id: 'oc-l-2', category: "OC's", status: 'Lopend', title: "Evaluatie van welke stadsdiensten kunnen aangeboden worden in de OC's" , image: "/realisaties/Evaluatie van welke stadsdiensten kunnen aangeboden worden in de OC's .jpg" },
  { id: 'oc-l-3', category: "OC's", status: 'Lopend', title: 'Shop in shop' , image: "/realisaties/Shop in shop.jpg" },

  // ─────────────────── OC's — Realisaties ───────────────────
  { id: 'oc-r-1', category: "OC's", status: 'Realisatie', title: 'Opnieuw vast centrumleiders - vaste medewerkers' },
  { id: 'oc-r-2', category: "OC's", status: 'Realisatie', title: 'Petanqueveld in OC de Blomme' , image: "/realisaties/Petanqueveld in OC de Blomme.jpeg" },
  { id: 'oc-r-3', category: "OC's", status: 'Realisatie', title: "Nieuw Minibusje in OC 'tKasteeltje" , image: "/realisaties/Nieuw Minibusje in OC 'tKasteeltje.avif" },
  { id: 'oc-r-4', category: "OC's", status: 'Realisatie', title: "Nieuwe PC's in OC de Schelpe" , image: "/realisaties/Nieuwe PC's in OC de Schelpe.jpeg" },
  { id: 'oc-r-5', category: "OC's", status: 'Realisatie', title: 'Sing Along' , image: "/realisaties/Sing Along.avif" },

  // ─────────────────── Overige projecten algemeen — Lopend ───────────────────
  { id: 'ov-l-1', category: 'Overige projecten algemeen', status: 'Lopend', title: 'Bezoek van Prins & Princes van Monaco' , image: "/realisaties/Bezoek van Prins & Princes van Monaco.jpeg" },
  { id: 'ov-l-2', category: 'Overige projecten algemeen', status: 'Lopend', title: 'Opvolging van het Regenbooghuis' , image: "/realisaties/Opvolging van het Regenbooghuis.webp" },
];
