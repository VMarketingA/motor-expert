'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { bmwModels, miniModels } from '@/lib/modelData';
import { maintenanceServices, engineServices, suspensionServices } from '@/lib/servicesData';
import { useEffect } from 'react';

export default function Services() {
  useEffect(() => {
    document.title = 'Услуги ремонта BMW Москва — цены на обслуживание';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Ремонт бмв москва, автосервис бмв москва, ремонт двигателя бмв москва. Замена масла от 2500₽, ремонт двигателя от 80000₽, замена цепи ГРМ от 35000₽. Гарантия 12 месяцев');
    }
  }, []);

  const { t } = useI18n();

  return (
    <div className="pt-16">
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-center mb-8 text-4xl lg:text-5xl">Услуги по ремонту и обслуживанию BMW в Москве</h1>
          <p className="text-center max-w-3xl mx-auto mb-16 text-lg">
            Профессиональный автосервис BMW Москва. Ремонт двигателя, замена цепи ГРМ, ремонт турбин, диагностика, ремонт подвески. Работаем со всеми моделями BMW и MINI. Гарантия 12 месяцев.
          </p>

          <div className="mb-20">
            <h2 className="text-center mb-8 text-3xl">Ремонт BMW по моделям в Москве</h2>

            <h3 className="mb-6 text-xl font-semibold">Ремонт BMW</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
              {bmwModels.map((model) => (
                <Link
                  key={model.id}
                  href={`/services/${model.id}`}
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

            <h3 className="mb-6 text-xl font-semibold">Ремонт MINI</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {miniModels.map((model) => (
                <Link
                  key={model.id}
                  href={`/services/${model.id}`}
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
          </div>

          <div className="space-y-16">
            <div>
              <h2 className="mb-8 pb-4 border-b-2 border-black text-3xl">Обслуживание BMW Москва</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {maintenanceServices.map((service, index) => (
                  <div key={index} className="border border-black p-6 flex flex-col">
                    <h3 className="mb-2 text-lg font-semibold">{service.name}</h3>
                    <p className="text-sm text-gray-600 mb-4 flex-grow">{service.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-black">
                      <span className="font-semibold text-lg">от {service.price ? service.price.toLocaleString('ru-RU') : 0} ₽</span>
                      <Link
                        href="/booking"
                        className="bg-[#003366] text-white px-4 py-2 text-sm hover:bg-[#004488] transition-colors"
                      >
                        {t('services_book')}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-8 pb-4 border-b-2 border-black text-3xl">Ремонт двигателя BMW Москва</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {engineServices.map((service, index) => (
                  <div key={index} className="border border-black p-6 flex flex-col">
                    <h3 className="mb-2 text-lg font-semibold">{service.name}</h3>
                    <p className="text-sm text-gray-600 mb-4 flex-grow">{service.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-black">
                      <span className="font-semibold text-lg">от {service.price ? service.price.toLocaleString('ru-RU') : 0} ₽</span>
                      <Link
                        href="/booking"
                        className="bg-[#003366] text-white px-4 py-2 text-sm hover:bg-[#004488] transition-colors"
                      >
                        {t('services_book')}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-8 pb-4 border-b-2 border-black text-3xl">Ремонт подвески BMW Москва</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {suspensionServices.map((service, index) => (
                  <div key={index} className="border border-black p-6 flex flex-col">
                    <h3 className="mb-2 text-lg font-semibold">{service.name}</h3>
                    <p className="text-sm text-gray-600 mb-4 flex-grow">{service.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-black">
                      <span className="font-semibold text-lg">от {service.price ? service.price.toLocaleString('ru-RU') : 0} ₽</span>
                      <Link
                        href="/booking"
                        className="bg-[#003366] text-white px-4 py-2 text-sm hover:bg-[#004488] transition-colors"
                      >
                        {t('services_book')}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/calculator"
              className="inline-block bg-[#003366] text-white px-8 py-4 font-semibold hover:bg-[#004488] transition-colors mr-4"
            >
              Рассчитать стоимость
            </Link>
            <Link
              href="/reviews"
              className="inline-block border-2 border-[#003366] text-[#003366] px-8 py-4 font-semibold hover:bg-[#003366] hover:text-white transition-colors"
            >
              Отзывы клиентов
            </Link>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: [
              ...maintenanceServices.map((service, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                  '@type': 'Service',
                  name: service.name,
                  description: service.description,
                  provider: {
                    '@type': 'AutoRepair',
                    name: 'Мотор Эксперт',
                  },
                  areaServed: {
                    '@type': 'City',
                    name: 'Москва',
                  },
                  offers: service.price ? {
                    '@type': 'Offer',
                    price: service.price,
                    priceCurrency: 'RUB',
                  } : undefined,
                },
              })),
              ...engineServices.map((service, index) => ({
                '@type': 'ListItem',
                position: maintenanceServices.length + index + 1,
                item: {
                  '@type': 'Service',
                  name: service.name,
                  description: service.description,
                  provider: {
                    '@type': 'AutoRepair',
                    name: 'Мотор Эксперт',
                  },
                  areaServed: {
                    '@type': 'City',
                    name: 'Москва',
                  },
                  offers: service.price ? {
                    '@type': 'Offer',
                    price: service.price,
                    priceCurrency: 'RUB',
                  } : undefined,
                },
              })),
              ...suspensionServices.map((service, index) => ({
                '@type': 'ListItem',
                position: maintenanceServices.length + engineServices.length + index + 1,
                item: {
                  '@type': 'Service',
                  name: service.name,
                  description: service.description,
                  provider: {
                    '@type': 'AutoRepair',
                    name: 'Мотор Эксперт',
                  },
                  areaServed: {
                    '@type': 'City',
                    name: 'Москва',
                  },
                  offers: service.price ? {
                    '@type': 'Offer',
                    price: service.price,
                    priceCurrency: 'RUB',
                  } : undefined,
                },
              })),
            ],
          }),
        }}
      />
    </div>
  );
}
