# Speerpunten → Nieuws: een doorlopende ruimtelijke overdracht

Datum: 27 oktober 2026. Status: uitvoeringsplan; de UI is nog niet aangepast.

## Ontwerprichting

Het laatste speerpunt blijft in beeld terwijl het witte nieuwsvlak van onderuit de ruimte overneemt. De galerij trekt subtiel naar achteren; de nieuwskop en de eerste artikelen komen samen op dat nieuwe vlak binnen. De bezoeker gaat zo van beleidsvoornemens naar actualiteit in één beweging.

De overgang wordt volledig door native scroll gestuurd en werkt onmiddellijk in beide richtingen. Geen extra tussenhoofdstuk of nieuwe tekst nodig. De bestaande inhoud en de horizontale nieuwsbediening blijven het materiaal.

## Wat is onderzocht

- De actuele homepage, inclusief de aansluiting onder het zesde speerpunt, is lokaal visueel bekeken op 1280 × 720. Nu schuift de galerij als een volledig blok omhoog en volgt een scherp afgescheiden wit nieuwsblok. De kop en kaarten gebruiken eigen `whileInView`-animaties.
- `HomeIntroSequence.tsx` verbindt hero, biografie en speerpunten al op één sticky podium. `introSequence.ts` bepaalt de hoofdstukken; de galerij eindigt nu bij 6,1 viewport-eenheden, waarna de sticky scène loslaat.
- `HomeNieuwsPreview.tsx` staat als zelfstandig onderdeel na die scène in `Home.tsx`.
- Het eerdere plan voor secties 1–2–3 legt native scroll, een lineaire galerij zonder leesstops en behoud van de goedgekeurde mobiele presentatie vast. Dit plan sluit daarop aan en voegt uitsluitend de uitgang naar Nieuws toe.

## Concrete inspiratie uit Webaanzee

| Bron in `/Users/kevin/PROJECTS/webaanzee.be` | Bestaand gedrag | Vertaling naar Fabrice |
| --- | --- | --- |
| `components/PortfolioDepth.tsx` | Eén tijdlijn laat de projectgalerij overlappen met de entree van diensten; een masker opent van onder naar boven | Nieuws neemt de ruimte over terwijl het laatste speerpunt nog aanwezig is |
| `components/DepthShowcase.tsx` | `departure` schaalt de beeldcompositie van 1 naar 0,86 en verplaatst haar naar links en beneden | Een rustiger terugtrekking van circa 1 naar 0,94; Fabrice heeft al grote foto's en veel camerabeweging |
| `components/PortfolioDepth.module.css` | Sticky podium met geïsoleerde lagen en een overdrachtsvlak | Een vastblijvende galerij achter het opkomende nieuwsvlak, zonder zichtbare onderbreking |
| `components/MobileCinematicHome.tsx` | Afzonderlijke mobiele regie met eigen leesruimte en eenvoudiger laagovergangen | De goedgekeurde mobiele presentatie behouden; de grote desktopovergang niet naar kleine schermen kopiëren |

Deze referenties zijn in de lokale broncode onderzocht. De Webaanzee-overdracht zelf is voor dit plan niet als volledige bewegingssequentie visueel beoordeeld.

## De geplande beweging

De percentages hieronder beschrijven de overdracht ná het bereiken van speerpunt zes. Het zijn afstelwaarden voor het prototype.

