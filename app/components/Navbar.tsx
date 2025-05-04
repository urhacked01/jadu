'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import CustomTranslateWidget from './CustomTranslateWidget';
import { useLanguage } from '../context/LanguageContext';

const navigation = [
  { key: 'nav.home', href: '/' },
  { key: 'nav.bikes', href: '/bikes' },
  { key: 'nav.showrooms', href: '/showrooms' },
  { key: 'nav.about', href: '/about' },
  { key: 'nav.contact', href: '/contact' },
  { key: 'nav.testimonials', href: '/testimonials' },
  { key: 'nav.finance', href: '/finance-calculator' },
];

export default function Navbar() {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-white'
        }`}
      >
        <div className="container-custom">
          <nav className="flex items-center justify-between h-[72px]" aria-label="Global">
            <div className="flex-shrink-0 z-50">
              <Logo />
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                type="button"
                className="relative z-50 -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:text-primary"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">{mobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>

            {/* Desktop navigation */}
            <div className="hidden lg:flex lg:gap-x-8 items-center">
              {navigation.map(item => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="text-gray-700 hover:text-primary transition-colors font-medium text-sm"
                >
                  {t(item.key)}
                </Link>
              ))}
            </div>

            {/* Desktop CTA buttons and Language Switcher */}
            <div className="hidden lg:flex lg:items-center gap-4">
              <CustomTranslateWidget />
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          aria-hidden="true"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile menu panel */}
      <div
        className={`fixed inset-y-0 right-0 z-40 w-full overflow-y-auto bg-white px-6 py-6 lg:hidden transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="z-50">
            <Logo />
          </div>
          <div>
            <CustomTranslateWidget />
          </div>
        </div>

        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-200">
            <div className="space-y-2 py-6">
              {navigation.map(item => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t(item.key)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
