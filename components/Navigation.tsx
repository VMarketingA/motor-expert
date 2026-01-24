'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/lib/i18n';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: '/', label: t('nav_home') },
    { href: '/about', label: t('nav_about') },
    { href: '/services', label: t('nav_services') },
    { href: '/calculator', label: t('nav_calculator') },
    { href: '/gallery', label: t('nav_gallery') },
    { href: '/reviews', label: t('nav_reviews') },
    { href: '/testimonials', label: t('nav_testimonials') },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-black z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-black">
            Мотор Эксперт
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-[#003366]'
                    : 'text-black hover:text-[#003366]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2">
              <button
                onClick={() => setLanguage('ru')}
                className={`px-2 py-1 text-sm font-medium ${
                  language === 'ru' ? 'text-[#003366]' : 'text-black'
                }`}
              >
                RU
              </button>
              <span className="text-black">|</span>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 text-sm font-medium ${
                  language === 'en' ? 'text-[#003366]' : 'text-black'
                }`}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-black hover:text-[#003366]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`lg:hidden fixed inset-0 top-16 bg-white z-40 transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full overflow-y-auto px-4 py-8">
          <div className="space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className={`block text-2xl font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-[#003366]'
                    : 'text-black hover:text-[#003366]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-black">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  setLanguage('ru');
                }}
                className={`px-4 py-2 text-lg font-medium ${
                  language === 'ru' ? 'text-[#003366]' : 'text-black'
                }`}
              >
                RU
              </button>
              <span className="text-black text-lg">|</span>
              <button
                onClick={() => {
                  setLanguage('en');
                }}
                className={`px-4 py-2 text-lg font-medium ${
                  language === 'en' ? 'text-[#003366]' : 'text-black'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
