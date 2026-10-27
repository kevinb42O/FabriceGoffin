# Homepage — high-end scroll en animatie

Datum: 27 oktober 2026. Status: hero, overdracht naar de biografie en de 3D-presentatie van de speerpunten uitgevoerd; de overige homepagehoofdstukken blijven gepland.

De eerste uitvoering gebruikt Motion en native scroll, met een uitklappend portretkader, een overgang naar de strandfoto en een gedeelde eindcompositie met de biografie. De hero heeft op mobiel en bij verminderde beweging een eigen versie in normale documentflow. Op verzoek van de gebruiker is voor de speerpunten vervolgens de daadwerkelijke 3D-projectgalerij van Webaanzee overgenomen, inclusief camera, diepte, pointerparallax en atmosferische achtergrond. Deze vervangt het eerder voorgestelde horizontale kaartspoor. Kleinere schermen en verminderde beweging hebben een volledige redactionele lijst als terugval. De tabletbreedte van de navigatie is aangepast om de opening vrij te houden van overlappende links.

## Opdracht en vaste grenzen

De bestaande opbouw behouden en de homepage veel sterker laten aanvoelen door scrollregie, beeldtransities en animatie. Webaanzee is de kwaliteitsreferentie. De volgorde blijft: hero → biografie → speerpunten → nieuws → video → socials → footer. Fabrice behoudt zijn rood/wit/zwarte identiteit, bestaande inhoud, fotografie, routes en contactacties.

Bezoekers moeten snel begrijpen wie Fabrice is, waarvoor hij zich inzet en hoe ze hem bereiken. De homepage is een publieke kennismaking met een schepen; de filmische presentatie moet toegankelijkheid, leesbaarheid en bereikbaarheid ondersteunen.

## Onderzochte basis

- Fabrice: lokale homepage visueel bekeken op desktop via Vite, plus broncode van de homepage, desktop- en mobiele varianten, navbar, animatiehulpen en globale CSS.
- Webaanzee: lokale desktopopening en opeenvolgende scrollmomenten bekeken; de implementatie van `PortfolioDepth`, `CoastalPortal`, `useHomeScroll` en `homeChoreography` onderzocht, plus de mobiele choreografie.
- De mobiele aanbevelingen zijn op code-inspectie gebaseerd. Visuele mobiele verificatie hoort bij de uitvoering.

### Waarom het verschil nu groot voelt

| Onderdeel | Fabrice vandaag | Wat Webaanzee sterker maakt | Vertaling naar Fabrice |
| --- | --- | --- | --- |
| Opening | Grote titel naast een portret; losse entree-animaties | Een beeldwereld waar je tijdens het scrollen doorheen beweegt | Het portretkader opent naar een groter beeld en draagt de overgang naar het persoonlijke verhaal |
| Regie | Elke component heeft eigen animaties en scrollbereiken | Eén gedeelde partituur met entree, leesmomenten en overdracht | Gedeelde timingafspraken en benoemde scènes voor de homepage |
| Diepte | Watermerk, lichte parallax, schaduwen | Voorgrond, achtergrond, maskers en schaalverandering werken samen | Typografie, kaart en fotografie krijgen een bewust onderling tempo |
| Speerpunten | Sticky horizontale rij met gelijk behandelde kaarten | Actieve inhoud krijgt een duidelijke hoofdrol | De horizontale rij behouden, met een actieve kaart en een geregisseerde binnenkomst en exit |
| Sectieovergangen | Witte en lichtgrijze blokken met scheidingslijnen | De volgende compositie ontstaat uit de vorige | Overlap en beeld-/kleurcontinuïteit tussen de belangrijkste scènes |
| Ritme | Veel vergelijkbare tekstentrees en kaartbewegingen | Afwisseling tussen spectaculaire passages en leesrust | Drie grote momenten, met rustigere nieuws- en socialsecties |

