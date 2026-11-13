import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import Button from './Button';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  return (
    <header className="sticky top-0 z-50 border-b border-[#e3dfd1] bg-[#fffdf8]/95 backdrop-blur-xl">
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
            <span className="block truncate text-sm sm:text-base font-black leading-5 text-[#493a2e] max-w-[150px] xs:max-w-[200px] sm:max-w-none">
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
                      ? 'bg-[#e7ecdf] text-[#5f7255]'
                      : 'text-[#625543] hover:bg-[#f0f1e9] hover:text-[#9a752c]'
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
          {/* Start Project CTA Button */}
          <Button to="/contact" className="header-cta">
            Start Project
          </Button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            className="focus-ring inline-flex size-10 sm:size-11 items-center justify-center rounded-xl border border-[#ded8c8] bg-[#fffdf8] text-[#625543] lg:hidden"
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
          className="border-t border-[#e3dfd1] bg-[#fffdf8] p-4 shadow-xl lg:hidden"
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
                        ? 'bg-[#e7ecdf] text-[#5f7255]'
                        : 'text-[#625543] hover:bg-[#f0f1e9]'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              );
            })}
            <div className="mt-3 border-t border-[#ebe7dc] pt-3">
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
