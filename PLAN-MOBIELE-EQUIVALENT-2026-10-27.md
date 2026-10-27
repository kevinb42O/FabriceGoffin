# De volledige desktopbeleving op mobiel

Datum: 27 oktober 2026. Status: geïmplementeerd en lokaal geverifieerd; fysieke telefoontest nog open.

## Leidende opdracht

Mobiel moet alle prachtige transities en effecten van desktop krijgen. De gebruiker bedoelt vooral de doorlopende, ruimtelijke ervaring: reizende typografie, groeiende en wisselende foto's, overdracht naar de 3D-galerij, kleurwissels, overlappende secties en de uitwaaierende finale. Alleen layoutverbeteringen voldoen niet aan deze opdracht.

Dit plan vervangt de eerdere richting in ditzelfde document om de mobiele speerpunten om te bouwen naar zes gewone verticale hoofdstukken en animaties tot subtiele entrees te beperken. De 3D-galerij en de grote overgangsmomenten blijven juist behouden. Ook eerdere uitspraken in andere plannen dat de mobiele presentatie goedgekeurd was of grote overgangen uitsluitend desktopgericht zijn, zijn voor deze opdracht achterhaald.

Uitgangspunt: dezelfde choreografie en visuele rijkdom als desktop, met geometrie, tekstplaatsing en scrollafstanden die voor een telefoon worden ontworpen. Native verticale scroll blijft de besturing. Elke beweging reageert op vooruit- én terugscrollen, zonder inputblokkering, verplichte leesstops of automatisch afspelende tussenfilmpjes.

## Wat momenteel ontbreekt

De actuele code is onderzocht en de bestaande weergave is bekeken op desktop 1440 × 900 en mobiele/tabletformaten 390 × 844, 375 × 667 en 768 × 1024. Uitgangsbeelden staan in `artifacts/mobile-audit/`. Dit waren Chromium-weergaven met nagebootste schermformaten; fysieke telefoons en Safari zijn nog niet getest.

- `openingQuery` in `homeMotion.ts` sluit mobiel uit. Daardoor activeert de gezamenlijke introregie niet en krijgt mobiel een losse hero en biografie.
- Mobiel mist hierdoor de groei van het portret, de fotografische dissolve, de reizende biografietitel en de doorlopende foto-overdracht naar de galerij.
- De speerpunten hebben op hogere telefoons wel 3D, maar met beeld boven en tekst op een vaste hoogte. Tijdens de reis groeien foto's achter de kop en loopt de tekst-/beeldwisseling visueel uiteen. Onder 740 px schermhoogte verdwijnt de 3D-presentatie volledig.
- De ruimtelijke overgang naar Nieuws hangt af van de gezamenlijke introregie en is op mobiel niet actief.
- De video-entree heeft al animatie, maar de gedeelde film → social-overgang staat via `HomeFinale` alleen op desktop aan.
- `SocialWall` krijgt op mobiel een voltooide voortgang. Daardoor staan de foto's direct in hun eindopstelling: het verzamelen, uitwaaieren en de ruimtelijke kleurtransitie ontbreken.
- Ook het lichte contactvlak schuift op mobiel niet over de vastgehouden rode scène zoals op desktop.

## Effecten die mobiel moet krijgen

| Moment | Te behouden desktopeffect | Mobiele vertaling |
| --- | --- | --- |
| Eerste scherm | Grote titelentree, fotografie, kaart en diepte | Compacte verticale compositie met dezelfde typografie en bewegingslagen |
| Hero → biografie | Portret groeit, foto wisselt, grote uitspraak verschijnt | Foto groeit binnen het smalle podium; uitspraak verschijnt over het beeld |
| Biografietitel | Dezelfde titel reist van de foto naar de tekstpositie, met wisselende inktkleur | Titel reist naar de bovenste tekstzone; masker volgt foto in beide richtingen |
| Biografie → speerpunten | Bestaande foto landt naadloos in het eerste 3D-beeld | Fotokader beweegt naar de beeldzone onder de speerpunttekst |
| Zes speerpunten | Doorlopende 3D-camerareis, grote beelden, kleurwissels en achtergrondbeweging | Volwaardige dieptegalerij onder de tekst, met een verticale cameracompositie voor mobiel |
| Speerpunten → Nieuws | Galerij trekt terug terwijl het witte nieuwsvlak overneemt | Dezelfde overlappende overdracht met mobiele afstanden |
| Nieuws → film | Donkere filmruimte opent; film en tekst komen ruimtelijk binnen | Masker, schaal, verplaatsing en rotatie behouden met passend eindkader |
| Film → social | Film trekt terug, donker gaat over naar rood, foto's verzamelen en waaieren uit | Dezelfde gekoppelde choreografie rond een mobiele titelcompositie |
| Social → contact | Licht vlak schuift vóór de vastgehouden collage | Rode scène blijft achter; contactvlak en inhoud komen samen binnen |
| Footer en bediening | Kaartbeweging, menu-entree, feedback en micro-interacties | Effecten behouden en waar nodig vertalen van hover naar aanraken/focus |