Webaanzee gebruikt onder meer Motion, GSAP/ScrollTrigger en Lenis. De over te nemen kwaliteit zit in de samenhang van de scènes, de leesvensters en de precieze overdracht. De portalafbeelding en kustvormgeving zijn specifiek voor Webaanzee en worden niet gekopieerd.

## Visuele en bewegingsrichting

**Fabrice in Oostende: van persoonlijke kennismaking naar concrete inzet.** De bestaande secties worden hoofdstukken van dezelfde pagina. De opening blijft herkenbaar, maar krijgt een uitgesproken overgang. De speerpunten worden het centrale interactieve hoofdstuk. De video vormt een tweede visueel hoogtepunt lager op de pagina.

Typografie, kaart van Oostende en bestaande foto's zijn het materiaal. Rood markeert actieve inhoud en belangrijke acties. Minder gestapelde schaduwen, decoratieve gloei en willekeurige afrondingen; de precisie van uitsnedes, schaal, witruimte en beweging moet de kwaliteit dragen. Dit zijn lokale verfijningen binnen de bestaande identiteit.

## Plan per sectie

### 1. Hero → biografie: het belangrijkste nieuwe moment

Bestanden: `HomeHero.tsx`, `HomeHeroMobile.tsx`, `HomeBio.tsx` en een gedeelde openingswrapper.

- De eerste compositie behoudt links de titel en acties, rechts het portret. De volledige naam moet ook in de toegankelijke H1 staan; momenteel bevat de H1 alleen ‘IK BEN’ en staat ‘FABRICE’ ernaast met `aria-hidden`.
- Eén korte, gecoördineerde aankomst voor titel en beeld. Ondersteunende inhoud komt snel beschikbaar; de bezoeker wacht niet op meerdere opeenvolgende intro's.
- Op desktop krijgt de opening een sticky passage. Terwijl de bezoeker verder scrolt, groeit het portretkader gecontroleerd naar een bredere uitsnede. Het gezicht blijft beschermd door vaste uitsnederegels en beperkte schaalverandering.
- De titel beweegt over een kortere afstand uit het beeld; de kaart van Oostende beweegt trager op de achtergrond. De huidige eindeloze kaartdrift maakt plaats voor scrollgestuurde beweging.
- De passage eindigt met een gemaskeerde overgang naar de foto van Fabrice met zijn hond. Het zijn verschillende foto's: een zichtbare beeldwissel met een gecontroleerde crossfade, zonder te suggereren dat hetzelfde beeld transformeert.
- Het hondenportret landt in de bestaande linker beeldkolom van de biografie. Rechts verschijnt de bestaande titel. Daardoor voelt de biografie als een voortzetting van de opening.

Eerste afstelvoorstel voor de extra desktopscrollafstand: 0,9–1,3 schermhoogtes. Binnen die passage circa 20% rust in de startcompositie, 50% beeldexpansie en 30% overdracht. Dit zijn prototypewaarden; uitsnede en leesbaarheid bepalen de uiteindelijke afstand.

### 2. Biografie: beeld vasthouden, tekst ruimte geven

- Het portret blijft kort sticky terwijl de bestaande tekst rustig langs de rechterzijde leest.
- Titel en quote krijgen elk één duidelijke entree op het moment dat ze werkelijk zichtbaar worden. De huidige `StaggerText` start bij mount; in secties lager op de pagina kan de animatie daardoor al voorbij zijn voordat de bezoeker aankomt.
- De quote krijgt meer typografische aanwezigheid en minder kaartdecoratie. Een rood accent kan kort met de scroll mee onthullen.
- Geen woord-voor-woord-opacity over de volledige lopende tekst: de inhoud blijft direct leesbaar.
- De beeldcompositie krijgt een korte exit die ruimte maakt voor de speerpunten. Geen extra lang gepind teksthoofdstuk.

### 3. Speerpunten: dezelfde 3D-presentatie als de projecten van Webaanzee

