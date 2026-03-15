'use client';

import { useEffect } from 'react';
import { useI18n } from '@/lib/i18n';

export default function Reviews() {
  const { language } = useI18n();

  useEffect(() => {
    if (language === 'ru') {
      document.title = 'Отзывы о ремонте BMW Москва — Автосервис Мотор Эксперт | Реальные отзывы клиентов';
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Отзывы клиентов о ремонте и обслуживании BMW в автосервисе Мотор Эксперт Москва. Реальные отзывы о качестве работ, ценах и сервисе. Средняя оценка 5.0 звезд ☎ +7-495-114-55-52');
      }
    } else {
      document.title = 'BMW Repair Reviews Moscow — Motor Expert Auto Service | Real Customer Reviews';
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Customer reviews for BMW repair and maintenance at Motor Expert Auto Service Moscow. Real reviews about work quality, prices and service. Average rating 5.0 stars ☎ +7-495-114-55-52');
      }
    }

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', 'https://motorexpert.ru/reviews');
    } else {
      const newCanonical = document.createElement('link');
      newCanonical.setAttribute('rel', 'canonical');
      newCanonical.setAttribute('href', 'https://motorexpert.ru/reviews');
      document.head.appendChild(newCanonical);
    }
  }, [language]);

  return (
    <div className="pt-16">
      <section className="bg-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-center mb-6 sm:mb-8 text-2xl sm:text-3xl lg:text-5xl">
            {language === 'ru' ? 'Отзывы наших клиентов' : 'Customer Reviews'}
          </h1>
          <p className="text-center max-w-3xl mx-auto mb-10 text-base sm:text-lg text-gray-600">
            {language === 'ru'
              ? 'Реальные отзывы клиентов о ремонте и обслуживании BMW в нашем автосервисе'
              : 'Real customer reviews about BMW repair and maintenance at our service center'}
          </p>

          <div className="flex justify-center">
            <div
              style={{
                width: '100%',
                maxWidth: '560px',
                height: '800px',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              <iframe
                style={{
                  width: '100%',
                  height: '100%',
                  border: '1px solid #e6e6e6',
                  borderRadius: '8px',
                  boxSizing: 'border-box'
                }}
                src="https://yandex.ru/maps-reviews-widget/33792368754?comments"
                title="Отзывы на Яндекс.Картах"
              />
              <a
                href="https://yandex.com/maps/org/bmv_motor_ekspert/33792368754/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  boxSizing: 'border-box',
                  textDecoration: 'none',
                  color: '#b3b3b3',
                  fontSize: '10px',
                  fontFamily: 'YS Text, sans-serif',
                  padding: '0 20px',
                  position: 'absolute',
                  bottom: '8px',
                  width: '100%',
                  textAlign: 'center',
                  left: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: 'block',
                  maxHeight: '14px',
                  whiteSpace: 'nowrap'
                }}
              >
                БМВ Мотор Эксперт на карте Москвы — Яндекс Карты
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