## 1. Eén doorlopende mobiele opening

De hero, biografie en speerpunten worden ook op mobiel verbonden. Alleen de desktop-mediaquery verruimen is onvoldoende: de huidige compositie, titelmeting en fotokaders zijn op naast-elkaar geplaatste kolommen gebaseerd.

- Maak een gedeelde hoofdstukregie met een expliciet mobiel layoutprofiel: gemeten titelpositie, teksthoogte, fotokader en bruikbare podiumhoogte.
- Hero krijgt een bewuste verticale compositie van naam, introductie, actie en portret. De titelentree, kaartparallax en fotografische gelaagdheid blijven aanwezig.
- Bij scrollen verdwijnen de introductietitel en acties in de bestaande volgorde. Het portret groeit, waarna de strandfoto via dezelfde fotografische dissolve overneemt.
- De biografische uitspraak verschijnt groot over de foto en reist daarna naar haar leespositie boven de verdere inhoud. Het blijft één echte bewegende titel, zonder zichtbare wissel naar een kopie.
- Witte inkt blijft alleen op het fotografische vlak; buiten het beeld worden de normale donkere/rode kleuren zichtbaar. Het huidige hoofdzakelijk horizontale masker uitbreiden naar het werkelijke tweedimensionale snijvlak van titel en foto.
- De tekst krijgt gemeten leesruimte. Wanneer de biografie niet in één scherm past, mag ze binnen het hoofdstuk door native paginascroll voorbijschuiven terwijl de beeldlaag de aansluiting bewaart. Geen interne scrollcontainer, afgekapt tekstblok of verkleining van alle tekst om alles toch in één scherm te persen.
- De volgende foto-overdracht begint zodra de biografische inhoud voorbij is; geen kunstmatige stilstaande leesfase toevoegen.

## 2. Biografiebeeld wordt het eerste galerijbeeld

Dit overgangsmoment is ook mobiel een hoofdonderdeel van de ervaring.

- De strandfoto blijft zichtbaar terwijl titel en overige biografie ruimte maken.
- Het fotokader reist naar de eerste galerijpositie onder de speerpunttekst; achtergrond en kop veranderen gelijktijdig.
- Het DOM-beeld en het eerste WebGL-beeld gebruiken exact hetzelfde gemeten eindkader, dezelfde beeldverhouding en dezelfde uitsnede.
- De DOM-laag blijft staan tot het canvas het overeenkomende frame werkelijk heeft getekend. Geen flits, dubbel beeld of lege tussenstap bij een trage telefoon.
- Het overdrachtskader wordt uit de mobiele galerijgeometrie berekend; `firstStandpuntFrame` mag niet langer uitsluitend desktopkolommen veronderstellen.

## 3. Speerpunten: de 3D-reis blijft, foto onder de tekst

Aanvulling tijdens uitvoering: de foto blijft onderdeel van dezelfde 3D-scène en mag tijdens de camerabeweging uitgroeien achter de tekst erboven. Geen afgeschermde fotozone of aparte fotosectie. Adaptieve inkt en een transparante schaduwlaag bewaken de leesbaarheid.

De rustcompositie wordt: sectiekop → nummer/titel → uitleg/leeslink → grote foto → bediening. Het beeld mag tijdens het scrollen in diepte groeien, kantelen en uit beeld bewegen, zoals op desktop. De foto begint onder de tekst en mag daar tijdens het groeien achter door bewegen.