Bijgestelde opdracht van de gebruiker op 27 oktober: de speerpunten moeten worden getoond zoals de projecten op Webaanzee. De horizontale kaartenrij is daarom vervangen.

- De bestaande `PortfolioEngine` uit Webaanzee is met behoud van de MIT-licentie overgenomen. Zes echte standpuntbeelden reizen afwisselend links en rechts door dezelfde 3D-camera, met de oorspronkelijke dieptewerking, beweging en trail.
- De toelichting wisselt mee naar de tegenoverliggende kolom. Titels en tekst zijn groter dan de kleine metadata van Webaanzee, zodat het politieke programma leesbaar blijft.
- Elke prioriteit heeft een eigen rustige achtergrondwereld; de vuurwerkscène gebruikt een donkere achtergrond met lichte tekst.
- Native verticale scroll stuurt de camerafase. De camera beweegt continu en lineair met iedere scrollstap, zonder leespauses of afremmen per item. Dit volgt de bijgestelde voorkeur van de gebruiker. De pijlen en zes hoofdstukknoppen landen op de exacte camerafase van het gekozen beeld.
- De voorvertoning en de tekst linken naar het passende standpunt via de bestaande `?p=`-route. Een zichtbare link slaat de presentatie over en gaat naar het nieuws.
- De engine wordt pas nabij de sectie geladen en pauzeert buiten beeld en in een verborgen tab. De resolutie is begrensd. Laad- en WebGL-fouten houden een bedienbare afbeelding en dezelfde navigatie over.
- Op voldoende hoge mobiele schermen blijft de 3D-galerij beschikbaar, met de foto bovenaan en de toelichting eronder. De volledige canvasachtergrond loopt door; de foto wordt per aspectverhouding passend gemaakt.
- Bij verminderde beweging en lage viewports verschijnt een gewone lijst met alle zes foto's, teksten en links, zonder extra sticky scrollafstand.
- Pure timingchecks toetsen grenzen, ononderbroken beweging met constante snelheid, monotonie en de overeenkomst tussen hoofdstukknoppen en camerafase.

### 4. Nieuws: redactionele rust en verfijnde interactie

Bestand: `HomeNieuwsPreview.tsx`.

- De nieuwssectie en artikelvolgorde blijven behouden. Geen tweede lange verticale-naar-horizontale capture onmiddellijk na de speerpunten.
- Kop, datum en beelden krijgen een samenhangende entree, met hoogstens een kleine onderlinge vertraging.
- Afbeeldingen onthullen via hun kader; de tekst blijft stabiel. Hover koppelt een beperkte beeldzoom aan de artikelpijl en linkaccenten.
- De bestaande horizontale bediening blijft beschikbaar met pijlen en touch. Begin/eindstatus en focus moeten duidelijk zijn.
- De overgang richting video bouwt visuele diepte op door het videokader te openen, zonder nieuwsinhoud weg te schuiven tijdens het lezen.

### 5. Video: een echt filmisch hoogtepunt

Bestand: `VideoShowcase.tsx`.

- Het bestaande videoblok blijft na het nieuws. Het kader groeit tijdens een korte sticky passage van een ingekaderde compositie naar een groter filmvlak.
- De achtergrond wordt geleidelijk donkerder. Titel en toelichting landen naast of op een gereserveerde zone bij het beeld, met gegarandeerd contrast.
- Laat het videobeeld de sfeer dragen; beperk de huidige grote blurvlakken, gloed en gestapelde glasbediening.
- Geef de video daarna een stabiele kijkstand. Scroll stuurt de compositie; de videoweergave houdt eigen play/pause en geluidsbediening.
- Geen scrollscrubbing van de MP4 als standaard: dat vraagt afzonderlijke mediavoorbereiding en laadstrategie.
- Pauzeren buiten beeld, geen automatische audio, en altijd een bruikbare poster plus foutstatus.
- Herstelpunt vóór visuele afwerking: `/videos/zoo_compressed.mp4` ontbreekt in de huidige werkboom terwijl de eerste slide er nog naar verwijst. De browser meldt onbespeelbare media. De verwijdering niet stilzwijgend terugdraaien; een beschikbare vervanger aansluiten of de poster met duidelijke niet-afspeelbare toestand gebruiken.

