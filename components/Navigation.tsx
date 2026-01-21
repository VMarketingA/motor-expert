'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/lib/i18n';

export default function Navigation() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useI18n();

  const navLinks = [
    { href: '/', label: t('nav_home') },
    { href: '/about', label: t('nav_about') },
    { href: '/services', label: t('nav_services') },
    { href: '/calculator', label: t('nav_calculator') },
    { href: '/gallery', label: t('nav_gallery') },
    { href: '/reviews', label: t('nav_reviews') },
    { href: '/testimonials', label: t('nav_testimonials') },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-black z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-black">
            Мотор Эксперт
          </Link>

          <div className="hidden md:flex items-center space-x-8">
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

          <div className="flex items-center space-x-2">
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
        </div>
      </div>

      <div className="md:hidden border-t border-black">
        <div className="px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block py-2 text-sm font-medium ${
                pathname === link.href
                  ? 'text-[#003366]'
                  : 'text-black'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