- Behoud de continue camerareis door alle zes foto's, inclusief voorwaartse groei, diepte, kleurmenging en de bestaande sfeerlagen.
- Herbereken de verticale positie, schaal, z-afstand en verdwijnzone voor een telefoon. Alleen de foto met CSS naar beneden schuiven corrigeert het cameratraject niet.
- Reserveer bovenaan een gemeten zone voor de kop en de langste speerpunttekst. Daaronder krijgt de fotografie zoveel mogelijk ruimte. De rustpositie is groot en leesbaar; geen kleine miniatuur onder een groot leeg vlak.
- Laat foto's vrij in dezelfde scène groeien en achter de tekst door bewegen. Gebruik adaptieve tekstkleur en transparante schaduw waar fotografie de tekst kruist; geen begrenzing die de foto in een aparte zone opsluit.
- Nummer, tekst, link, achtergrondkleur en zichtbaar onderwerp worden op dezelfde gerenderde camerafase afgestemd. Overgangskaders kunnen twee foto's tonen, maar de dominante foto en de bijbehorende tekst moeten inhoudelijk overeenkomen.
- Respecteer vierkante, liggende en staande fotografie. Bereken per bronbeeld de passende schaal binnen de mobiele beeldzone.
- De zes hoofdstukknoppen en pijlen blijven werken en landen op een volledige compositie. Touchdoelen minimaal 44 × 44 px.
- De kaartachtergrond en bestaande trails/sfeerbeweging krijgen ook op mobiel hun rol. Effecten die desktopmuisbeweging gebruiken, kunnen op mobiel reageren op scrollrichting en -snelheid, zonder een extra veeggebaar te vereisen of het scrollen over te nemen.
- Verwijder de willekeurige 740 px hoogteknip als reden om alle 3D te verliezen. Korte schermen krijgen aangepaste ruimte en hoofdstukafstand met dezelfde effecten. Extreme landscape- of vergrote-tekstweergaven mogen extra documentruimte gebruiken om inhoud bereikbaar te houden.

## 4. Galerij → Nieuws: wit vlak neemt de ruimte over

- Het laatste beeld blijft staan terwijl de galerijcompositie subtiel terugtrekt.
- Het echte witte nieuwsvlak schuift van onder over die scène. Kop, overzichtslink en eerste kaarten verschijnen gekoppeld aan dezelfde voortgang.
- Pas de bestaande overlap en extra eindruimte toe op de gemeten mobiele podiumhoogte. Geen witte kier, paginaverspringing of tweede gekopieerde nieuwssectie.
- Nieuws blijft na de overdracht gewoon verder scrollen en horizontaal doorbladeren.
- Verminder losse tussenruimtes in de nieuwskop, zodat de animatie naar een overtuigende en compacte mobiele eindcompositie leidt.

## 5. Nieuws → video: filmische entree behouden

- Behoud de opening van het masker, de atmosferische achtergrondzoom en de gezamenlijke entree van titel en film.
- De film mag tijdens de entree verplaatsen en roteren; hij eindigt recht, volledig bedienbaar en binnen de beschikbare breedte.
- Gebruik mobiele afstanden en draaipunten. Behoud zichtbare diepte en beweging; vervang dit niet door alleen een fade.
- Stem de eindgrootte van staande video's af op de schermhoogte, met behoud van hun verhouding. Hoofdstukkeuze, pauze en geluid blijven logisch bereikbaar.
- Bij videowissel blijven inhoud en bediening stabiel en werkt het daaropvolgende vertrek ook vanuit de tweede video.

## 6. Film → rode socialscène: dezelfde grote finale

- Activeer de gedeelde vertrek-/entreevoortgang ook op mobiel.
- De filmcompositie trekt terug terwijl de achtergrond van donker via warm naar rood beweegt.
- De vijf foto's verschijnen als centrale verzameling en waaieren scrollgestuurd uit naar hun mobiele eindposities.
- De grote titel komt met dezelfde gekoppelde schaal-, positie- en zichtbaarheidsovergang binnen. Instagramlink landt op een vrij en leesbaar deel van de compositie.
- Eindposities worden voor het smalle scherm ontworpen: foto's boven en onder de tekst, zonder onbedoelde overlap met kop of link. Het zichtbare uitwaaieren moet ruim genoeg blijven om het effect te ervaren.
- De complete scène werkt ook terugwaarts: foto's verzamelen weer, de rode ruimte wijkt en de film komt terug.

## 7. Social → contact → footer