Startwaarde voor de extra scrollpassage: 0,5–0,8 schermhoogtes. Daarna normaal verder scrollen; de bezoeker hoeft een video niet uit te kijken.

### 6. Socials → footer: een verzorgde landing

Bestanden: `SocialWall.tsx`, de socialwrapper in `Home.tsx` en waar nodig de homepage-aansluiting op `Footer.tsx`.

- De bestaande fotogrid behouden. Een beperkte entree per zichtbare rij en subtiele diepte in de uitsnedes geven het geheel meer leven.
- Geen continu zwevende foto's of lange scrollcapture aan het einde van de pagina.
- ‘Toon meer’ behoudt de leespositie en krijgt een vloeiende uitklapbeweging.
- Het kaartmotief van Oostende verbindt de laatste sectie met de footer. De contactgegevens blijven onmiddellijk bruikbaar.
- Een eventuele overlappende footer-reveal eerst toetsen aan de huidige footerhoogte en toetsenbordbediening; normale documentflow is de terugval.

## Mobiel: evenveel aandacht, eigen choreografie

- De bestaande mobiele opbouw en aparte portret-/tekstzones blijven. Tekst komt niet over het gezicht te liggen.
- De hero krijgt een kleinere beeldonthulling en een compacte overdracht naar de biografie. Geen lange desktopzoom op een smal scherm.
- Speerpunten gebruiken op voldoende hoge telefoons dezelfde 3D-camera met foto en toelichting onder elkaar. Op lage schermen blijft de volledige inhoud in normale documentflow beschikbaar.
- Video krijgt een korte kaderexpansie als alles past; bij een lage viewport blijft het blok in normale flow.
- Animatie wordt bepaald door beschikbare ruimte, tekstgrootte, invoerapparaat en bewegingsvoorkeur. Een breakpoint alleen is onvoldoende.
- Verminderde beweging krijgt een uitgewerkte statische versie zonder parallax, grote zoom of lege sticky scrollafstand. Dezelfde inhoud en acties blijven bereikbaar.

## Technische aanpak

1. Start met de bestaande Motion-stack en CSS sticky. Leg hoofdstukken, voortgang, leesvensters en overdracht in een gedeelde module vast, bijvoorbeeld `src/lib/homeMotion.ts`. Vermijd verspreide absolute bereiken zoals de huidige hero `[0, 1000]`.
2. Gebruik sectiegebonden voortgang voor de afzonderlijke captures. Alleen de opening en biografie delen een wrapper voor hun directe overdracht. De hele homepage hoeft geen enkel groot gestapeld toneel te worden.
3. Browser-scroll blijft de bron van waarheid. Geen onderscheppen van wheel-events of vergrendelen van touch. Lenis alleen later overwegen als een prototype een concrete verbetering aantoont; GSAP is geen voorwaarde voor de beschreven effecten.
4. Eén verantwoordelijke per geanimeerde eigenschap. Voorkom dat CSS-hover, entree en scroll tegelijk dezelfde transform op hetzelfde element schrijven; gebruik aparte wrappers waar nodig.
5. Meet na fonts en beeldlayout, verwerk resize, en behoud de plek bij terugnavigeren en wisselen van schermformaat. Lange inhoud schakelt pinning uit wanneer de compositie niet past.
6. Controleer `PageTransition` en alle voorouders op transform, overflow en stacking contexts voordat sticky en overlap worden ingevoerd. Geen permanente paginatransform die later vaste elementen verstoort.
7. De bestaande `MotionConfig` en CSS voor reduced motion blijven nuttig, maar de scrollgestuurde scènes krijgen ook expliciete alternatieven en aangepaste hoogtes.
8. Gebruik transform en opacity als basis; maskers alleen op begrensde beeldzones. Voor de speerpunten is op expliciet verzoek de bestaande WebGL-laag van Webaanzee toegevoegd; deze wordt afzonderlijk geladen en heeft een veilige terugval. Video's pas laden nabij de viewport; offscreen loops stoppen.
9. Visueel verborgen lagen mogen geen onzichtbare focusdoelen bevatten. Bij overlappende scènes focus en `inert` bewust beheren. De bestaande routes, links en documentvolgorde blijven de basis.

