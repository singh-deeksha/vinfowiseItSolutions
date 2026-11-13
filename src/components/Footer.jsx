import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext.jsx';

export default function Footer() {
  const { company, navItems } = useSiteContent();

  return (
    <footer className="border-t border-white/10 bg-[#060a15] text-slate-300">
      <div className="container-wide grid gap-10 py-12 md:grid-cols-[1.25fr_0.8fr_1fr] md:py-16">
        <div>
          <Link to="/" className="inline-flex items-center gap-3">
            <img className="size-12 rounded-xl" src="/vinfowise-emblem.svg" alt="" />
            <span className="text-lg font-extrabold text-white">{company.name}</span>
          </Link>
          <p className="mt-4 max-w-sm leading-7 text-slate-400">{company.tagline}</p>
          <ul className="mt-6 space-y-3 text-sm text-slate-400">
            <li className="flex items-start gap-3"><Mail size={17} className="mt-0.5 shrink-0 text-cyan-300" /><a href={`mailto:${company.email}`} className="hover:text-white">{company.email}</a></li>
            <li className="flex items-start gap-3"><Phone size={17} className="mt-0.5 shrink-0 text-cyan-300" /><span>WhatsApp inquiry available from the contact page</span></li>
            <li className="flex items-start gap-3"><MapPin size={17} className="mt-0.5 shrink-0 text-cyan-300" /><span>{company.address}</span></li>
          </ul>
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="text-sm font-extrabold uppercase tracking-[0.16em] text-white">Quick Links</h2>
          <ul className="mt-5 grid grid-cols-2 gap-3 text-sm">
            {navItems.map(item => <li key={item.path}><Link to={item.path} className="text-slate-400 transition hover:text-cyan-200">{item.label}</Link></li>)}
          </ul>
          <div className="mt-7 flex gap-5 text-sm">
            <Link to="/privacy-policy" className="text-slate-400 hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="text-slate-400 hover:text-white">Terms</Link>
          </div>
        </nav>

        <div>
          <h2 className="text-sm font-extrabold uppercase tracking-[0.16em] text-white">Newsletter</h2>
          <p className="mt-5 text-sm leading-6 text-slate-400">Technology insights, automation ideas, and practical delivery guidance.</p>
          <form action={`mailto:${company.email}`} method="get" className="mt-5 flex gap-2">
            <input type="hidden" name="subject" value="Newsletter subscription" />
            <label className="sr-only" htmlFor="newsletter-email">Work email</label>
            <input id="newsletter-email" name="body" type="email" placeholder="Work email" required className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-300" />
            <button type="submit" className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-500">Join</button>
          </form>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-wide py-5 text-center text-xs text-slate-500 sm:text-left">
          © {new Date().getFullYear()} {company.name}. All rights reserved. Built and maintained by Vinfowise IT Solutions.
        </div>
      </div>
    </footer>
  );
}
