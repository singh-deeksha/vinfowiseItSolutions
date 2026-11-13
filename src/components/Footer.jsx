import { Link } from 'react-router-dom';
import { Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext.jsx';

export default function Footer() {
  const { company, navItems } = useSiteContent();

  return (
    <footer className="border-t border-[#e3dfd1] bg-[#eeefe7] text-[#625543]">
      <div className="container-wide grid gap-10 py-12 lg:grid-cols-[1.25fr_0.8fr_1fr] lg:py-16">
        <div>
          <Link to="/" className="inline-flex items-center gap-3">
            <img className="size-12 rounded-xl" src="/vinfowise-emblem.svg" alt="" />
            <span className="text-lg font-extrabold text-[#493a2e]">{company.name}</span>
          </Link>
          <p className="mt-4 max-w-sm leading-7 text-[#786d5e]">{company.tagline}</p>
          <ul className="mt-6 space-y-3 text-sm text-[#786d5e]">
            <li className="flex items-start gap-3"><Mail size={17} className="mt-0.5 shrink-0 text-[#8c794d]" /><a href={`mailto:${company.email}`} className="hover:text-[#493a2e]">{company.email}</a></li>
            <li className="flex items-start gap-3"><Phone size={17} className="mt-0.5 shrink-0 text-[#8c794d]" /><span>WhatsApp inquiry available from the contact page</span></li>
            <li className="flex items-start gap-3"><MapPin size={17} className="mt-0.5 shrink-0 text-[#8c794d]" /><span>{company.address}</span></li>
            <li className="flex items-start gap-3"><Linkedin size={17} className="mt-0.5 shrink-0 text-[#54868d]" /><a href={company.social.LinkedIn} target="_blank" rel="noreferrer" className="hover:text-[#46797e]">LinkedIn</a></li>
          </ul>
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#493a2e]">Quick Links</h2>
          <ul className="mt-5 grid grid-cols-2 gap-3 text-sm">
            {navItems.map(item => <li key={item.path}><Link to={item.path} className="text-[#786d5e] transition hover:text-[#71582d]">{item.label}</Link></li>)}
          </ul>
          <div className="mt-7 flex gap-5 text-sm">
            <Link to="/privacy-policy" className="text-[#786d5e] hover:text-[#71582d]">Privacy Policy</Link>
            <Link to="/cookie-policy" className="text-[#786d5e] hover:text-[#71582d]">Cookie Policy</Link>
            <Link to="/terms" className="text-[#786d5e] hover:text-[#71582d]">Terms</Link>
          </div>
        </nav>

        <div>
          <h2 className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#493a2e]">Newsletter</h2>
          <p className="mt-5 text-sm leading-6 text-[#786d5e]">Technology insights, automation ideas, and practical delivery guidance.</p>
          <form action={`mailto:${company.email}`} method="get" className="mt-5 grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
            <input type="hidden" name="subject" value="Newsletter subscription" />
            <label className="sr-only" htmlFor="newsletter-email">Work email</label>
            <input id="newsletter-email" name="body" type="email" placeholder="Work email" required className="min-w-0 rounded-xl border border-[#ded8c8] bg-[#fffdf8] px-4 py-3 text-sm text-[#493a2e] outline-none placeholder:text-[#8c8375] focus:border-[#c49339]" />
            <button type="submit" className="rounded-xl bg-[#c6953b] px-4 py-3 text-sm font-bold text-[#fffdf8] transition hover:bg-[#b98731]">Join</button>
            <label className="flex items-start gap-2 text-xs leading-5 text-[#786d5e] sm:col-span-2">
              <input type="checkbox" name="consent" value="yes" required className="mt-1 size-3.5 shrink-0 accent-[#54868d]" />
              <span>I agree to be contacted with Vinfowise updates. <Link to="/privacy-policy" className="underline underline-offset-2">Privacy Policy</Link>.</span>
            </label>
          </form>
        </div>
      </div>
      <div className="border-t border-[#e3dfd1]">
        <div className="container-wide py-5 text-center text-xs text-[#817766] sm:text-left">
          © {new Date().getFullYear()} {company.name}. All rights reserved. Built and maintained by Vinfowise IT Solutions.
        </div>
      </div>
    </footer>
  );
}
