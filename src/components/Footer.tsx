import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import { motion } from 'motion/react';
import { contact } from '../data/contact';

const footerLinks = [
  { path: '/', label: 'Home' },
  { path: '/over', label: 'Over Mij' },
  { path: '/standpunten', label: 'Standpunten' },
  { path: '/nieuws', label: 'Nieuws' },
  { path: '/contact', label: 'Contact' },
];

const socialLinks = [
  { label: 'Facebook', href: contact.socials.facebook, icon: Facebook },
  { label: 'Instagram', href: contact.socials.instagram, icon: Instagram },
  { label: 'LinkedIn', href: contact.socials.linkedin, icon: Linkedin },
];

export function Footer() {
  return (
    <footer className="relative z-10 bg-white text-zinc-900 overflow-hidden border-t border-zinc-100">
      {/* === Kaart van Oostende — geanimeerde achtergrond (ken-burns / drift) === */}
      <motion.div
        className="absolute inset-0 z-0 opacity-[0.09] pointer-events-none"
        style={{
          backgroundImage: 'url(/images/kaartoostende.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(0.5px)',
        }}
        animate={{
          scale: [1, 1.12, 1.06, 1],
          x: ['0%', '-2%', '2%', '0%'],
          y: ['0%', '1.5%', '-1.5%', '0%'],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        aria-hidden="true"
      />

      {/* ===== MAIN GRID ===== */}
      <div className="relative z-10 px-6 md:px-12 lg:px-24 pt-20 lg:pt-24 pb-14">
        {/*
          Drie kolommen in één grid met TWEE rijen:
            Rij 1 (auto)  — de small-caps labels op één horizontale lijn
            Rij 2 (1fr)   — de inhoud per kolom
          Hierdoor sluiten "OOSTENDE — 8400", "NAVIGATIE" en "KABINET"
          perfect aan op dezelfde top-as.
        */}
        <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-[auto_1fr] gap-x-12 lg:gap-x-16 gap-y-10 md:gap-y-12">

          {/* ── Rij 1: labels ───────────────────────────────────────── */}

          {/* Identity label — eyebrow uit de hero */}
          <div className="md:col-span-5 flex items-center gap-4">
            <div className="w-12 h-[2px] bg-red-600" />
            <span className="text-red-600 font-medium uppercase tracking-[0.2em] text-[11px]">
              Oostende — 8400
            </span>
          </div>

          <p className="md:col-span-3 text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400">
            Navigatie
          </p>

          <p className="md:col-span-4 text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400">
            Kabinet
          </p>

          {/* ── Rij 2: inhoud ───────────────────────────────────────── */}

          {/* Identity column */}
          <div className="md:col-span-5">
            {/* Logo block — mirrors Navbar */}
            <Link to="/" className="inline-flex items-center gap-4 group" aria-label="Fabrice Goffin — home">
              <div className="relative flex items-center justify-center w-10 h-10 bg-zinc-900 group-hover:bg-red-600 transition-colors duration-500">
                <span className="font-black text-sm tracking-tighter text-white">FG</span>
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-red-600 group-hover:bg-white transition-colors duration-500" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[13px] font-medium tracking-[0.2em] uppercase leading-none text-zinc-900">
                  Fabrice Goffin
                </span>
                <span className="text-[9px] font-medium tracking-[0.2em] uppercase leading-none mt-1.5 text-red-600">
                  Schepen — Stad Oostende
                </span>
              </div>
            </Link>

            <p className="mt-7 max-w-md text-zinc-600 leading-relaxed text-[15px]">
              Schepen van Dierenwelzijn, Digitalisering en Ontmoeting in Oostende.
              Hebt u een vraag, een idee of een bezorgdheid? Mijn kabinet staat open.
            </p>

            {/* Socials */}
            <div className="mt-8 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-zinc-200 text-zinc-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors duration-300"
                    aria-label={social.label}
                  >
                    <Icon className="w-[15px] h-[15px]" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <nav className="flex flex-col gap-3" aria-label="Footer navigatie">
              {footerLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-[14px] text-zinc-700 hover:text-red-600 transition-colors duration-200 w-max"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <ul className="flex flex-col gap-4 not-italic">
              <li>
                <a
                  href={contact.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-zinc-700 hover:text-zinc-900 transition-colors group"
                >
                  <MapPin className="w-4 h-4 mt-1 shrink-0 text-red-600 group-hover:scale-110 transition-transform" />
                  <span className="text-[14px] leading-snug">
                    {contact.address.line1}
                    <br />
                    {contact.address.line2}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-start gap-3 text-zinc-700 hover:text-zinc-900 transition-colors group"
                >
                  <Mail className="w-4 h-4 mt-1 shrink-0 text-zinc-400 group-hover:text-red-600 transition-colors" />
                  <span className="text-[14px]">{contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={contact.phoneHref}
                  className="flex items-start gap-3 text-zinc-700 hover:text-zinc-900 transition-colors group"
                >
                  <Phone className="w-4 h-4 mt-1 shrink-0 text-zinc-400 group-hover:text-red-600 transition-colors" />
                  <span className="text-[14px]">{contact.phoneDisplay}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ===== BOTTOM BAR ===== */}
      <div className="relative z-10 border-t border-zinc-200/80 bg-white/60 backdrop-blur-sm px-6 md:px-12 lg:px-24 py-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <p className="text-[12px] text-zinc-500 text-center md:text-left">
            © {new Date().getFullYear()} Fabrice Goffin. Alle rechten voorbehouden.
            <span className="hidden md:inline mx-2 text-zinc-300">·</span>
            <span className="block md:inline text-zinc-400">
              V.U. Fabrice Goffin, Vindictivelaan 1, 8400 Oostende
            </span>
          </p>

          <nav
            aria-label="Juridische informatie"
            className="flex items-center gap-x-5 gap-y-2 flex-wrap justify-center md:justify-end"
          >
            <Link
              to="/privacy"
              className="text-[12px] text-zinc-600 hover:text-red-600 transition-colors duration-200"
            >
              Privacybeleid
            </Link>
            <span aria-hidden="true" className="w-1 h-1 rounded-full bg-zinc-300" />
            <Link
              to="/voorwaarden"
              className="text-[12px] text-zinc-600 hover:text-red-600 transition-colors duration-200"
            >
              Algemene voorwaarden
            </Link>
            <span aria-hidden="true" className="w-1 h-1 rounded-full bg-zinc-300" />
            <Link
              to="/privacy#cookies"
              className="text-[12px] text-zinc-600 hover:text-red-600 transition-colors duration-200"
            >
              Cookies
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
