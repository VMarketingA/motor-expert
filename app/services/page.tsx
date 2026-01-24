'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { createSafeJsonLd } from '@/lib/security';

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
}

interface ServicesByCategory {
  [key: string]: Service[];
}

export default function Services() {
  const [bmwModels, setBmwModels] = useState<Model[]>([]);
  const [miniModels, setMiniModels] = useState<Model[]>([]);
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
      const [modelsResponse, servicesResponse] = await Promise.all([
        supabase
          .from('models')
          .select('*')
          .eq('is_active', true)
          .order('sort_order'),
        supabase
          .from('services')
          .select('*')
          .eq('is_active', true)
          .order('sort_order')
      ]);

      if (modelsResponse.error) {
        console.error('Error loading models:', modelsResponse.error);
      } else if (modelsResponse.data) {
        const bmw = modelsResponse.data.filter((m: Model) => m.brand === 'BMW');
        const mini = modelsResponse.data.filter((m: Model) => m.brand === 'MINI');
        setBmwModels(bmw);
        setMiniModels(mini);
      }

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

          <div className="mb-12 sm:mb-20">
            <h2 className="text-center mb-6 sm:mb-8 text-xl sm:text-2xl lg:text-3xl">{t('services_models_title')}</h2>

            <h3 className="mb-4 sm:mb-6 text-lg sm:text-xl font-semibold">{t('services_bmw')}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 mb-8 sm:mb-12">
              {bmwModels.map((model) => (
                <Link
                  key={model.id}
                  href={`/services/${model.model_id}`}
                  className="group border border-black overflow-hidden hover:border-[#003366] transition-colors"
                >
                  <div className="aspect-video overflow-hidden bg-gray-100">
                    <img
                      src={model.image}
                      alt={`ремонт ${model.name} Москва автосервис`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3 text-center font-semibold text-sm">
                    {model.name}
                  </div>
                </Link>
              ))}
            </div>

            <h3 className="mb-4 sm:mb-6 text-lg sm:text-xl font-semibold">{t('services_mini')}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
              {miniModels.map((model) => (
                <Link
                  key={model.id}
                  href={`/services/${model.model_id}`}
                  className="group border border-black overflow-hidden hover:border-[#003366] transition-colors"
                >
                  <div className="aspect-video overflow-hidden bg-gray-100">
                    <img
                      src={model.image}
                      alt={`ремонт ${model.name} Москва автосервис`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-2 sm:p-3 text-center font-semibold text-xs sm:text-sm">
                    {model.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-10 sm:space-y-16">
            {Object.entries(servicesByCategory).map(([category, services]) => (
              <div key={category}>
                <h2 className="mb-6 sm:mb-8 pb-3 sm:pb-4 border-b-2 border-black text-xl sm:text-2xl lg:text-3xl">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {services.map((service) => (
                    <div key={service.id} className="border border-black p-4 sm:p-6 flex flex-col">
                      <h3 className="mb-2 text-base sm:text-lg font-semibold">
                        {language === 'ru' ? service.name_ru : (service.name_en || service.name_ru)}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 mb-4 flex-grow">
                        {language === 'ru' ? service.description_ru : (service.description_en || service.description_ru)}
                      </p>
                      <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-black flex-wrap gap-2">
                        <span className="font-semibold text-base sm:text-lg">
                          {service.price_from === 0 ? t('services_free') : `${t('services_from')} ${service.price_from.toLocaleString('ru-RU')} ₽`}
                        </span>
                        <Link
                          href="/booking"
                          className="bg-[#003366] text-white px-3 sm:px-4 py-2 text-xs sm:text-sm hover:bg-[#004488] transition-colors"
                        >
                          {t('services_book')}
                        </Link>
                      </div>
                    </div>
                  ))}
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
