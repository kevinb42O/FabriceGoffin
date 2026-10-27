# Hero: centrale uitspraak die landt als biografietitel

Datum: 27 oktober 2026. Status: geïmplementeerd en visueel gecontroleerd op 27 oktober 2026.

## Richting

De uitspraak ‘Een hart voor dieren, een blik op de toekomst.’ krijgt één doorlopende beweging: groot en centraal over de fotografie, een rustig leesmoment, vervolgens een vloeiende verplaatsing en verkleining naar de bestaande biografietitel rechts van de strandfoto. De bezoeker volgt dezelfde woorden van introductie naar inhoud.

Dit verfijnt de bestaande desktopopening. De identiteit, foto's, tekstinhoud en uiteindelijke biografiecompositie blijven de basis. De centrale uitspraak verschijnt tijdens de bestaande scrollpassage, nadat ‘Ik ben Fabrice’ ruimte maakt.

## Vastgestelde huidige situatie

- `HomeHero.tsx` toont een afzonderlijke decoratieve `opening-statement` linksonder, met een beperkte verticale beweging en een fade-out.
- `HomeBio.tsx` toont dezelfde boodschap later opnieuw als H2. Beide teksten hebben een andere interpunctie en hoofdlettergebruik.
- De beeldexpansie loopt nu van 8–46%, de fotowissel van 48–66%, het terugplaatsen van het beeld van 65–90% en de biografie-entree van 77–93% van de scrollpassage.
- De huidige tekst verdwijnt dus voordat de biografietitel verschijnt. De ruimtelijke verbinding ontbreekt.
- De lokale desktopversie is bekeken op 1280 × 720, inclusief de uitspraak over de strandfoto.

## Choreografie

Onderstaande percentages zijn afstelwaarden binnen de bestaande sticky passage, geen tijdsduren. De huidige totale hoogte van 245svh blijft het uitgangspunt.

| Scrollfase | Titel | Fotografie en overige inhoud |
| --- | --- | --- |
| 0–30% | De bestaande kennismaking ‘Ik ben Fabrice’ maakt ruimte. | Het portret groeit naar een schermvullende uitsnede. |
| 34–46% | De uitspraak onthult als twee volledige regels, groot en centraal. De tweede regel volgt heel licht op de eerste. | Een zachte, plaatselijke verdonkering geeft contrast achter de tekst. |
| 46–60% | De uitspraak blijft rustig en volledig leesbaar, zonder drift. | De wissel naar de strandfoto krijgt hier ruimte. |
| 60–88% | Dezelfde woorden bewegen naar de rechter biografiekolom en verkleinen naar de exacte H2-maat. De beweging remt beheerst af. | De strandfoto trekt gelijktijdig terug naar links. Het lichte vlak dat rechts vrijkomt draagt de landende titel. |
| 88–100% | De titel staat scherp en stabiel op zijn definitieve plek. | Biografietekst en quote worden zichtbaar; de pagina gaat over naar normale vervolgscroll. |

## Visuele regie

- Plaats het tekstblok optisch centraal in de bruikbare beeldruimte onder de navigatie, iets onder de verticale middenlijn. De uiteindelijke positie wordt op de echte foto afgestemd zodat Fabrices gezicht herkenbaar blijft.
- Houd de twee regels gedurende de hele reis links uitgelijnd binnen het blok. Het blok zelf staat eerst centraal. Daardoor hoeft de uitlijning tijdens het landen niet te verspringen.
- Begin ongeveer 1,3–1,5 keer groter dan de eindtitel, begrensd door viewportbreedte en beschikbare hoogte. Beide regels behouden dezelfde regelbreuk tijdens de reis.
- Gebruik dezelfde tekstvorm als de uiteindelijke H2: ‘Een hart voor dieren,’ en ‘een blik op de toekomst.’ De inhoud wordt uit één gedeelde bron gerenderd.
- Start met witte tekst over het beeld. Laat de eerste regel naar inktkleur en de tweede naar het bestaande rood overgaan wanneer achter de titel voldoende licht vlak is vrijgekomen. Toets contrast ook halverwege.
- De schoonheid komt uit de samenhang van positie, schaal, kleur en beeldkader. Geen rotatie, elastische terugslag of letter-voor-lettereffect.
- Houd de landende titel stabiel terwijl de lopende tekst eronder verschijnt. Geen tweede verticale entree van de volledige biografiewrapper.

## Technische uitvoering