1. **0–25% — het laatste speerpunt geeft ruimte.** De camera heeft haar bestaande lineaire traject voltooid. Galerijkop, toelichting en bediening verdwijnen rustig, met maximaal circa 12 px verplaatsing. De foto blijft duidelijk aanwezig. Het witte vlak komt al van onder binnen: er ontstaat geen stilstaand interval.
2. **10–75% — het nieuwsvlak neemt over.** De zichtbare galerijcompositie schaalt geleidelijk naar circa 0,94 en zakt maximaal 16–24 px. De randen vallen weg achter het opkomende witte vlak; de achtergrond blijft beeldvullend. Het nieuwsvlak heeft een rechte, verzorgde bovenrand met hoogstens een zeer zachte slagschaduw voor diepte. De bestaande scheidingsborder vervalt in deze geanimeerde variant.
3. **35–85% — Nieuws wordt leesbaar.** ‘Actueel’, ‘Laatste Nieuws’ en ‘Naar al het nieuws’ verschijnen als samenhangende kopcompositie. De eerste zichtbare kaarten volgen diezelfde beweging, met hoogstens een klein onderling verschil. Geen reeks van acht oplopende wachttijden. De huidige zijwaartse kopentree en losse schaalentrees worden hier vervangen door de gedeelde scrollregie.
4. **85–100% — de pagina leest verder.** Nieuws staat op zijn echte documentpositie. De galerij verdwijnt volledig achter het vlak en laat los. De bezoeker scrolt direct verder door Nieuws, video en socials. Er is geen laatste klik, snap of afspeeltijd nodig.

De foto van het zesde speerpunt blijft een eigen beeld. Zij wordt niet veranderd in de eerste nieuwsfoto: de inhoudelijke relatie zit in de overgang van visie naar actualiteit.

## Opbouw en scrollbudget

Gebruik voor desktop een overlap tussen de bestaande sticky scène en de echte nieuwssectie in de normale documentflow. Dit levert de laagwerking van Webaanzee op zonder een tweede, gekopieerde nieuwssectie.

- Voeg achter het bestaande galerijtraject één viewport overdrachtsruimte toe aan de sticky container.
- Trek de daaropvolgende nieuwssectie met precies die viewport terug over de container. Daardoor begint Nieuws op dezelfde documentpositie als nu; de totale pagina wordt niet langer.
- In de huidige desktopberekening duurt de galerij tot 6,1 viewport-eenheden. De sticky container groeit van 7,1 naar 8,1; Nieuws overlapt één viewport en begint daardoor nog steeds op 7,1. De overdracht loopt van 6,1 tot 7,1. Dit is een geometrisch uitgangspunt dat op de echte podiumhoogte moet worden afgestemd.
- Tijdens die laatste viewport blijft het podium achter Nieuws vaststaan. Het opkomende nieuwsvlak vormt zelf de afdekking van de oude scène. Zo komen normale verticale scroll en het maskerprincipe uit Webaanzee samen.
- Aan het einde hoeven geen DOM-elementen te worden verplaatst of van `fixed` naar normale flow te wisselen. Dezelfde nieuwssectie blijft doorscrollen.
- Stem de viewportmaat voor podium, overlap en scrollberekening op elkaar af. De huidige combinatie van CSS `svh` en JavaScript `innerHeight` mag bij resize of browserbalken geen kier veroorzaken.

De eerste afstelling gebruikt ongeveer één schermhoogte voor de volledige overdracht, binnen de bestaande scrollafstand tussen het laatste speerpunt en de nieuwskop. Het cameratraject door de zes speerpunten blijft ongewijzigd. De nieuwe fase wordt apart berekend, zodat het verlengen van de container de camera niet trager maakt.

## Technische uitvoering

