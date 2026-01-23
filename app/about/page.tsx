'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { useSiteSettings } from '@/hooks/use-site-settings';
import { useEffect } from 'react';

export default function About() {
  const { t, language } = useI18n();
  const { settings, loading } = useSiteSettings();

  useEffect(() => {
    if (settings.address_full) {
      if (language === 'ru') {
        document.title = `О нас — Автосервис BMW ${settings.company_name} Москва | Ремонт БМВ`;
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute('content', `Автосервис BMW ${settings.company_name} в Москве. Профессиональный ремонт и обслуживание BMW и MINI. Гарантия 24 месяца. ${settings.address_full}. ${settings.work_hours}.`);
        }
      } else {
        document.title = `About Us — BMW Auto Service ${settings.company_name} Moscow | BMW Repair`;
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute('content', `BMW auto service ${settings.company_name} in Moscow. Professional BMW and MINI repair and maintenance. 24-month warranty. ${settings.address_full}. ${settings.work_hours}.`);
        }
      }
    }

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', 'https://motorexpert.ru/about');
    } else {
      const newCanonical = document.createElement('link');
      newCanonical.setAttribute('rel', 'canonical');
      newCanonical.setAttribute('href', 'https://motorexpert.ru/about');
      document.head.appendChild(newCanonical);
    }
  }, [settings, language]);

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-xl">{t('loading')}</div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-center mb-12 text-4xl lg:text-5xl">
            {settings.company_full_name || t('about_title')}
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed mb-6">
              {settings.company_description || t('about_text')}
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-8">{t('about_our_services')}</h2>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>{t('about_service_1')}</li>
              <li>{t('about_service_2')}</li>
              <li>{t('about_service_3')}</li>
              <li>{t('about_service_4')}</li>
              <li>{t('about_service_5')}</li>
              <li>{t('about_service_6')}</li>
              <li>{t('about_service_7')}</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 mt-8">{t('about_models_title')}</h2>
            <p className="text-base leading-relaxed mb-6">
              {t('about_models_text')}
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-8">{t('about_contacts_title')}</h2>
            <p className="text-base leading-relaxed mb-4">
              <strong>{t('contacts_address')}:</strong> {settings.address_full} {settings.address_note && `(${settings.address_note})`}
            </p>
            <p className="text-base leading-relaxed mb-4">
              <strong>{t('contacts_phone')}:</strong> <a href={`tel:${settings.phone}`} className="text-[#003366] hover:underline">{settings.phone_display || settings.phone}</a>
            </p>
            <p className="text-base leading-relaxed mb-8">
              <strong>{t('contacts_schedule')}:</strong> {settings.work_hours}
            </p>

            <div className="text-center mt-12">
              <Link
                href="/services"
                className="inline-block bg-[#003366] text-white px-8 py-4 text-lg font-semibold hover:bg-[#004488] transition-colors mr-4"
              >
                {t('nav_services')}
              </Link>
              <Link
                href="/booking"
                className="inline-block border-2 border-[#003366] text-[#003366] px-8 py-4 text-lg font-semibold hover:bg-[#003366] hover:text-white transition-colors"
              >
                {t('hero_cta')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
