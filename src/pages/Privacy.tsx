import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { SEO } from '../components/SEO';
import { contact } from '../data/contact';

const LAST_UPDATED = '19 juni 2026';

const sections = [
  { id: 'verantwoordelijke', label: '1. Verantwoordelijke voor de verwerking' },
  { id: 'gegevens', label: '2. Welke gegevens we verwerken' },
  { id: 'doeleinden', label: '3. Doeleinden & rechtsgronden' },
  { id: 'bewaartermijn', label: '4. Bewaartermijnen' },
  { id: 'ontvangers', label: '5. Ontvangers van uw gegevens' },
  { id: 'doorgifte', label: '6. Doorgifte buiten de EER' },
  { id: 'beveiliging', label: '7. Beveiliging' },
  { id: 'rechten', label: '8. Uw rechten' },
  { id: 'cookies', label: '9. Cookies' },
  { id: 'klacht', label: '10. Klacht indienen' },
  { id: 'wijzigingen', label: '11. Wijzigingen' },
];

export default function Privacy() {
  return (
    <PageTransition>
      <SEO
        title="Privacybeleid — Fabrice Goffin"
        description="Hoe Fabrice Goffin uw persoonsgegevens verwerkt, in overeenstemming met de Algemene Verordening Gegevensbescherming (AVG/GDPR) en de Belgische wetgeving."
        url="/privacy"
      />

      {/* Hero */}
      <section className="relative w-full bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25% 20%, rgba(239,68,68,0.6) 0, transparent 35%), radial-gradient(circle at 80% 70%, rgba(20,184,166,0.4) 0, transparent 35%)',
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
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium uppercase tracking-tighter text-white leading-[0.85] mb-8 font-heading">
              Privacy<br />beleid
            </h1>
            <p className="text-lg md:text-xl text-zinc-300 font-medium leading-relaxed max-w-3xl">
              Uw vertrouwen is essentieel. Op deze pagina leest u helder en transparant hoe uw persoonsgegevens worden verwerkt, volledig in overeenstemming met de Algemene Verordening Gegevensbescherming (AVG/GDPR) en de Belgische Wet van 30 juli 2018 betreffende de bescherming van natuurlijke personen met betrekking tot de verwerking van persoonsgegevens.
            </p>
            <div className="mt-10 inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
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
          <article className="lg:col-span-8 prose prose-zinc prose-lg max-w-none font-medium leading-relaxed prose-headings:font-heading prose-headings:font-medium prose-headings:uppercase prose-headings:tracking-tight prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-a:text-red-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-zinc-900 font-heading">

            <p className="text-xl text-zinc-700 leading-relaxed">
              Dit privacybeleid beschrijft op welke manier persoonsgegevens worden verzameld en verwerkt via de website <strong>fabricegoffin.be</strong>. Wij hechten het grootste belang aan de bescherming van uw persoonlijke levenssfeer en behandelen uw gegevens met de zorg en de discretie die u van een Belgische mandataris mag verwachten.
            </p>

            <h2 id="verantwoordelijke">1. Verantwoordelijke voor de verwerking</h2>
            <p>
              De verantwoordelijke voor de verwerking in de zin van artikel 4, 7) AVG is:
            </p>
            <div className="not-prose my-6 p-6 rounded-2xl bg-zinc-50 border border-zinc-200">
              <p className="text-sm font-black uppercase tracking-widest text-zinc-500 mb-3">Contactgegevens</p>
              <p className="text-zinc-900 font-bold text-lg leading-tight mb-2">Fabrice Goffin</p>
              <p className="text-zinc-600 text-sm leading-relaxed">
                Schepen van Dierenwelzijn, Digitalisering &amp; Ontmoeting<br />
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
              Voor alle vragen over dit privacybeleid of de verwerking van uw persoonsgegevens kan u steeds terecht op bovenstaand e-mailadres met als onderwerp <em>“Privacy”</em>.
            </p>

            <h2 id="gegevens">2. Welke gegevens we verwerken</h2>
            <p>
              Afhankelijk van uw interactie met de website kunnen volgende categorieën van persoonsgegevens worden verwerkt:
            </p>
            <h3>2.1 Gegevens die u zelf verstrekt via het contactformulier</h3>
            <ul>
              <li><strong>Identificatiegegevens:</strong> naam.</li>
              <li><strong>Contactgegevens:</strong> e-mailadres.</li>
              <li><strong>Inhoud van uw bericht:</strong> onderwerp en de tekst die u zelf invult.</li>
            </ul>
            <p>
              Het contactformulier opent uw lokale e-mailprogramma en verstuurt het bericht rechtstreeks vanuit uw mailbox naar <a href={`mailto:${contact.email}`}>{contact.email}</a>. De inhoud wordt niet opgeslagen in een aparte databank op deze website.
            </p>

            <h3>2.2 Technische gegevens</h3>
            <ul>
              <li>Bij het bezoeken van de website kan onze hostingprovider in serverlogs uw IP-adres, browsertype, besturingssysteem, datum en tijdstip van het bezoek en de bezochte pagina’s registreren met het oog op veiligheid en het opsporen van misbruik.</li>
              <li>Wij plaatsen op deze website <strong>geen analyse-, marketing- of trackingcookies</strong>. Zie ook <a href="#cookies">sectie 9</a>.</li>
            </ul>

            <h3>2.3 Gegevens die u via sociale media deelt</h3>
            <p>
              Indien u contact opneemt via de sociale kanalen waarnaar deze website verwijst (Facebook, Instagram, LinkedIn), gebeurt dit volgens de privacyregels van het betreffende platform. Op die verwerkingen heeft Fabrice Goffin als gebruiker van het platform geen volledige controle.
            </p>

            <h2 id="doeleinden">3. Doeleinden &amp; rechtsgronden</h2>
            <p>
              Persoonsgegevens worden enkel verwerkt voor welbepaalde, uitdrukkelijk omschreven en gerechtvaardigde doeleinden, op basis van een geldige rechtsgrond uit artikel 6, lid 1 AVG:
            </p>
            <ul>
              <li><strong>Beantwoorden van uw vraag of bericht</strong> — rechtsgrond: uw <em>toestemming</em> (art. 6.1.a AVG) en/of de uitvoering van precontractuele maatregelen op uw verzoek (art. 6.1.b AVG).</li>
              <li><strong>Vervulling van het politiek mandaat van Fabrice Goffin als schepen</strong>, voor zover uw bericht daarop betrekking heeft — rechtsgrond: <em>vervulling van een taak van algemeen belang</em> (art. 6.1.e AVG).</li>
              <li><strong>Beveiliging van de website en bestrijding van misbruik</strong> — rechtsgrond: <em>gerechtvaardigd belang</em> (art. 6.1.f AVG) van de verantwoordelijke en de bezoekers van de website.</li>
              <li><strong>Naleving van wettelijke verplichtingen</strong>, bijvoorbeeld in geval van een gerechtelijk verzoek — rechtsgrond: art. 6.1.c AVG.</li>
            </ul>
            <p>
              Uw gegevens worden <strong>niet</strong> gebruikt voor commerciële direct marketing en worden <strong>niet</strong> verkocht of verhuurd aan derden.
            </p>

            <h2 id="bewaartermijn">4. Bewaartermijnen</h2>
            <p>
              Persoonsgegevens worden niet langer bewaard dan strikt noodzakelijk voor het doel waarvoor ze werden verzameld, of zoveel langer als wettelijk verplicht of toegelaten:
            </p>
            <ul>
              <li><strong>E-mailcorrespondentie via het contactformulier:</strong> maximaal 2 jaar na het laatste contact, tenzij de aard van het dossier een langere bewaring rechtvaardigt.</li>
              <li><strong>Serverlogs van de hostingprovider:</strong> maximaal 12 maanden, waarna ze automatisch worden verwijderd of geanonimiseerd.</li>
              <li><strong>Gegevens nodig voor de naleving van een wettelijke verplichting:</strong> gedurende de wettelijk voorziene termijn.</li>
            </ul>

            <h2 id="ontvangers">5. Ontvangers van uw gegevens</h2>
            <p>
              Uw persoonsgegevens worden in beginsel enkel verwerkt door Fabrice Goffin en zijn rechtstreekse medewerkers. Voor sommige operationele aspecten worden beperkte gegevens gedeeld met:
            </p>
            <ul>
              <li><strong>De hostingprovider</strong> van de website (in de hoedanigheid van verwerker in de zin van art. 28 AVG), uitsluitend voor het technisch functioneren en de beveiliging van de website.</li>
              <li><strong>De e-maildienst</strong> die wordt gebruikt om uw berichten te ontvangen en te beantwoorden.</li>
              <li><strong>Bevoegde overheden of gerechtelijke instanties</strong>, indien wij daartoe wettelijk verplicht zijn.</li>
            </ul>
            <p>
              Met elk van deze partijen werden de nodige technische en organisatorische maatregelen overeengekomen om uw gegevens te beschermen.
            </p>

            <h2 id="doorgifte">6. Doorgifte buiten de Europese Economische Ruimte</h2>
            <p>
              Uw persoonsgegevens worden bij voorkeur verwerkt binnen de Europese Economische Ruimte (EER). Indien een dienstverlener (bijvoorbeeld een sociaalmedia-platform) gegevens buiten de EER verwerkt, gebeurt dit uitsluitend op basis van de waarborgen voorzien in hoofdstuk V van de AVG, waaronder een adequaatheidsbesluit van de Europese Commissie of de standaard contractuele bepalingen.
            </p>

            <h2 id="beveiliging">7. Beveiliging</h2>
            <p>
              Wij nemen passende technische en organisatorische maatregelen om uw persoonsgegevens te beschermen tegen ongeoorloofde toegang, verlies, vernietiging of openbaarmaking, waaronder:
            </p>
            <ul>
              <li>Versleutelde verbindingen via HTTPS (TLS).</li>
              <li>Beperkte toegang tot persoonsgegevens, op basis van het “need to know”-principe.</li>
              <li>Regelmatige updates en monitoring van de gebruikte software.</li>
              <li>Sterke wachtwoorden en, waar mogelijk, tweestapsverificatie voor de gebruikte diensten.</li>
            </ul>

            <h2 id="rechten">8. Uw rechten</h2>
            <p>
              Overeenkomstig de artikelen 15 tot 22 AVG beschikt u over de volgende rechten met betrekking tot uw persoonsgegevens:
            </p>
            <ul>
              <li><strong>Recht op inzage</strong> in de gegevens die wij over u verwerken.</li>
              <li><strong>Recht op rectificatie</strong> van onjuiste of onvolledige gegevens.</li>
              <li><strong>Recht op gegevenswissing</strong> (“recht om vergeten te worden”) wanneer er geen wettige grond meer is voor verwerking.</li>
              <li><strong>Recht op beperking</strong> van de verwerking in welbepaalde gevallen.</li>
              <li><strong>Recht op overdraagbaarheid</strong> van de gegevens die u zelf heeft verstrekt.</li>
              <li><strong>Recht van bezwaar</strong> tegen verwerkingen op basis van een gerechtvaardigd belang of een taak van algemeen belang.</li>
              <li><strong>Recht om uw toestemming in te trekken</strong> wanneer de verwerking op uw toestemming is gebaseerd, zonder dat dit afbreuk doet aan de rechtmatigheid van de verwerking vóór de intrekking.</li>
              <li><strong>Recht om niet te worden onderworpen aan een uitsluitend op geautomatiseerde verwerking gebaseerd besluit</strong> dat rechtsgevolgen voor u heeft (art. 22 AVG). Dergelijke besluiten worden via deze website niet genomen.</li>
            </ul>
            <p>
              U kan deze rechten kosteloos uitoefenen door een gemotiveerd verzoek te richten aan <a href={`mailto:${contact.email}`}>{contact.email}</a>, vergezeld van een redelijk bewijs van uw identiteit (bijvoorbeeld een gedeeltelijk afgeschermde kopie van uw identiteitskaart). Wij antwoorden binnen één maand na ontvangst van uw verzoek, behoudens de uitzonderingen voorzien in de AVG.
            </p>

            <h2 id="cookies">9. Cookies</h2>
            <p>
              Deze website plaatst <strong>uitsluitend strikt noodzakelijke cookies</strong> die vereist zijn voor het correct functioneren en de veiligheid van de website. Voor deze functionele cookies is volgens artikel 129 van de Belgische Wet betreffende de elektronische communicatie geen voorafgaande toestemming vereist.
            </p>
            <p>
              Er worden geen analyse-, advertentie- of social-mediacookies geplaatst die uw surfgedrag in kaart brengen. Indien dit in de toekomst zou veranderen, zal u eerst een duidelijke en geïnformeerde keuze worden voorgelegd via een cookiebanner, zoals voorgeschreven door de richtsnoeren van de Gegevensbeschermingsautoriteit.
            </p>
            <p>
              U kan via de instellingen van uw browser cookies steeds blokkeren of verwijderen.
            </p>

            <h2 id="klacht">10. Klacht indienen</h2>
            <p>
              U kan op elk ogenblik een klacht indienen bij de Belgische <strong>Gegevensbeschermingsautoriteit</strong>, indien u meent dat uw rechten niet correct werden gerespecteerd:
            </p>
            <div className="not-prose my-6 p-6 rounded-2xl bg-zinc-50 border border-zinc-200">
              <p className="text-zinc-900 font-bold text-lg leading-tight mb-2">Gegevensbeschermingsautoriteit (GBA)</p>
              <p className="text-zinc-600 text-sm leading-relaxed">
                Drukpersstraat 35<br />
                1000 Brussel<br />
                Tel.: +32 (0)2 274 48 00<br />
                <a href="mailto:contact@apd-gba.be" className="text-red-600 hover:underline font-semibold">contact@apd-gba.be</a><br />
                <a href="https://www.gegevensbeschermingsautoriteit.be" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline font-semibold inline-flex items-center gap-1">
                  www.gegevensbeschermingsautoriteit.be <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </p>
            </div>
            <p>
              Wij waarderen het wanneer u eerst rechtstreeks contact met ons opneemt, zodat wij samen met u naar een oplossing kunnen zoeken.
            </p>

            <h2 id="wijzigingen">11. Wijzigingen aan dit privacybeleid</h2>
            <p>
              Dit privacybeleid kan van tijd tot tijd worden aangepast om wijzigingen in de wetgeving of in onze praktijken weer te geven. De versie die op deze pagina is gepubliceerd, is steeds de actuele versie. Belangrijke wijzigingen zullen duidelijk op de website worden aangekondigd.
            </p>
            <p>
              <strong>Versie:</strong> {LAST_UPDATED}.
            </p>

            <div className="not-prose mt-16 pt-10 border-t border-zinc-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <p className="text-sm font-medium text-zinc-500">
                Vragen over dit privacybeleid? Neem gerust contact op.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 px-7 py-4 bg-zinc-900 hover:bg-red-600 text-white font-black uppercase tracking-widest text-xs rounded-full transition-colors duration-300 shadow-lg"
              >
                Contacteer ons
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </article>
        </div>
      </section>
    </PageTransition>
  );
}