1. **Gedeelde titel en bestemming.** Maak de titel in `HomeBio.tsx` afzonderlijk meetbaar en deel de tekst met de centrale weergave. De echte H2 blijft de semantische kop; een eventuele visuele reislaag is `aria-hidden`.
2. **Eindpositie als bron.** Meet de werkelijke H2-regels na fontloading en bij resize met `ResizeObserver`. Leid de starttransformatie af van de eindpositie en de beschikbare centrale ruimte. Geen vaste pixelcoördinaten per schermformaat.
3. **Doorlopende reis.** Gebruik de bestaande Motion-values met een FLIP-achtige transformatie op beide regels. Animeer vooral positie, uniforme schaal en kleur. Vermijd een vervormende schaal of een veranderende regelomloop tijdens de beweging.
4. **Onzichtbare overdracht.** Als een aparte reislaag nodig is, valt deze aan het einde exact samen met de echte H2. Draag de zichtbaarheid over op dezelfde positie, zonder dubbele letters, een extra fade of layoutverschuiving. De eindkop blijft daarna in zijn eigen layout.
5. **Gedeelde partituur.** Voeg benoemde bereiken toe aan `homeMotion.ts` voor onthullen, lezen, reizen en landen. Stem `settle`, de fotoschaduw en de biografieproza daarop af.
6. **Scroll blijft leidend.** Alle tussenstanden zijn deterministisch en omkeerbaar. Geen loslopende intro-timers of springs die de scrollpositie merkbaar achternazitten. Ook bij snel scrollen en terugscrollen moet de compositie kloppen.

Betrokken bestanden: `src/components/HomeHero.tsx`, `src/components/HomeBio.tsx`, `src/components/HomeOpening.css` en `src/lib/homeMotion.ts`.

## Schermgroottes en terugval

- De volledige reis geldt voor de bestaande cinematic desktopmodus, vanaf 1024px en alleen wanneer de inhoud past.
- Mobiel, lage vensters en `prefers-reduced-motion` behouden de leesbare biografie in normale documentflow. Geen extra sticky passage op mobiel voor deze wijziging.
- Bij een resize wordt opnieuw gemeten zonder zichtbare dubbele titel. Wanneer de cinematic modus vervalt, is de gewone H2 direct beschikbaar.
- De strandfoto moet geladen zijn vóór de zichtbare fotowissel; de bestemming wordt pas vastgelegd zodra de fonts beschikbaar zijn. De gewone inhoud blijft de veilige basis bij meet- of laadproblemen.

## Uitvoering en beoordeling

Eerst de ononderbroken verplaatsing en exacte landing bouwen; daarna de centrale plaatsing, beeldtiming, contrast en tekstentree samen verfijnen. Geen extra animatiebibliotheek nodig.

Beoordelen op 1280 × 720, 1440 × 900 en een breed desktopvenster, plus mobiele en reduced-motion-terugval. Bekijk begin, leesmoment, midden van de reis en eindstand, zowel vooruit als achteruit. Controleer ook snel scrollen, resize en herladen halverwege.

Geslaagd wanneer de bezoeker zonder onderbreking dezelfde titel kan volgen, de centrale uitspraak voldoende leesrust krijgt, gezicht en hond herkenbaar blijven, en de eindstand exact overeenkomt met de biografietitel. Tijdens geen enkele tussenstand mogen dubbele tekst, een sprong, rek in de letters of een onleesbare kleurovergang zichtbaar zijn. Voer daarna de TypeScript-controle, productiebuild en gerichte motionchecks uit.

## Uitgevoerde verfijningen

De echte H2 beweegt met gemeten positie en uniforme schaal; een aparte titeloverdracht is daardoor niet nodig. Een identieke, voor schermlezers verborgen witte inktlaag wordt op de bewegende fotorand afgeknipt. Dit vervangt de geplande algemene kleurinterpolatie: wit blijft boven de foto en donker/rood verschijnt exact boven het papier. Alle geometrie gebruikt hetzelfde scrollsample, ook bij terugscrollen.

De fotowissel is ingekort tot 46–58%, zodat de strandfoto vóór de titelreis staat. De schaduw blijft tijdens de passage lang genoeg aanwezig voor contrast en verdwijnt bij het landen. De beschikbare ruimte wordt op ongetransformeerde elementhoogte getoetst, zodat de bewegende titel de cinematic modus niet beïnvloedt.

Gecontroleerd: 1280 × 720, 1440 × 900, 2048 × 1152, mobiel 390 × 844, resize tussen deze formaten, heen- en terugscrollen en reduced motion. De mobiele en reduced-motion-versies tonen de gewone biografie zonder reislaag. TypeScript, productiebuild en de bestaande motionchecks slagen. De ontwerpdetector gaf geen bevindingen.
