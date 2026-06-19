import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Scale, ArrowUpRight } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { SEO } from '../components/SEO';
import { contact } from '../data/contact';

const LAST_UPDATED = '19 juni 2026';

const sections = [
  { id: 'identificatie', label: '1. Identificatie van de uitgever' },
  { id: 'doel', label: '2. Doel van de website' },
  { id: 'aanvaarding', label: '3. Aanvaarding van de voorwaarden' },
  { id: 'gebruik', label: '4. Toegestaan gebruik' },
  { id: 'eigendom', label: '5. Intellectuele eigendom' },
  { id: 'aansprakelijkheid', label: '6. Aansprakelijkheid' },
  { id: 'links', label: '7. Hyperlinks naar derden' },
  { id: 'privacy', label: '8. Persoonsgegevens & cookies' },
  { id: 'beschikbaarheid', label: '9. Beschikbaarheid' },
  { id: 'wijzigingen', label: '10. Wijzigingen' },
  { id: 'recht', label: '11. Toepasselijk recht & rechtbank' },
  { id: 'contact', label: '12. Contact' },
];

export default function Voorwaarden() {
  return (
    <PageTransition>
      <SEO
        title="Algemene Voorwaarden — Fabrice Goffin"
        description="De gebruiksvoorwaarden van de website fabricegoffin.be, opgesteld in overeenstemming met de Belgische wetgeving en het Wetboek van economisch recht."
        url="/voorwaarden"
      />

      {/* Hero */}
      <section className="relative w-full bg-zinc-900 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 80% 20%, rgba(239,68,68,0.6) 0, transparent 35%), radial-gradient(circle at 20% 80%, rgba(20,184,166,0.4) 0, transparent 35%)',
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 lg:px-24 pt-40 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[3px] bg-red-600" />
              <span className="text-red-500 font-black uppercase tracking-[0.2em] text-xs">Juridisch</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white leading-[0.85] mb-8">
              Algemene<br />Voorwaarden
            </h1>
            <p className="text-lg md:text-xl text-zinc-300 font-medium leading-relaxed max-w-3xl">
              Door deze website te bezoeken, gaat u akkoord met onderstaande gebruiksvoorwaarden. Deze tekst is opgesteld in overeenstemming met het Belgische Wetboek van economisch recht (in het bijzonder Boek VI en Boek XII) en de overige toepasselijke Belgische wetgeving.
            </p>
            <div className="mt-10 inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <Scale className="w-4 h-4 text-teal-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-300">
                Laatst bijgewerkt: {LAST_UPDATED}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-20 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sticky TOC */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 mb-6">Inhoud</p>
              <nav className="flex flex-col gap-2 border-l-2 border-zinc-100">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="group flex items-center gap-3 pl-5 -ml-[2px] py-2 text-sm font-semibold text-zinc-600 hover:text-red-600 border-l-2 border-transparent hover:border-red-600 transition-all"
                  >
                    <span>{s.label}</span>
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <article className="lg:col-span-8 prose prose-zinc prose-lg max-w-none font-medium leading-relaxed prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-a:text-red-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-zinc-900">

            <p className="text-xl text-zinc-700 leading-relaxed">
              Deze algemene voorwaarden zijn van toepassing op elk bezoek aan en elk gebruik van de website <strong>fabricegoffin.be</strong>. Lees ze zorgvuldig door. Door de website te raadplegen, erkent u kennis te hebben genomen van deze voorwaarden en stemt u uitdrukkelijk in met de inhoud ervan.
            </p>

            <h2 id="identificatie">1. Identificatie van de uitgever</h2>
            <p>
              Conform artikel III.74 van het Belgische Wetboek van economisch recht en artikel 7 van de Wet van 11 maart 2003 betreffende bepaalde juridische aspecten van de diensten van de informatiemaatschappij, deelt de uitgever van deze website volgende gegevens mee:
            </p>
            <div className="not-prose my-6 p-6 rounded-2xl bg-zinc-50 border border-zinc-200">
              <p className="text-sm font-black uppercase tracking-widest text-zinc-500 mb-3">Uitgever &amp; verantwoordelijke</p>
              <p className="text-zinc-900 font-bold text-lg leading-tight mb-2">Fabrice Goffin</p>
              <p className="text-zinc-600 text-sm leading-relaxed">
                Schepen van Dierenwelzijn, Digitalisering &amp; Ontmoeting<br />
                Stad Oostende<br />
                {contact.address.line1}<br />
                {contact.address.line2}<br />
                België
              </p>
              <div className="mt-4 flex flex-col gap-1 text-sm">
                <a href={`mailto:${contact.email}`} className="text-red-600 hover:underline font-semibold">{contact.email}</a>
                <a href={contact.phoneHref} className="text-zinc-700 hover:text-red-600 font-semibold">{contact.phoneDisplay}</a>
              </div>
            </div>
            <p>
              Fabrice Goffin treedt voor deze website op in zijn hoedanigheid van politiek mandataris. De website is een persoonlijke, niet-commerciële website en heeft geen ondernemings- of BTW-nummer.
            </p>

            <h2 id="doel">2. Doel van de website</h2>
            <p>
              De website heeft als doel de bezoeker op een toegankelijke manier te informeren over de visie, standpunten, realisaties en activiteiten van Fabrice Goffin als schepen en als publiek persoon. De website biedt geen producten of diensten aan en is geen platform voor commerciële transacties in de zin van Boek VI van het Wetboek van economisch recht.
            </p>

            <h2 id="aanvaarding">3. Aanvaarding van de voorwaarden</h2>
            <p>
              Door de website te bezoeken, te raadplegen of er gebruik van te maken, aanvaardt u uitdrukkelijk en zonder voorbehoud deze algemene voorwaarden en het <Link to="/privacy">privacybeleid</Link>. Indien u zich niet kan vinden in deze voorwaarden, vragen wij u de website niet verder te gebruiken.
            </p>

            <h2 id="gebruik">4. Toegestaan gebruik</h2>
            <p>
              U verbindt zich ertoe de website uitsluitend te gebruiken in overeenstemming met deze voorwaarden, het toepasselijke recht en de openbare orde en goede zeden. Het is in het bijzonder verboden om:
            </p>
            <ul>
              <li>De website of de inhoud ervan te gebruiken op een wijze die een onrechtmatige daad uitmaakt of die de rechten van derden schendt;</li>
              <li>Geautomatiseerde systemen (zoals robots, scrapers of crawlers) in te zetten om de inhoud op een ongeoorloofde of buitensporige manier te raadplegen of te kopiëren;</li>
              <li>De goede werking, de beveiliging of de integriteit van de website te verstoren, onder meer door het verspreiden van virussen of malware;</li>
              <li>Berichten te versturen via het contactformulier die lasterlijk, beledigend, discriminerend, hatelijk, bedreigend, onwettig of in strijd met de openbare orde zijn;</li>
              <li>Pogingen te ondernemen om ongeoorloofde toegang te verkrijgen tot delen van de website, servers of accounts.</li>
            </ul>
            <p>
              Inbreuken op het bovenstaande kunnen aanleiding geven tot burgerrechtelijke en/of strafrechtelijke vervolging.
            </p>

            <h2 id="eigendom">5. Intellectuele eigendom</h2>
            <p>
              Alle elementen van deze website — met inbegrip van de teksten, foto’s, video’s, illustraties, logo’s, lay-out, broncode, databanken en de structuur — worden beschermd door het auteursrecht (Boek XI van het Wetboek van economisch recht) en, in voorkomend geval, door andere rechten van intellectuele eigendom. Zij blijven de exclusieve eigendom van Fabrice Goffin of van de rechthebbenden die hem daartoe een gebruiksrecht hebben verleend.
            </p>
            <p>
              Behoudens uitdrukkelijke andersluidende toestemming en behoudens de wettelijke uitzonderingen op het auteursrecht (zoals het citaatrecht of de uitzondering voor privégebruik), is het niet toegestaan de inhoud van de website geheel of gedeeltelijk te reproduceren, te verspreiden, te wijzigen, openbaar mee te delen of commercieel te exploiteren.
            </p>
            <p>
              Vragen over hergebruik van inhoud, persaanvragen of citatieverzoeken kan u richten aan <a href={`mailto:${contact.email}`}>{contact.email}</a>.
            </p>

            <h2 id="aansprakelijkheid">6. Aansprakelijkheid</h2>
            <p>
              De informatie op deze website wordt met de grootste zorg samengesteld. Fabrice Goffin streeft naar accurate, volledige en actuele informatie. Toch kan niet worden gegarandeerd dat de aangeboden informatie te allen tijde foutloos, volledig of geactualiseerd is. De inhoud is van algemeen informatieve aard en kan in geen geval worden beschouwd als juridisch, financieel of ander professioneel advies.
            </p>
            <p>
              Behoudens in geval van opzet, bedrog of zware fout, kan Fabrice Goffin niet aansprakelijk worden gesteld voor enige rechtstreekse of onrechtstreekse schade die voortvloeit uit:
            </p>
            <ul>
              <li>Het gebruik van of de onmogelijkheid tot gebruik van deze website;</li>
              <li>Onjuistheden, onvolledigheden of vertragingen in de aangeboden informatie;</li>
              <li>Tijdelijke onbeschikbaarheid, technische storingen of onderbrekingen;</li>
              <li>Virussen, malware of andere schadelijke elementen, niettegenstaande de redelijke voorzorgsmaatregelen die werden genomen;</li>
              <li>Beslissingen of handelingen die u op grond van de aangeboden informatie heeft genomen.</li>
            </ul>
            <p>
              Niets in deze clausule beoogt de aansprakelijkheid uit te sluiten die op grond van dwingend Belgisch recht niet kan worden uitgesloten.
            </p>

            <h2 id="links">7. Hyperlinks naar websites van derden</h2>
            <p>
              Deze website kan hyperlinks bevatten naar websites of pagina’s die door derden worden beheerd, zoals sociale media, persartikels of partnerorganisaties. Dergelijke links worden uitsluitend ter informatie aangeboden. Fabrice Goffin oefent geen enkele controle uit over deze externe websites en kan niet aansprakelijk worden gesteld voor de inhoud, het privacybeleid of het functioneren ervan. Het gebruik van deze externe websites gebeurt onder de uitsluitende verantwoordelijkheid van de bezoeker.
            </p>

            <h2 id="privacy">8. Persoonsgegevens &amp; cookies</h2>
            <p>
              De wijze waarop persoonsgegevens worden verwerkt en welke cookies worden gebruikt, wordt uitvoerig toegelicht in ons <Link to="/privacy">Privacybeleid</Link>, dat integraal deel uitmaakt van deze algemene voorwaarden. Wij nodigen u uit dat document grondig te lezen.
            </p>

            <h2 id="beschikbaarheid">9. Beschikbaarheid van de website</h2>
            <p>
              Wij streven naar een continue beschikbaarheid van de website, maar kunnen geen ononderbroken toegang garanderen. De website kan tijdelijk geheel of gedeeltelijk worden onderbroken, met name voor onderhoud, updates of in geval van overmacht. Dergelijke onderbrekingen geven geen aanleiding tot enige schadevergoeding.
            </p>

            <h2 id="wijzigingen">10. Wijzigingen aan deze voorwaarden</h2>
            <p>
              Fabrice Goffin behoudt zich het recht voor deze algemene voorwaarden op elk ogenblik te wijzigen, onder meer om ze in overeenstemming te brengen met nieuwe wettelijke verplichtingen of met de evolutie van de website. De gewijzigde voorwaarden treden in werking vanaf hun bekendmaking op deze pagina. Wij raden u aan deze pagina regelmatig te raadplegen.
            </p>

            <h2 id="recht">11. Toepasselijk recht en bevoegde rechtbank</h2>
            <p>
              Deze algemene voorwaarden, evenals elk geschil dat verband houdt met het gebruik van deze website, worden uitsluitend beheerst door het <strong>Belgische recht</strong>.
            </p>
            <p>
              Partijen zullen, in geval van betwisting, eerst proberen tot een minnelijke oplossing te komen. Bij gebrek aan een minnelijke oplossing zijn enkel de rechtbanken van het arrondissement <strong>West-Vlaanderen, afdeling Brugge</strong>, bevoegd, behoudens andersluidende dwingende wetsbepalingen die de consument een gunstiger forum bieden.
            </p>
            <p>
              Indien een bepaling van deze voorwaarden ongeldig, nietig of niet-afdwingbaar zou worden verklaard, blijven de overige bepalingen onverkort van kracht. De ongeldige bepaling wordt vervangen door een geldige bepaling die het oorspronkelijke economische en juridische doel zo dicht mogelijk benadert.
            </p>

            <h2 id="contact">12. Contact</h2>
            <p>
              Heeft u vragen of opmerkingen over deze algemene voorwaarden? Neem dan vrijblijvend contact op via <a href={`mailto:${contact.email}`}>{contact.email}</a> of via de officiële contactgegevens vermeld onder rubriek 1.
            </p>

            <p className="not-prose mt-12 text-sm font-medium text-zinc-500">
              <strong className="text-zinc-700">Versie:</strong> {LAST_UPDATED}.
            </p>

            <div className="not-prose mt-16 pt-10 border-t border-zinc-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <p className="text-sm font-medium text-zinc-500">
                Lees ook ons privacybeleid voor meer informatie over de verwerking van persoonsgegevens.
              </p>
              <Link
                to="/privacy"
                className="inline-flex items-center gap-3 px-7 py-4 bg-zinc-900 hover:bg-red-600 text-white font-black uppercase tracking-widest text-xs rounded-full transition-colors duration-300 shadow-lg"
              >
                Naar privacybeleid
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </article>
        </div>
      </section>
    </PageTransition>
  );
}
