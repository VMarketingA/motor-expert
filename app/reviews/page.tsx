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

    const script = document.createElement('script');
    script.src = 'https://myreviews.dev/widget/dist/index.js';
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      const myReviewsInit = function () {
        if (window.myReviews) {
          new window.myReviews.BlockWallWidget({
            uuid: "0001b151-dbd2-4b3a-a6a3-803a61be8888",
            name: "g84447569",
            additionalFrame: "none",
            lang: "ru",
            widgetId: "1"
          }).init();
        }
      };

      if (document.readyState === "loading") {
        document.addEventListener('DOMContentLoaded', function () {
          myReviewsInit();
        });
      } else {
        myReviewsInit();
      }
    };

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [language]);

  return (
    <div className="pt-16">
      <div
        style={{
          height: 'calc(100vh - 80px)',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '8px',
          borderRadius: '0px'
        }}
        className="sm:rounded-[20px] sm:mt-5"
      >
        <iframe
          title="Виджет с отзывами «На всю страницу» от MyReviews"
          style={{
            maxWidth: '1180px',
            width: '100%',
            height: '100%',
            border: 'none',
            outline: 'none',
            padding: 0,
            margin: 0
          }}
          id="myReviews__block-widget"
        />
      </div>
    </div>
  );
}

declare global {
  interface Window {
    myReviews: {
      BlockWallWidget: new (config: {
        uuid: string;
        name: string;
        additionalFrame: string;
        lang: string;
        widgetId: string;
      }) => {
        init: () => void;
      };
    };
  }
}