1. **Eén bron voor voortgang.** Breid `src/lib/introSequence.ts` uit met expliciete grenzen voor het galerij-einde, de nieuwsoverdracht en het loslaten van het podium. Maak onderscheid tussen galerijafstand en volledige scèneafstand. Behoud de bestaande grenzen van opening, biografie en eerste speerpunt.
2. **Overlappende documentstructuur.** Verbind `HomeIntroSequence` en `HomeNieuwsPreview` in een kleine gezamenlijke regie/context in `src/pages/Home.tsx`. De bestaande introcontext blijft beschikbaar voor de componenten die haar gebruiken. Alleen desktop met geschikte hoogte en normale bewegingsvoorkeur krijgt de overlap.
3. **Afzonderlijke vertreklaag.** Voeg in `HomeStandpuntenPreview.tsx` een transformlaag toe voor canvas en posterterugval. Laat de achtergrond beeldvullend en stuur de apart geporteerde tekst/bediening met dezelfde vertrekvoortgang. Transformeer niet de hele `.intro-stage`: dat zou ook het ankerpunt, andere lagen en sticky-gedrag raken.
4. **Nieuws als één echte sectie.** Voeg een gerichte stijl voor de overlap en gedeelde entree toe aan `HomeNieuwsPreview.tsx`, bij voorkeur met een kleine eigen CSS-file. Behoud kaarten, routes en horizontale scroller. Scrollgebonden voortgang vervangt de losse `whileInView`-animaties uitsluitend waar de nieuwe overgang actief is.
5. **Navigatie en toegankelijkheid.** Laat `#home-news` op de echte sectie staan, met passende scrollmarge voor de navigatie. ‘Verder naar nieuws’ landt bij een leesbare nieuwskop. De zes galerijknoppen blijven hun eigen speerpunt bereiken; een sprong naar zes mag niet midden in de vertrekfase landen. Onzichtbare of afgedekte galerijlinks worden uit de focusvolgorde genomen; vanuit toetsenbordfocus moet Nieuws bereikbaar blijven zonder eerst de animatie af te spelen.
6. **Renderer begrenzen.** Houd WebGL actief zolang de galerij nog zichtbaar is. Pauzeer na volledige afdekking en hervat vóór zij bij terugscrollen weer zichtbaar wordt. Gebruik de bestaande engine; er komt geen tweede canvas of renderer bij. De posterterugval gebruikt dezelfde vertrekbeweging.
7. **Resize en terugkeer.** Bepaal de overdracht uit de actuele documentgeometrie en gedeelde scrollbron. Controleer direct openen op `#home-news`, terugkeer uit een artikel en wisselen van schermformaat. Een oude vertrekwaarde mag geen blijvend verkleinde foto of onzichtbare nieuwsinhoud achterlaten.

## Mobiel en verminderde beweging

De grote overlap is desktopgericht. Op mobiel blijft Nieuws in de bestaande normale documentflow en blijft de horizontale swipe beschikbaar. Eventuele afwerking beperkt zich tot achtergrond, aansluiting en een korte gezamenlijke entree; geen extra sticky scrollafstand.

Bij `prefers-reduced-motion`, een te laag venster of een niet-actieve introregie blijft alles direct leesbaar in normale flow. Geen ruimtelijke terugtrekking, overlap die inhoud verbergt of afhankelijke wachttijden. Zichtbaarheid en focusbaarheid worden vanuit dezelfde modus bepaald.

## Bouwvolgorde en beoordeling

1. Bouw eerst de overlap met een volledig zichtbare nieuwssectie. Controleer galerij-einde, loslaatpunt, gelijke paginalengte en omgekeerd scrollen.
2. Voeg de bescheiden beeldterugtrekking en gezamenlijke galerij-exit toe. Controleer de canvaslaag, posterterugval en geporteerde bediening samen.
3. Stem de nieuwskop en eerste zichtbare kaarten af op de opening van het witte vlak. Verwijder de concurrerende entree-animaties in deze modus.
4. Controleer navigatie, mobiele presentatie, verminderde beweging, resize en artikelterugkeer.
5. Voer `npm run lint`, `npm run build` en de bestaande `scripts/check-home-motion.ts`-controles uit. Breid de gerichte motioncontroles uit voor de afzonderlijke galerijgrens, overdracht en ankerberekening; behoud het bestaande afstandscriterium voor de oorspronkelijke intro en toets de nieuwe overlap apart.

Visuele beoordeling op 1280 × 720, 1440 × 900, een breed scherm en mobiel op circa 390 × 844. Ook een laag desktopvenster en 200% zoom meenemen. Beoordeel de overgang als beweging bij langzaam, snel en omgekeerd scrollen; losse screenshots bewijzen geen vloeiendheid.

Gereed wanneer er geen harde blokwissel, lege strook, dubbele nieuwsinhoud, vertraagde kaartentree of verspringing bij het loslaten zichtbaar is. De bestaande galerij blijft even snel, Nieuws begint op dezelfde documentpositie en alle inhoud blijft bereikbaar wanneer WebGL faalt.