- Houd de rode scène vast terwijl het lichte contactvlak eroverheen schuift, net als op desktop.
- Contacttitel, toelichting en ronde pijl komen als samenhangende compositie op. Daarna laat de scène vloeiend los naar de footer.
- Bereken overlap uit dezelfde podiummaat als de socialscène, zodat er geen afgesneden eindpositie of lege strook ontstaat.
- Footer compacter uitlijnen met contactgegevens vroeg in beeld en navigatie in twee kolommen, met behoud van kaartachtergrond en beweging.
- Menu-entree, linkfeedback en ronde contactpijl ook bij aanraken en toetsenbordfocus verzorgen.

## Technische opbouw

- **Gedeelde effecten, aparte geometrie:** hergebruik de bestaande motionwaarden, inhoud en renderer. Maak een mobiel layout-/tijdlijnprofiel in plaats van een tweede los effectensysteem.
- **Meten in plaats van vaste percentages:** meet koppen, tekstblokken, beeldverhoudingen en beschikbare ruimte. Vervang mobiele vaste posities zoals `top: 58%` door afgeleide zones.
- **Eén viewportreferentie:** podium, overlap, ankers en camera gebruiken dezelfde maat. Browserbalken, safe areas, rotatie en resize mogen geen nieuwe voortgang of sprong veroorzaken. Herbereken geometrie wanneer nodig en behoud daarbij het huidige hoofdstuk.
- **Scrollafstand volgt de compositie:** maak een mobiel budget per bewegingsfase en leesblok. Niet blind desktopafstanden kopiëren of de hele ervaring inkorten tot losse fades. De galerijcamera blijft lineair doorlopen; extra leesruimte wordt niet als stilstand in haar traject ingevoegd.
- **Geen tweede WebGL-renderer:** de bestaande engine krijgt de mobiele beeldzone en camera-instellingen. Voorladen vóór de overdracht, pauzeren zodra het canvas volledig afgedekt is.
- **Kwaliteit afstemmen op het apparaat:** eerst pixelratio, textuurgrootte en kostbare decoratieve lagen optimaliseren. De grote overgangen en 3D-reis zijn de kern; ze niet standaard uitschakelen omdat het scherm mobiel is.
- **Expliciete uitzonderingen:** bij gebruikersvoorkeur voor verminderde beweging of een echte rendererfout blijft alle inhoud beschikbaar in een passende rustige presentatie. Schermbreedte alleen is geen reden om de rijke ervaring weg te laten.
- **Focus en routes volgen zichtbaarheid:** afgedekte links niet focusbaar laten; ankers en terugkeer uit artikelen of standpunten openen een leesbaar hoofdstuk.

Belangrijkste bestanden: `HomeIntroSequence.tsx/.css`, `HomeHero.tsx`, `HomeHeroMobile.tsx`, `HomeOpening.css`, `HomeBio.tsx`, `HomeStandpuntenPreview.tsx`, `HomeStandpunten.css`, `HomeNieuwsPreview.tsx/.css`, `HomeFinale.tsx`, `VideoShowcase.tsx/.css`, `SocialWall.tsx/.css`, `Navbar.tsx`, `Footer.tsx`, `src/lib/homeMotion.ts`, `introSequence.ts`, `standpuntenMotion.ts` en de geometrie in `depth-gallery`.

## Bouwvolgorde

1. Bestaande desktopbeweging als referentie vastleggen en per effect de mobiele geometrie en meetpunten bepalen.
2. Eerst het samenhangende traject hero → biografie → eerste speerpunt op mobiel bouwen. Daarmee de lastigste titelmaskers en DOM/canvas-overdracht bewijzen.
3. De volledige 3D-galerij naar tekst boven / foto onder aanpassen, inclusief synchronisatie en korte schermen.
4. De ruimtelijke overdracht naar Nieuws en de filmische video-entree aansluiten.
5. De gekoppelde film → social → contact-finale activeren en voor mobiel componeren.
6. Navigatie, footer en mobiele afwerking per sectie afronden. Achterliggende pagina's controleren op aansluitende interactie- en layoutproblemen.
7. De volledige ervaring als beweging beoordelen en de gerichte motioncontroles, TypeScriptcontrole en productiebuild uitvoeren.

## Wanneer dit klaar is

