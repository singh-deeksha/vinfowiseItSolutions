import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ShieldCheck, Linkedin, Instagram, Facebook } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';

export default function Footer() {
  const { company, navItems, services } = useSiteContent();

  return (
    <footer className="border-t border-slate-200/80 bg-slate-900 text-slate-300 dark:border-white/10 dark:bg-slate-950">
      <div className="container-wide py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="focus-ring inline-flex items-center gap-3">
              <img
                className="size-11 rounded-xl ring-1 ring-white/10"
                src="/vinfowise-emblem.svg"
                alt="Vinfowise IT Solutions logo"
              />
              <span className="text-xl font-bold text-white">{company.name}</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              {company.tagline} We specialize in responsive web development, custom software applications, AI automation, QA testing, and cloud infrastructure for modern growing businesses.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {company.social?.LinkedIn && (
                <a
                  href={company.social.LinkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring flex size-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-800/80 text-slate-300 transition hover:border-blue-500 hover:text-white"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              )}
              {company.social?.Instagram && (
                <a
                  href={company.social.Instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring flex size-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-800/80 text-slate-300 transition hover:border-blue-500 hover:text-white"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
              )}
              {company.social?.Facebook && (
                <a
                  href={company.social.Facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring flex size-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-800/80 text-slate-300 transition hover:border-blue-500 hover:text-white"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Navigation</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navItems.map(item => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-slate-400 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Deep Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Services</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.slice(0, 7).map(service => (
                <li key={service.path}>
                  <Link
                    to={service.path}
                    className="text-slate-400 transition hover:text-white"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details & Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Get in Touch</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <Mail size={16} className="mt-0.5 shrink-0 text-blue-400" />
                <a href={`mailto:${company.email}`} className="hover:text-white break-all">
                  {company.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-blue-400" />
                <span>{company.serviceArea} (Remote & In-person)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <ShieldCheck size={16} className="mt-0.5 shrink-0 text-blue-400" />
                <span>NDA-friendly & GDPR-ready</span>
              </li>
            </ul>

            <div className="mt-6 border-t border-slate-800 pt-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Legal</h4>
              <div className="mt-2 flex gap-4 text-xs">
                <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-white">Terms of Service</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Built with precision for enterprise performance</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
