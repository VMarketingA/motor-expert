'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { useSiteSettings } from '@/hooks/use-site-settings';
import { Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const { t, language } = useI18n();
  const { settings } = useSiteSettings();

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
    <footer className="bg-white border-t border-black mt-8 sm:mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">{settings.company_name || 'Мотор Эксперт'}</h3>
            <p className="text-xs sm:text-sm mb-4">
              {t('footer_description')}
            </p>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">{t('contacts_title')}</h3>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                <a href={`tel:${settings.phone}`} className="hover:text-[#003366]">
                  {settings.phone_display || settings.phone || '+7-495-114-55-52'}
                </a>
              </div>
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                <span>{settings.address_full || t('contacts_address_value')}</span>
              </div>
            </div>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-[#003366]">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                </svg>
              </a>
              <a href="https://vk.com/bmwmotorexpert" target="_blank" rel="noopener noreferrer" className="hover:text-[#003366]">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.785 16.241s.288-.032.436-.194c.136-.148.131-.427.131-.427s-.019-1.304.58-1.496c.59-.189 1.348 1.26 2.152 1.818.607.422 1.068.329 1.068.329l2.146-.03s1.122-.07.59-.963c-.044-.073-.31-.659-1.597-1.863-1.348-1.26-1.168-1.056.456-3.235.99-1.328 1.386-2.139 1.263-2.486-.117-.332-.842-.244-.842-.244l-2.416.015s-.179-.025-.312.056c-.13.079-.214.265-.214.265s-.383 1.03-.892 1.907c-1.073 1.85-1.503 1.948-1.679 1.833-.408-.267-.306-1.073-.306-1.645 0-1.788.268-2.533-.522-2.725-.263-.064-.456-.106-1.128-.113-.862-.009-1.591.003-2.004.207-.275.136-.487.439-.358.456.16.022.522.099.714.362.248.341.239 1.107.239 1.107s.143 2.105-.333 2.365c-.328.179-.776-.186-1.74-1.86-.493-.853-.866-1.798-.866-1.798s-.072-.178-.2-.273c-.155-.115-.371-.151-.371-.151l-2.296.015s-.345.01-.472.161c-.113.134-.009.411-.009.411s1.804 4.268 3.845 6.418c1.873 1.973 4.007 1.844 4.007 1.844h.968z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">{t('footer_navigation')}</h3>
            <div className="space-y-2 text-xs sm:text-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block hover:text-[#003366]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-black mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm space-y-2">
          <div className="flex justify-center items-center gap-4">
            <Link
              href={language === 'ru' ? '/privacy-policy' : '/privacy-policy-en'}
              className="hover:text-[#003366] transition-colors"
            >
              {t('footer_privacy_policy')}
            </Link>
          </div>
          <p>&copy; 2017-2026 {settings.company_name || 'Мотор Эксперт'}. {t('footer_rights')}</p>
          <p>{t('footer_developed')}</p>
        </div>
      </div>
    </footer>
  );
}
