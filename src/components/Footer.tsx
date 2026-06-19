import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { contact } from '../data/contact';

const footerLinks = [
  { path: '/', label: 'Home' },
  { path: '/over', label: 'Over Mij' },
  { path: '/standpunten', label: 'Standpunten' },
  { path: '/doelen', label: 'Doelen' },
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
    <footer className="relative z-10 bg-[#0f172a] border-t border-slate-800 text-slate-300 overflow-hidden">
      {/* Subtle top glow line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-600/50 to-transparent"></div>
      
      {/* Main Footer Content */}
      <div className="px-6 md:px-12 lg:px-24 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">

          {/* Identity Column */}
          <div className="md:col-span-5">
            <p className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Fabrice <span className="text-red-500">Goffin.</span>
            </p>
            <p className="mt-5 text-slate-400 leading-relaxed max-w-sm text-sm font-medium">
              Schepen van Dierenwelzijn, Digitalisering &amp; Ontmoeting in Oostende. Samen maken we van Oostende de meest diervriendelijke stad van Vlaanderen.
            </p>
            <div className="flex gap-3 mt-8">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <MagneticButton key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-11 h-11 rounded-full bg-slate-800/40 border border-slate-700/50 text-slate-400 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 transition-all duration-300 shadow-sm group"
                      aria-label={social.label}
                    >
                      <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                    </a>
                  </MagneticButton>
                );
              })}
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-6">Navigatie</p>
            <nav className="flex flex-col gap-4" aria-label="Footer navigatie">
              {footerLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm font-medium text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-300 w-max"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-6">Contact</p>
            <div className="flex flex-col gap-5">
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-4 text-slate-400 hover:text-white transition-colors group w-max"
              >
                <span className="flex items-center justify-center w-11 h-11 rounded-full bg-slate-800/40 border border-slate-700/50 group-hover:bg-red-500/10 group-hover:border-red-500/30 group-hover:text-red-400 transition-all duration-300 shadow-sm">
                  <Mail className="w-4 h-4" />
                </span>
                <span className="text-sm font-medium">{contact.email}</span>
              </a>
              <a
                href={contact.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-slate-400 hover:text-white transition-colors group w-max"
              >
                <span className="flex items-center justify-center w-11 h-11 rounded-full bg-slate-800/40 border border-slate-700/50 group-hover:bg-red-500/10 group-hover:border-red-500/30 group-hover:text-red-400 transition-all duration-300 shadow-sm">
                  <MapPin className="w-4 h-4" />
                </span>
                <span className="text-sm font-medium">{contact.address.line1}<br />{contact.address.line2}</span>
              </a>
              <a
                href={contact.phoneHref}
                className="flex items-center gap-4 text-slate-400 hover:text-white transition-colors group w-max"
              >
                <span className="flex items-center justify-center w-11 h-11 rounded-full bg-slate-800/40 border border-slate-700/50 group-hover:bg-red-500/10 group-hover:border-red-500/30 group-hover:text-red-400 transition-all duration-300 shadow-sm">
                  <Phone className="w-4 h-4" />
                </span>
                <span className="text-sm font-medium">{contact.phoneDisplay}</span>
              </a>
            </div>


          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800/80 px-6 md:px-12 lg:px-24 py-6 bg-[#0B1120]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-medium text-slate-500 text-center md:text-left">
            © {new Date().getFullYear()} Fabrice Goffin. Alle rechten voorbehouden.
          </p>

          <nav
            aria-label="Juridische informatie"
            className="flex items-center gap-x-5 gap-y-2 flex-wrap justify-center"
          >
            <Link
              to="/privacy"
              className="text-xs font-semibold text-slate-400 hover:text-white transition-colors duration-300"
            >
              Privacybeleid
            </Link>
            <span aria-hidden="true" className="w-1 h-1 rounded-full bg-slate-700"></span>
            <Link
              to="/voorwaarden"
              className="text-xs font-semibold text-slate-400 hover:text-white transition-colors duration-300"
            >
              Algemene voorwaarden
            </Link>
            <span aria-hidden="true" className="w-1 h-1 rounded-full bg-slate-700"></span>
            <Link
              to="/privacy#cookies"
              className="text-xs font-semibold text-slate-400 hover:text-white transition-colors duration-300"
            >
              Cookies
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
