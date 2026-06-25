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
}

export const tijdlijn: TimelineItem[] = [
  // ─────────────────── Dierenwelzijn — Lopende projecten ───────────────────
  { id: 'dw-l-1', category: 'Dierenwelzijn', status: 'Lopend', title: 'Gaia zoo van de toekomst in Oostende' },
  { id: 'dw-l-2', category: 'Dierenwelzijn', status: 'Lopend', title: 'Hondenfestival onder stad Oostende' },
  { id: 'dw-l-3', category: 'Dierenwelzijn', status: 'Lopend', title: 'Aziatische Hoornaar - preventie + vallen in publieke ruimtes' },
  { id: 'dw-l-4', category: 'Dierenwelzijn', status: 'Lopend', title: 'Diervriendelijk horeca label' },
  { id: 'dw-l-5', category: 'Dierenwelzijn', status: 'Lopend', title: 'Aanleg van stads drink-fontijntjes voor honden op drukke plaatsen' },

  // ─────────────────── Dierenwelzijn — Realisaties ───────────────────
  { id: 'dw-r-1', category: 'Dierenwelzijn', status: 'Realisatie', title: 'Degelijke afsluiting voor de zeehonden' },
  { id: 'dw-r-2', category: 'Dierenwelzijn', status: 'Realisatie', title: 'Verbod op houden van dieren bij verwaarlozing of mishandeling' },
  { id: 'dw-r-3', category: 'Dierenwelzijn', status: 'Realisatie', title: "Lezingen in de OC's rond omgaan met honden / gevaar" },
  { id: 'dw-r-4', category: 'Dierenwelzijn', status: 'Realisatie', title: 'Effectief voeding voor zwerfkatten en budget' },
  { id: 'dw-r-5', category: 'Dierenwelzijn', status: 'Realisatie', title: 'Samenwerking met de politie versterkt met structureel overleg' },
  { id: 'dw-r-6', category: 'Dierenwelzijn', status: 'Realisatie', title: 'Financiële steun aan VOC is verhoogd' },
  { id: 'dw-r-7', category: 'Dierenwelzijn', status: 'Realisatie', title: 'Geluidsarm vuurwerk' },
  { id: 'dw-r-8', category: 'Dierenwelzijn', status: 'Realisatie', title: 'Publieke oproep voor voorzichtigheid tijdens het rijden in de stad, voor de meeuwenjongeren' },
  { id: 'dw-r-9', category: 'Dierenwelzijn', status: 'Realisatie', title: 'Van traditioneel dierenasiel naar Centrum voor dierenwelzijn' },
  { id: 'dw-r-10', category: 'Dierenwelzijn', status: 'Realisatie', title: 'Bij huwelijken mogen dieren aanwezig zijn' },
  { id: 'dw-r-11', category: 'Dierenwelzijn', status: 'Realisatie', title: 'Gesprekken met paardekoetsen - structureel overleg tijdens de warme dagen - Uitdoof' },
  { id: 'dw-r-12', category: 'Dierenwelzijn', status: 'Realisatie', title: 'Effectief verbod op vuurwerk' },
  { id: 'dw-r-13', category: 'Dierenwelzijn', status: 'Realisatie', title: 'Nieuw hondenfestival sinds verleden jaar / Aan duin en Zee' },
  { id: 'dw-r-14', category: 'Dierenwelzijn', status: 'Realisatie', title: 'Structurele samenwerking met Gaia' },
  { id: 'dw-r-15', category: 'Dierenwelzijn', status: 'Realisatie', title: 'Effectief tweewekelijks een structureel overleg met het Centrum voor dierenwelzijn' },
  { id: 'dw-r-16', category: 'Dierenwelzijn', status: 'Realisatie', title: 'Effectief driewekelijks een structureel overleg met het VOC' },
  { id: 'dw-r-17', category: 'Dierenwelzijn', status: 'Realisatie', title: 'Structureel overleg met het North Seal Team rond de zeehonden' },
  { id: 'dw-r-18', category: 'Dierenwelzijn', status: 'Realisatie', title: 'Bijkomende hondenlosloopweides (o.a. Zandvoorde)' },
  { id: 'dw-r-19', category: 'Dierenwelzijn', status: 'Realisatie', title: 'Bescherming voor de dieren binnen de kinderboerderij' },
  { id: 'dw-r-20', category: 'Dierenwelzijn', status: 'Realisatie', title: 'Oproep om watervogels niet te voederen' },
  { id: 'dw-r-21', category: 'Dierenwelzijn', status: 'Realisatie', title: 'Voorbereidingen om volledig over te stappen naar innovatieve en diervriendelijke aanpak om de rattenpopulatie onder controle te houden' },

  // ─────────────────── Buurten & Wijken — Lopend ───────────────────
  { id: 'bw-l-1', category: 'Buurten & Wijken', status: 'Lopend', title: 'Wijkprikkels' },

  // ─────────────────── Buurten & Wijken — Realisaties ───────────────────
  { id: 'bw-r-1', category: 'Buurten & Wijken', status: 'Realisatie', title: 'Gratis Soepbedeling in de wijken / warmte bijbrengen' },
  { id: 'bw-r-2', category: 'Buurten & Wijken', status: 'Realisatie', title: 'Griefbieb (nieuwe wijk)' },
  { id: 'bw-r-3', category: 'Buurten & Wijken', status: 'Realisatie', title: 'Structurele ondersteuning voor de stripbeurs in OC de Blomme' },

  // ─────────────────── Digitalisatie — Realisaties ───────────────────
  { id: 'ict-r-1', category: 'Digitalisatie', status: 'Realisatie', title: "Lezingen rond A.I. in de OC's" },
  { id: 'ict-r-2', category: 'Digitalisatie', status: 'Realisatie', title: 'Verderzetten van de Digibanken' },

  // ─────────────────── Digitalisatie — Lopend ───────────────────
  { id: 'ict-l-1', category: 'Digitalisatie', status: 'Lopend', title: 'Voorbereiding implementatie Digital Twin + omzet naar Digital Brain' },
  { id: 'ict-l-2', category: 'Digitalisatie', status: 'Lopend', title: 'AI-veiligheidstoepassingen en Europese samenwerking inzake cybersecurity' },
  { id: 'ict-l-3', category: 'Digitalisatie', status: 'Lopend', title: 'Herzieninning / verbetering Eaglebee' },

  // ─────────────────── OC's — Lopend ───────────────────
  { id: 'oc-l-1', category: "OC's", status: 'Lopend', title: 'Evaluatie en aanpassing zaalreglement' },
  { id: 'oc-l-2', category: "OC's", status: 'Lopend', title: "Evaluatie van welke stadsdiensten kunnen aangeboden worden in de OC's" },
  { id: 'oc-l-3', category: "OC's", status: 'Lopend', title: 'Shop in shop' },

  // ─────────────────── OC's — Realisaties ───────────────────
  { id: 'oc-r-1', category: "OC's", status: 'Realisatie', title: 'Opnieuw vast centrumleiders - vaste medewerkers' },
  { id: 'oc-r-2', category: "OC's", status: 'Realisatie', title: 'Petanqueveld in OC de Blomme' },
  { id: 'oc-r-3', category: "OC's", status: 'Realisatie', title: "Nieuw Minibusje in OC 'tKasteeltje" },
  { id: 'oc-r-4', category: "OC's", status: 'Realisatie', title: "Nieuwe PC's in OC de Schelpe" },
  { id: 'oc-r-5', category: "OC's", status: 'Realisatie', title: 'Sing Along' },

  // ─────────────────── Overige projecten algemeen — Lopend ───────────────────
  { id: 'ov-l-1', category: 'Overige projecten algemeen', status: 'Lopend', title: 'Bezoek van Prins & Princes van Monaco' },
  { id: 'ov-l-2', category: 'Overige projecten algemeen', status: 'Lopend', title: 'Opvolging van het Regenbooghuis' },
];