- Elk effect in de vergelijkingstabel is op mobiel herkenbaar aanwezig. Het resultaat is geen verzameling statische secties met alleen een entree-animatie.
- De reizende titel en foto-overdracht zijn doorlopend, zonder dubbeling, flits of sprong.
- Alle zes speerpunten behouden 3D, kleurwissels en sfeer. Tekst staat in de rustcompositie boven de foto; groeiende beelden mogen erachter komen en de tekst blijft leesbaar.
- Nieuws, social en contact nemen hun voorganger zichtbaar ruimtelijk over.
- Langzaam, snel en omgekeerd scrollen geeft telkens consistente tussenbeelden, zonder vastgehouden input of verplichte afspeelduur.
- Beoordeel bewegingsopnames én tussenkaders bij circa 0/25/50/75/100% van iedere overdracht. Screenshots van eindposities bewijzen geen goede transitie.
- Controleer 320/360/375/390/430 px, korte en hoge telefoons, tablet en landscape; vergelijk desktop op 1440 en 1920 px met de bestaande referentie.
- Test browserbalken die verschijnen/verdwijnen, oriëntatiewissel, grotere tekst, ankerlinks, browserterugkeer en reduced motion.
- Test verticale touchscroll, horizontaal nieuws swipen, videobediening en galerijnavigatie apart. Bij voorkeur op een echte iPhone/Safari en Android/Chrome; rapporteer ontbrekende hardwarecontrole.
- Meet framegedrag tijdens de zwaarste overgangen. Richtwaarde is vloeiende weergave rond de verversingssnelheid van een gangbaar toestel, zonder terugkerende haperingen of zwarte canvasframes; nog geen prestatieclaim zonder apparaatmeting.
- Desktop behoudt zijn bestaande choreografie; gedeelde codewijzigingen worden ook daar visueel en functioneel gecontroleerd.


## Uitvoering en verificatie

- Mobiel gebruikt `MobileHomeSequence` met een eigen native-scrolltijdlijn. De bestaande desktopintro, desktopwaarden en desktopgalerijcamera zijn niet aangepast door deze implementatie.
- Titelreis, fotografische dissolve, DOM/canvas-overdracht, zes 3D-speerpunten en de overlappende nieuwsentree zijn actief op mobiel. Foto’s staan in rust onder de tekst en mogen tijdens de reis erachter doorgroeien. De geprojecteerde foto bepaalt een transparante schaduwlaag en aangepaste tekstinkt.
- De laatste foto groeit tijdens de nieuwsovergang tot circa tweemaal haar schaal en beweegt maximaal circa 48% van de podiumhoogte omhoog. De mobiele overgang gebruikt geen terugtrekkende camerabeweging.
- De bestaande finale is voor mobiel geactiveerd met mobiele fotoposities en timing: filmvertrek, kleurwisseling, uitwaaieren en het overlappende contactvlak.
- Zes Chromium-formaten gecontroleerd: 320 × 568, 375 × 667, 390 × 844, 430 × 932, 768 × 1024 en 844 × 390. 3D actief, geen horizontale pagina-overloop.
- `scripts/check-mobile-home.ts` controleert zes onderwerp-/linkcombinaties, hoofdstuknavigatie, terugscrollen, omhoog bewegen én vergroten van de laatste foto, synthetische verticale touchscroll, horizontale nieuwsswipe, biografieleesruimte, hash-navigatie, videokeuze/geluid, uitwaaieren en live reduced-motion-wissel.
- Aanvullend gecontroleerd: behoud van hoofdstukpositie bij viewportresize en een werkende fototerugval na gesimuleerd WebGL-contextverlies.
- TypeScriptcontrole, productiebuild en bestaande desktop-motioncontroles slagen. De mechanische ontwerpcontrole gaf geen bevindingen voor de gewijzigde targets.
- Desktop gecontroleerd tegen een afzonderlijke referentiekopie zonder de nieuwe mobiele route. Sectieposities en paginahoogte zijn gelijk. Live WebGL-, video- en achtergrondframes zijn tijdsafhankelijk en vormen geen bewijs van pixelidentieke screenshots. Tijdens het werk veranderden daarnaast desktopbronnen buiten deze mobiele implementatie; die wijzigingen zijn behouden.
- Bewijsbeelden staan in `artifacts/mobile-implementation/`. Chromium-emulatie en synthetische touch zijn geen fysieke iPhone-/Androidtest; prestaties en Safari-gedrag op echte apparaten blijven te bevestigen.
