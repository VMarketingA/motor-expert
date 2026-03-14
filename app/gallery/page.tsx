'use client';

import { useEffect } from 'react';
import { useI18n } from '@/lib/i18n';

export default function Gallery() {
  const { t, language } = useI18n();

  useEffect(() => {
    if (language === 'ru') {
      document.title = 'Галерея работ — Ремонт BMW Москва | Автосервис Мотор Эксперт';
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Фото наших работ по ремонту и обслуживанию BMW в Москве. Диагностика, замена цепи ГРМ, ремонт двигателя, ремонт турбины, ремонт подвески. Автосервис Мотор Эксперт ☎ +7-495-114-55-52');
      }
    } else {
      document.title = 'Work Gallery — BMW Repair Moscow | Motor Expert Auto Service';
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Photos of our BMW repair and maintenance work in Moscow. Diagnostics, timing chain replacement, engine repair, turbo repair, suspension repair. Motor Expert Auto Service ☎ +7-495-114-55-52');
      }
    }

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', 'https://motorexpert.ru/gallery');
    } else {
      const newCanonical = document.createElement('link');
      newCanonical.setAttribute('rel', 'canonical');
      newCanonical.setAttribute('href', 'https://motorexpert.ru/gallery');
      document.head.appendChild(newCanonical);
    }
  }, [language]);

  return (
    <div className="pt-16">
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-center mb-12">{t('gallery_title')}</h1>

          <div className="text-center py-20">
            <p className="text-2xl text-slate-600">
              {language === 'ru' ? 'Скоро здесь появятся наши работы' : 'Our work will appear here soon'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