## Uitvoeringsvolgorde

| Fase | Concreet resultaat | Gereed wanneer |
| --- | --- | --- |
| 1. Basis en opening | Gedeelde bewegingsafspraken; werkende hero → bio-passage; volledige H1; mediafout afgehandeld | De eerste twee secties voelen als één geregisseerde kennismaking, ook bij terugscrollen |
| 2. Speerpunten | Actieve kaart, beeldparallax, voortgang, hoofdstukbediening en beheerste exit | Alle zes kaarten zijn goed leesbaar, bereikbaar en correct gekoppeld |
| 3. Video | Kaderexpansie, donkerte-overgang, rustige kijkstand en betrouwbare mediafeedback | De sectie heeft filmische impact en bruikbare bediening bij laden, afspelen en fouten |
| 4. Samenhang | Nieuws, socials, footer-aansluiting en navbar op de nieuwe scènes afstemmen | De hele bestaande volgorde heeft variatie en vloeiende overgangen |
| 5. Verificatie | Mobiele afwerking, reduced motion, focus, terugnavigatie en prestatiecontrole | Geen vastzittende scroll, verborgen inhoud, afgesneden acties of grote layoutsprongen |

## Acceptatie en controle

- Visueel controleren op desktop 1280×720, 1440×900 en een breed scherm; mobiel 390×844 en een kleine 375×667; tablet en 200% zoom meenemen.
- Scènes vooruit én achteruit doorlopen, langzaam en met snelle scroll. Ook midden in een capture herladen, een artikel openen en teruggaan, en het venster tijdens een scène verkleinen.
- Alle inhoud en acties moeten met toetsenbord bereikbaar zijn, ook kaarten buiten de zichtbare track. Focus mag nooit achter een masker verdwijnen.
- Reduced motion verwijdert de bijbehorende extra scrollafstand; mediafouten en geblokkeerde autoplay leveren een bruikbare poster en status op.
- Streef naar vloeiende weergave rond 60 fps op een gangbare laptop en representatieve telefoon. Meten tijdens de captures; zware paints en lange taken oplossen waar ze optreden.
- Controleer LCP en layoutverschuiving tegenover een vooraf gemeten baseline; de nieuwe opening mag de hoofdafbeelding niet onnodig later laden.
- Typecheck en productiebuild uitvoeren. Gerichte interactiechecks voor eerste/laatste kaart, hoofdstuksprongen, mediafout en reduced-motion-flow; geen omvangrijke tests voor louter decoratieve waarden.

## Afbakening

Dit plan verandert de sectievolgorde, politieke inhoud en onderliggende pagina's niet. De gedeelde navbar en footer worden alleen aangepast waar de homepage-overgangen dat vragen. Beeldkwaliteit wordt eerst met bestaande assets beoordeeld; extra fotografie of nieuwe claims zijn geen veronderstelde vereiste.

De belangrijkste ontwerpkeuze is hiermee vastgelegd: behoud de huidige homepage, maar geef haar drie uitgesproken scrollmomenten en één consistente bewegingsregie. Exacte afstanden, uitsnedes en timing worden op het eerste werkende prototype afgesteld.
