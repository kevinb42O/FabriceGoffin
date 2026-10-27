# Hero → biografie → speerpunten: één doorlopende compositie

Datum: 27 oktober 2026. Status: uitgevoerd, inclusief de aanvullende afwerking van titelvolgorde, tekstlagen, kaartachtergrond en kleurwissels.

De eerste drie desktophoofdstukken delen nu één native scrolltijdlijn en één sticky podium. Het bestaande budget van circa 745svh is teruggebracht naar circa 710svh. Het DOM-fotokader volgt de rustgeometrie van de eerste 3D-foto en blijft staan tot de canvaslaag een echt beeld heeft getekend. Op mobiel en bij verminderde beweging blijven de bestaande presentaties beschikbaar.

Aanvullend op verzoek van de gebruiker: Volgens de laatste afstelling is ‘Ik ben Fabrice’ volledig verdwenen zodra de volgende titel begint te verschijnen. De speerpuntteksten wisselen direct en synchroon met het gerenderde beeld; de uitgaande tekstanimatie is verwijderd om een korte terugkeer van de vorige titel te voorkomen. ‘Speerpunten’ en de bediening hebben een expliciete bovenste tekstlaag. De kaart van Oostende blijft subtiel aanwezig in de gekleurde galerijachtergrond, via de achtergrondshader zodat foto's vrij blijven. De kop wisselt geleidelijk van donkere naar lichte inkt via een scrollgestuurd masker; de overige tekstkleuren volgen de daadwerkelijk gerenderde camera.

## Richting

Sectie 1 is de hero, sectie 2 de biografie en sectie 3 de speerpunten. De volgende afwerkingsslag verbindt deze drie hoofdstukken tot één doorlopend verhaal: het portret opent de kennismaking, de uitspraak wordt de biografietitel en het biografiebeeld draagt de bezoeker de 3D-galerij binnen.

**Het belangrijkste nieuwe moment is de overdracht van de biografiefoto naar het eerste speerpunt.** De fotografie blijft ruimtelijk aanwezig terwijl tekst, kader en achtergrond van hoofdstuk veranderen. Dat moet het gevoel wegnemen dat de ene sectie wordt afgesloten voordat een nieuwe sectie start.

## Vaststaande voorkeuren

- Native scroll blijft altijd beschikbaar. Iedere scrollstap stuurt de compositie direct vooruit of achteruit. Geen leespauses, snapmomenten of vergrendelde wheel-/touchinput.
- De huidige lineaire camerabeweging door de zes speerpunten blijft behouden.
- De grotere desktopformaten voor vierkante en staande foto's blijven behouden, inclusief hun volledige beeldinhoud.
- ‘Speerpunten’ blijft linksboven; ‘Alle standpunten’ blijft rechtsboven, ook tijdens de entree.
- De rode scrolltracker blijft verwijderd.
- De huidige mobiele presentatie is goedgekeurd. De nieuwe grote ruimtelijke overdracht wordt eerst voor desktop ontworpen; mobiel krijgt alleen een compacte aansluiting binnen de bestaande opbouw.
- De bestaande foto's, teksten, hoofdstukvolgorde en routes zijn het materiaal.

## Wat er nu al staat en waar de naad zit

De actuele code en lokale desktopweergave zijn onderzocht, inclusief de gewijzigde reizende titel. `HomeHero.tsx` laat de echte biografietitel al vanuit de fotografie naar de rechterkolom bewegen. Een witte tekstlaag is aan de foto gemaskeerd; op de lichte achtergrond komt de normale tekstkleur vrij. Dit is een bruikbare basis die wordt verfijnd.

De biografie en de speerpunten gebruiken nu twee afzonderlijke sticky scènes. Daardoor schuift de biografie als een afgerond blok weg en komt de volgende achtergrond met een nieuw beeld op. Deze aansluiting is de belangrijkste onderbreking in de visuele regie.

## Gerichte inspiratie uit Webaanzee

| Onderzocht onderdeel | Relevant principe | Toepassing bij Fabrice |
| --- | --- | --- |
| `CoastalTitle.tsx` | Typografie reist naar een gemeten eindpositie | De huidige reizende H2 exact laten landen, met stabiele regelafbreking en beeldafhankelijke inktkleur |
| `StickyProjectGrid.tsx` | De volgende scène bestaat al achter de vertrekkende compositie | Het eerste speerpunt en zijn achtergrond voorbereiden voordat de biografie vertrekt |
| `PortfolioDepth.tsx` | Eén tijdlijn stuurt overlappende hoofdstukken en overdrachten | Een gezamenlijke desktopregie voor uitsluitend de eerste drie secties |
| `DepthShowcase.tsx` | Het beeld blijft bewegen terwijl de volgende inhoud overneemt | De DOM-fotografie gecontroleerd laten overgaan naar het eerste 3D-beeld |

Het doel is dezelfde ruimtelijke continuïteit, toegepast op Fabrice zijn eigen beelden en inhoud.

## 1 → 2: van kennismaking naar persoonlijk verhaal

