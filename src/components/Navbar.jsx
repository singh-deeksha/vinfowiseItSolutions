import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useSiteContent } from '../context/SiteContentContext';
import Button from './Button';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();
  const { company, navItems, serviceDetails } = useSiteContent();

  const isServiceDetailPage = Object.keys(serviceDetails || {}).some(
    slug => pathname === `/${slug}`
  );

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/90">
      <div className="container-wide flex min-h-20 items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo & Name */}
        <Link
          to="/"
          onClick={() => setMobileMenuOpen(false)}
          className="focus-ring flex min-w-0 shrink items-center gap-2.5 sm:gap-3 rounded-md"
        >
          <img
            className="size-10 sm:size-11 shrink-0 rounded-xl ring-1 ring-white/10"
            src="/vinfowise-emblem.svg"
            alt="Vinfowise IT Solutions logo"
          />
          <span className="min-w-0">
            <span className="block truncate text-sm sm:text-base font-black leading-5 text-slate-950 dark:text-white max-w-[150px] xs:max-w-[200px] sm:max-w-none">
              {company.name}
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navItems.map(item => {
            const isServicesActive = item.path === '/services' && (pathname === '/services' || isServiceDetailPage);
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-sm font-semibold transition lg:whitespace-nowrap ${
                    isActive || isServicesActive
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-400/10 dark:text-blue-200'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-blue-700 dark:text-slate-200 dark:hover:bg-white/5 dark:hover:text-blue-200'
                  }`
                }
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Right Action Controls */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          {/* Theme Toggle Button */}
          <button
            type="button"
            className="focus-ring inline-flex size-10 sm:size-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-800 transition hover:border-blue-400 hover:text-blue-700 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:text-blue-200"
            onClick={toggleTheme}
            aria-label="Toggle color mode"
          >
            {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          {/* Start Project CTA Button */}
          <Button to="/contact" className="header-cta">
            Start Project
          </Button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            className="focus-ring inline-flex size-10 sm:size-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-800 lg:hidden dark:border-white/10 dark:bg-white/5 dark:text-white"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-controls="mobile-navigation"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-slate-200 bg-white p-4 shadow-xl lg:hidden dark:border-white/10 dark:bg-slate-950"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {navItems.map(item => {
              const isServicesActive = item.path === '/services' && (pathname === '/services' || isServiceDetailPage);
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg px-4 py-3 text-base font-semibold transition ${
                      isActive || isServicesActive
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-400/15 dark:text-blue-200'
                        : 'text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/5'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              );
            })}
            <div className="mt-3 border-t border-slate-100 pt-3 dark:border-white/10">
              <Button to="/contact" className="w-full justify-center">
                Start Project
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
