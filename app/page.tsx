'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { Phone, MapPin, Clock, Shield, Wrench, DollarSign } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { createSafeJsonLd } from '@/lib/security';

interface Service {
  id: string;
  name_ru: string;
  description_ru: string;
  price_from: number;
  category: string;
}

export default function Home() {
  const { t } = useI18n();
  const [popularServices, setPopularServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Ремонт BMW Москва — Автосервис Мотор Эксперт | Диагностика, ТО, ремонт двигателя';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Профессиональный ремонт BMW в Москве ⚡ Замена масла от 1000₽ ⚡ Ремонт двигателя от 80000₽ ⚡ Замена цепи ГРМ от 35000₽ ⚡ Гарантия 24 месяца ☎ +7-495-114-55-52');
    }

    loadServices();
  }, []);

  async function loadServices() {
    if (!isSupabaseConfigured) {
      console.error('Supabase is not configured');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('sort_order')
        .limit(7);

      if (error) {
        console.error('Error loading services:', error);
        setPopularServices([]);
      } else if (data) {
        setPopularServices(data.slice(0, 7));
      }
    } catch (error) {
      console.error('Error loading services:', error);
      setPopularServices([]);
    } finally {
      setLoading(false);
    }
  }

  const problems = [
    { title: t('problem_oil_title'), desc: t('problem_oil_desc') },
    { title: t('problem_timing_title'), desc: t('problem_timing_desc') },
    { title: t('problem_turbo_title'), desc: t('problem_turbo_desc') },
    { title: t('problem_vanos_title'), desc: t('problem_vanos_desc') },
  ];

  const advantages = [
    { icon: Shield, title: t('advantage_warranty'), desc: t('advantage_warranty_desc') },
    { icon: Wrench, title: t('advantage_parts'), desc: t('advantage_parts_desc') },
    { icon: DollarSign, title: t('advantage_price'), desc: t('advantage_price_desc') },
  ];

  return (
    <div className="pt-16">
      <section className="relative bg-white min-h-[600px] lg:min-h-[700px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="/image.png"
            alt="ремонт BMW Москва автосервис Мотор Эксперт диагностика"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-3xl">
            <h1 className="mb-8 text-5xl lg:text-6xl">Ремонт BMW в Москве — Автосервис Мотор Эксперт</h1>
            <p className="mb-6 text-xl leading-relaxed">
              Профессиональный ремонт и обслуживание BMW и MINI. Компьютерная диагностика, замена масла, ремонт двигателя, замена цепи ГРМ, ремонт турбин, ремонт подвески. Гарантия 24 месяца.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/services"
                className="inline-block bg-[#003366] text-white px-8 py-4 font-semibold hover:bg-[#004488] transition-colors"
              >
                Наши услуги
              </Link>
              <Link
                href="/booking"
                className="inline-block border-2 border-[#003366] text-[#003366] px-8 py-4 font-semibold hover:bg-[#003366] hover:text-white transition-colors"
              >
                Записаться на ремонт
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 border-t border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-12 text-3xl">Почему выбирают наш автосервис BMW в Москве</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <div key={index} className="text-center">
                <advantage.icon className="w-12 h-12 mx-auto mb-4" />
                <h3 className="mb-3">{advantage.title}</h3>
                <p className="text-sm">{advantage.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 border-t border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-12 text-3xl">Популярные услуги ремонта BMW</h2>
          {loading ? (
            <div className="text-center py-12">
              <div className="text-xl">Загрузка услуг...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularServices.map((service) => (
                <Link key={service.id} href="/services" className="border border-black p-6 hover:border-[#003366] transition-colors bg-white">
                  <h3 className="mb-3 text-lg font-semibold">{service.name_ru}</h3>
                  <p className="text-sm mb-4">{service.description_ru}</p>
                  <span className="text-[#003366] text-sm font-semibold">от {service.price_from.toLocaleString('ru-RU')} ₽ →</span>
                </Link>
              ))}
              <Link href="/reviews" className="border border-black p-6 hover:border-[#003366] transition-colors bg-white">
                <h3 className="mb-3 text-lg font-semibold">Отзывы клиентов</h3>
                <p className="text-sm mb-4">Более 500 довольных клиентов. Средняя оценка 5.0</p>
                <span className="text-[#003366] text-sm font-semibold">Читать отзывы →</span>
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="bg-white py-16 border-t border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-12 text-3xl">Частые проблемы BMW и их решение</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {problems.map((problem, index) => (
              <div key={index} className="border border-black p-6">
                <h3 className="mb-3 text-lg font-semibold">{problem.title}</h3>
                <p className="text-sm">{problem.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/calculator"
              className="inline-block bg-[#003366] text-white px-8 py-4 font-semibold hover:bg-[#004488] transition-colors"
            >
              Рассчитать стоимость ремонта
            </Link>
          </div>
        </div>
      </section>

      <section id="contacts" className="bg-white py-12 border-t border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-8">{t('contacts_title')}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="space-y-4">
              <div className="flex items-start">
                <Phone className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="mb-1 text-base">{t('contacts_phone')}</h3>
                  <a href="tel:+74951145552" className="text-[#003366] hover:underline text-sm">
                    +7-495-114-55-52
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="mb-1 text-base">{t('contacts_address')}</h3>
                  <p className="text-sm">{t('contacts_address_value')}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="mb-1 text-base">{t('contacts_schedule')}</h3>
                  <p className="text-sm">{t('contacts_schedule_value')}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <iframe
                src="https://yandex.com/map-widget/v1/?um=constructor%3A64d4b5c3c68b2a4c29f5a51f3e8a0d5e5b9a0c5f5b8c5d5e5f5a5b5c5d5e5f5a&ll=37.641109%2C55.703353&z=17&indoorLevel=1"
                width="100%"
                height="250"
                frameBorder="0"
                className="border border-black"
              ></iframe>
              <a
                href="https://yandex.com/maps/org/bmv_motor_ekspert/33792368754/?indoorLevel=1&ll=37.641109%2C55.703353&z=17.06"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-[#003366] hover:underline text-sm"
              >
                Открыть на Яндекс Картах
              </a>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: createSafeJsonLd({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            '@id': 'https://motorexpert.ru',
            name: 'Мотор Эксперт',
            alternateName: 'Автосервис BMW Мотор Эксперт',
            description: 'Профессиональный ремонт и обслуживание BMW и MINI в Москве. Компьютерная диагностика, замена масла, ремонт двигателя, замена цепи ГРМ, ремонт турбин, ремонт подвески. Гарантия 24 месяца.',
            image: '/image.png',
            logo: '/image.png',
            url: 'https://motorexpert.ru',
            telephone: '+7-495-114-55-52',
            priceRange: '₽₽₽',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Автозаводская ул., 23, корп. 7',
              addressLocality: 'Москва',
              addressRegion: 'Москва',
              postalCode: '115280',
              addressCountry: 'RU',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 55.703353,
              longitude: 37.641109,
            },
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                opens: '09:00',
                closes: '21:00',
              },
            ],
            areaServed: {
              '@type': 'City',
              name: 'Москва',
              '@id': 'https://www.wikidata.org/wiki/Q649',
            },
            serviceType: ['Ремонт BMW', 'Ремонт MINI', 'Диагностика BMW', 'ТО BMW', 'Замена масла BMW', 'Ремонт двигателя BMW', 'Замена цепи ГРМ BMW', 'Ремонт турбины BMW', 'Ремонт подвески BMW', 'Шиномонтаж BMW'],
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Услуги по ремонту BMW',
              itemListElement: popularServices.map((service, index) => ({
                '@type': 'Offer',
                position: index + 1,
                price: service.price_from,
                priceCurrency: 'RUB',
                availability: 'https://schema.org/InStock',
                priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
                itemOffered: {
                  '@type': 'Service',
                  name: service.name_ru,
                  description: service.description_ru,
                  serviceType: service.name_ru,
                  areaServed: {
                    '@type': 'City',
                    name: 'Москва',
                  },
                },
              })),
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '5.0',
              reviewCount: '500',
              bestRating: '5',
              worstRating: '1',
            },
          }),
        }}
      />
    </div>
  );
}
