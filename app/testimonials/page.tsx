'use client';

import { useEffect } from 'react';
import { useI18n } from '@/lib/i18n';

export default function Testimonials() {
  const { t } = useI18n();

  useEffect(() => {
    document.title = 'Благодарности клиентов — Ремонт BMW Москва | Мотор Эксперт';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Благодарности от клиентов автосервиса BMW Мотор Эксперт в Москве. Профессиональный ремонт и обслуживание BMW и MINI. Гарантия 24 месяца ☎ +7-495-114-55-52');
    }

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', 'https://motorexpert.ru/testimonials');
    } else {
      const newCanonical = document.createElement('link');
      newCanonical.setAttribute('rel', 'canonical');
      newCanonical.setAttribute('href', 'https://motorexpert.ru/testimonials');
      document.head.appendChild(newCanonical);
    }
  }, []);

  return (
    <div className="pt-16">
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-center mb-12">{t('testimonials_title')}</h1>

          <div className="text-center py-12">
            <p className="text-xl">
              Скоро здесь появятся благодарности
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