### Het portret opent de ruimte

- Het portretkader groeit vanuit zijn huidige positie rechts naar een brede foto-opstelling. De schaalverandering, randbeweging en uitsnede krijgen één samenhangend traject.
- ‘Ik ben Fabrice’ en de ondersteunende inhoud wijken beperkt omhoog terwijl het beeld de ruimte overneemt. De introductie verdwijnt voordat de biografietitel dezelfde beeldzone nodig heeft.
- De kaart en het watermerk van Oostende bewegen trager op de achtergrond. Hun contrast neemt af zodra fotografie en uitspraak de hoofdrol krijgen.
- De foto van Fabrice thuis gaat via een korte fotografische dissolve over naar de strandfoto. Beide foto's behouden herkenbare gezichten en hun eigen compositie.

### Dezelfde titel reist door

- De al bestaande uitspraak wordt eerst groot over de fotografie gelezen en reist vervolgens naar haar definitieve plek rechts van het biografiebeeld.
- Beeldkader en titel bewegen gelijktijdig. Terwijl het beeld links ruimte maakt, komt de rechter tekstkolom vrij.
- De regelafbreking blijft gelijk tijdens het reizen. Er verschijnt geen tweede titel op het eindpunt.
- De witte inkt blijft alleen boven de fotografie zichtbaar; daarbuiten worden donker en rood zichtbaar. Het masker volgt de werkelijke foto- en tekstgeometrie, ook bij terugscrollen.
- Biografietekst en quote verschijnen in de vrijkomende ruimte terwijl de titel landt. Geen opeenvolging waarbij de bezoeker eerst op de titel en daarna op de rest moet wachten.

### Afwerking van de beweging

De huidige losse intervallen worden op elkaar afgestemd. Tijdens ieder overgangsdeel verandert de dominante compositie: kader, beeld of titel. De titel mag stabiel leesbaar worden terwijl het beeld nog doorbeweegt; er komt geen nieuwe strook scrollafstand waarin de hele scène stilstaat.

## 2 → 3: het biografiebeeld wordt de toegang tot de galerie

### A. De biografie geeft ruimte

De biografietekst en quote verlaten de rechterkolom in de normale leesrichting, met een beperkte opwaartse beweging en een korte fade. De strandfoto blijft in de ruimte aanwezig. Het beeld krijgt daardoor de hoofdrol voordat de galerijtekst verschijnt.

### B. Het kader beweegt naar de eerste 3D-positie

Het linker fotokader groeit en schuift naar de gemeten schermpositie van het eerste speerpunt. Het vertrekpunt is het echte biografiekader; het eindpunt volgt de huidige 3D-camera en de ruime desktopfotopassing. Dit is één traject in positie, schaal en uitsnede.

De foto's zijn verschillend: de biografie gebruikt `overfabrice.webp`, het eerste speerpunt `diervriendelijk.webp`. Daarom wisselt de foto binnen het doorgaande kader via een korte dissolve. De continuïteit zit in het kader en de ruimte; personen en dieren worden niet vervormd om een kunstmatige morph te suggereren.

### C. De achtergrond verandert mee

Het lichte papier van de opening gaat geleidelijk over in de warme achtergrond van het eerste speerpunt. De kaart van Oostende trekt terug terwijl de atmosferische galerijachtergrond overneemt. De overgang heeft geen zichtbare horizontale scheidingsrand.

Korrel en kleurweergave worden op beide zijden afgestemd. Er mag geen plotselinge sprong in textuurintensiteit, fotocontrast of witbalans ontstaan wanneer de WebGL-laag zichtbaar wordt.

### D. De galerij neemt over

- ‘Speerpunten’ verschijnt direct op zijn vaste plek linksboven en ‘Alle standpunten’ rechtsboven.
- De titel, toelichting en link van het eerste standpunt vullen de vrijgekomen tekstkolom.
- De overgang van het DOM-beeld naar de WebGL-foto gebeurt alleen wanneer positie, schaal, uitsnede en kleur overeenkomen. De canvaslaag moet al een geldig frame kunnen tonen.
- Parallax en de bestaande bewegingslijn bouwen pas na die overdracht geleidelijk op, zodat ze het uitlijnen niet verstoren.
- Bij verder scrollen reist de camera onmiddellijk richting speerpunt twee. Er wordt geen leesstop aan het eerste item toegevoegd.
- De volledige overgang werkt omgekeerd bij terugscrollen, via dezelfde posities en lagen.

## Timing en scrollafstand

De desktopbasis is nu circa 245svh voor de opening met biografie en 500svh voor de zes speerpunten, samen circa 745svh. Dit is het bestaande budget voor de nieuwe regie.

| Passage | Eerste afstelrichting |
| --- | --- |
| Hero → biografie | Verfijnen binnen de bestaande openingsafstand; geen extra introductie ervoor |
| Biografie → galerie | Circa 0,55–0,75 schermhoogte aan doorgaande overdracht |
| Zes speerpunten | De huidige vier schermhoogtes camerareis behouden, lineair en zonder itempauses |

