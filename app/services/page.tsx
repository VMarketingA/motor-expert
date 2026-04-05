'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { createSafeJsonLd } from '@/lib/security';
import { getCategoryTranslationKey } from '@/lib/category-translator';

interface Model {
  id: string;
  model_id: string;
  name: string;
  brand: string;
  image: string;
  description: string;
}

interface Service {
  id: string;
  category: string;
  name_ru: string;
  name_en: string;
  description_ru: string;
  description_en: string;
  price_from: number;
  slug: string;
}

interface ServicesByCategory {
  [key: string]: Service[];
}

export default function Services() {
  const [servicesByCategory, setServicesByCategory] = useState<ServicesByCategory>({});
  const [loading, setLoading] = useState(true);

  const { t, language } = useI18n();

  useEffect(() => {
    if (language === 'ru') {
      document.title = 'Услуги ремонта BMW Москва — Автосервис Мотор Эксперт | Цены на ТО и обслуживание';
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Услуги автосервиса BMW в Москве: ТО, диагностика, замена масла от 1900₽, замена фильтров от 800₽, ремонт подвески от 1200₽. Гарантия 24 месяца ☎ +7-495-114-55-52');
      }
    } else {
      document.title = 'BMW Repair Services Moscow — Motor Expert Auto Service | Maintenance Prices';
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 'BMW auto service in Moscow: maintenance, diagnostics, oil change from 1900₽, filter replacement from 800₽, suspension repair from 1200₽. 24-month warranty ☎ +7-495-114-55-52');
      }
    }

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', 'https://motorexpert.ru/services');
    } else {
      const newCanonical = document.createElement('link');
      newCanonical.setAttribute('rel', 'canonical');
      newCanonical.setAttribute('href', 'https://motorexpert.ru/services');
      document.head.appendChild(newCanonical);
    }

    loadData();
  }, [language]);

  async function loadData() {
    if (!isSupabaseConfigured) {
      console.error('Supabase is not configured');
      setLoading(false);
      return;
    }

    try {
      const servicesResponse = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');

      if (servicesResponse.error) {
        console.error('Error loading services:', servicesResponse.error);
      } else if (servicesResponse.data) {
        const grouped: ServicesByCategory = {};
        servicesResponse.data.forEach((service: Service) => {
          if (!grouped[service.category]) {
            grouped[service.category] = [];
          }
          grouped[service.category].push(service);
        });
        setServicesByCategory(grouped);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl mb-4">{t('loading')}</div>
        </div>
      </div>
    );
  }

  const allServices = Object.values(servicesByCategory).flat();

  return (
    <div className="pt-16">
      <section className="bg-white py-8 sm:py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-center mb-6 sm:mb-8 text-2xl sm:text-3xl lg:text-5xl">{t('services_title')}</h1>
          <p className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 text-base sm:text-lg">
            {t('services_subtitle')}
          </p>

          <div className="space-y-10 sm:space-y-16">
            {Object.entries(servicesByCategory).map(([category, services]) => (
              <div key={category}>
                <h2 className="mb-6 sm:mb-8 pb-3 sm:pb-4 border-b-4 border-[#003366] text-xl sm:text-2xl lg:text-3xl">
                  {t(getCategoryTranslationKey(category))}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {services.map((service) => {
                    const serviceName = language === 'ru' ? service.name_ru : (service.name_en || service.name_ru);
                    const serviceDescription = language === 'ru' ? service.description_ru : (service.description_en || service.description_ru);

                    return (
                      <Link
                        key={service.id}
                        href={`/usluga/${service.slug}`}
                        className="border border-black p-4 sm:p-6 flex flex-col hover:border-[#003366] hover:shadow-lg transition-all group"
                      >
                        <h3 className="mb-3 text-base sm:text-lg font-semibold leading-tight group-hover:text-[#003366] transition-colors">
                          {serviceName}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-700 mb-4 flex-grow leading-relaxed">
                          {serviceDescription}
                        </p>
                        <div className="pt-4 border-t border-black">
                          <div className="font-bold text-lg sm:text-xl text-[#003366]">
                            {service.price_from === 0 ? t('services_free') : `${language === 'ru' ? 'от' : 'from'} ${service.price_from.toLocaleString('ru-RU')} ₽`}
                          </div>
                          <div className="mt-3 text-sm font-medium text-[#003366] group-hover:underline">
                            {language === 'ru' ? 'Подробнее →' : 'Learn more →'}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 sm:mt-16 text-center flex flex-col sm:flex-row gap-4 sm:gap-0 justify-center">
            <Link
              href="/calculator"
              className="inline-block bg-[#003366] text-white px-6 sm:px-8 py-3 sm:py-4 font-semibold hover:bg-[#004488] transition-colors sm:mr-4"
            >
              {t('services_calculate')}
            </Link>
            <Link
              href="/reviews"
              className="inline-block border-2 border-[#003366] text-[#003366] px-6 sm:px-8 py-3 sm:py-4 font-semibold hover:bg-[#003366] hover:text-white transition-colors"
            >
              {t('services_reviews')}
            </Link>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: createSafeJsonLd({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: allServices.map((service, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'Service',
                name: language === 'ru' ? service.name_ru : (service.name_en || service.name_ru),
                description: language === 'ru' ? service.description_ru : (service.description_en || service.description_ru),
                provider: {
                  '@type': 'AutoRepair',
                  name: 'Motor Expert',
                },
                areaServed: {
                  '@type': 'City',
                  name: 'Moscow',
                },
                offers: {
                  '@type': 'Offer',
                  price: service.price_from,
                  priceCurrency: 'RUB',
                },
              },
            })),
          }),
        }}
      />
    </div>
  );
}