De overdracht krijgt ruimte door de twee afzonderlijke sticky scènes samen te voegen en hun dubbele viewportpassage te benutten. De totale afstand mag hierdoor niet groter worden dan de huidige circa 745svh. Dit zijn prototypewaarden; de rendered compositie en het scrollgevoel bepalen de eindafstelling.

## Technische uitvoering

1. Voeg een regiecomponent toe voor uitsluitend hero, biografie en speerpunten, bijvoorbeeld `HomeIntroSequence.tsx`. Desktop krijgt één sticky podium; de rest van de homepage blijft in normale documentflow.
2. Gebruik één native scrollbron met cumulatief afgeleide hoofdstukgrenzen. De bestaande componenten ontvangen waar nodig voortgang via props. Vermijd twee onafhankelijke tijdlijnen voor hetzelfde overdrachtsmoment.
3. Behoud de reizende H2 in `HomeBioContent`. Meet het rustende tekst- en kaderlayout na fonts en resize; meet geen al getransformeerde bounding box als nieuw vertrekpunt.
4. Maak de schermgeometrie van het eerste 3D-beeld beschikbaar vanuit de galerie. De overgang gebruikt dezelfde camera, aspectverhouding en `fitStandpuntDesktop` als de uiteindelijke scène.
5. Gebruik een afgebakende foto-/maskerlaag voor de overdracht. Voorkom twee volledige, tegelijk zichtbare scènes met dubbele teksten en gezichten.
6. Koppel de overdracht aan scrollvoortgang, zonder `setTimeout` of een animatie die eerst moet uitspelen. Achteruit scrollen moet onmiddellijk richting en samenstelling omkeren.
7. Laad de galerij en het eerste beeld al tijdens de biografie. Is de engine nog niet klaar, dan blijft de DOM-foto bruikbaar en gaat de scroll verder. Wissel pas wanneer de beelden geometrisch overeenkomen; anders behoudt de passage zijn 2D-terugval.
8. Laat maar één laag eigenaar zijn van dezelfde transform. Corrigeer eventuele overlap van de pagina-entree, de titelanimatie, de camera-inertie en pointerparallax.
9. Herbereken ankers en hoofdstuknavigatie op de gezamenlijke scrollafstand. Behoud ‘Ontdek mijn verhaal’, de zes hoofdstukknoppen, detailroutes en ‘Verder naar nieuws’.
10. Houd de inhoud semantisch in de bestaande leesvolgorde. Decoratieve kopieën krijgen `aria-hidden`; onzichtbare interacties zijn niet focusbaar. Behoud een volledige versie in normale flow voor verminderde beweging, te weinig hoogte en fouten.

## Mobiel

De goedgekeurde foto-/tekstindeling blijft leidend. De overgang beperkt zich tot een compacte verandering van achtergrond en een bescheiden kaderonthulling wanneer het volgende hoofdstuk binnenkomt. De grote desktopbeeldoverdracht wordt niet op de telefoon gedrukt. De bestaande mobiele galerij behoudt haar beeldgrootte, leesruimte en continue scrollgedrag.

## Volgorde van bouwen en beoordelen

1. Maak eerst de nieuwe biografie → eerste speerpunt-overdracht werkend. Dit levert de grootste nieuwe kwaliteitswinst op.
2. Verbind beide passages met één desktopregie en laat de huidige lineaire galerijbeweging intact.
3. Verfijn hero → biografie: titeltraject, maskerrand, fotowissel en gelijktijdige entree van de biografietekst.
4. Werk kleur, korrel, contrast, pointerparallax en navigatie op de overdrachten af.
5. Controleer mobiel en de versie met verminderde beweging als aparte, behouden presentaties.

## Acceptatie

- Bij langzaam, snel en omgekeerd scrollen ontstaat geen lege of stilstaande overgangsstrook.
- De twee foto's wisselen herkenbaar zonder gezichtsvervorming of langdurige dubbele gezichten.
- De titel landt zonder verspringing in regelafbreking, positie, schaal of tekstkleur.
- De 2D/3D-overdracht heeft geen zichtbare verandering in kader, helderheid of uitsnede.
- De desktopfoto's blijven ruim; de galerijkop blijft links/rechts op zijn vaste plek; de tracker blijft weg.
- De nieuwe passage verlengt het bestaande totale scrollbudget niet.
- Ook bij vertraagd laden, WebGL-uitval, resize en terugnavigatie blijven inhoud en bediening bereikbaar.
- Visueel en op beweging controleren op 1280×720, 1440×808, 1440×900 en een breed scherm; de bestaande mobiele formaten en 200% zoom meenemen.
- Meten tijdens de overdracht: geen extra actieve renderer, overmatige transparante schermlagen of lange taken. De beoogde vloeiendheid moet op een gangbare laptop worden gecontroleerd.

Dit plan richt zich op de aansluitingen tussen de drie bestaande hoofdstukken. Nieuws, video, socials en footer vallen buiten deze afwerkingsslag.
