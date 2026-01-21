'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

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
  description_ru: string;
  price_from: number;
}

export default function Services() {
  const [bmwModels, setBmwModels] = useState<Model[]>([]);
  const [miniModels, setMiniModels] = useState<Model[]>([]);
  const [maintenanceServices, setMaintenanceServices] = useState<Service[]>([]);
  const [engineServices, setEngineServices] = useState<Service[]>([]);
  const [suspensionServices, setSuspensionServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Услуги ремонта BMW Москва — цены на обслуживание';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Ремонт бмв москва, автосервис бмв москва, ремонт двигателя бмв москва. Замена масла от 2500₽, ремонт двигателя от 80000₽, замена цепи ГРМ от 35000₽. Гарантия 12 месяцев');
    }

    loadData();
  }, []);

  async function loadData() {
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

      if (modelsResponse.data) {
        const bmw = modelsResponse.data.filter((m: Model) => m.brand === 'BMW');
        const mini = modelsResponse.data.filter((m: Model) => m.brand === 'MINI');
        setBmwModels(bmw);
        setMiniModels(mini);
      }

      if (servicesResponse.data) {
        setMaintenanceServices(servicesResponse.data.filter((s: Service) => s.category === 'maintenance'));
        setEngineServices(servicesResponse.data.filter((s: Service) => s.category === 'engine'));
        setSuspensionServices(servicesResponse.data.filter((s: Service) => s.category === 'suspension'));
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }

  const { t } = useI18n();

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl mb-4">Загрузка...</div>
        </div>
      </div>
    );
  }

  const allServices = [...maintenanceServices, ...engineServices, ...suspensionServices];

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

            <h3 className="mb-6 text-xl font-semibold">Ремонт MINI</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
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
                {maintenanceServices.map((service) => (
                  <div key={service.id} className="border border-black p-6 flex flex-col">
                    <h3 className="mb-2 text-lg font-semibold">{service.name_ru}</h3>
                    <p className="text-sm text-gray-600 mb-4 flex-grow">{service.description_ru}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-black">
                      <span className="font-semibold text-lg">от {service.price_from.toLocaleString('ru-RU')} ₽</span>
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
                {engineServices.map((service) => (
                  <div key={service.id} className="border border-black p-6 flex flex-col">
                    <h3 className="mb-2 text-lg font-semibold">{service.name_ru}</h3>
                    <p className="text-sm text-gray-600 mb-4 flex-grow">{service.description_ru}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-black">
                      <span className="font-semibold text-lg">от {service.price_from.toLocaleString('ru-RU')} ₽</span>
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
                {suspensionServices.map((service) => (
                  <div key={service.id} className="border border-black p-6 flex flex-col">
                    <h3 className="mb-2 text-lg font-semibold">{service.name_ru}</h3>
                    <p className="text-sm text-gray-600 mb-4 flex-grow">{service.description_ru}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-black">
                      <span className="font-semibold text-lg">от {service.price_from.toLocaleString('ru-RU')} ₽</span>
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
            itemListElement: allServices.map((service, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'Service',
                name: service.name_ru,
                description: service.description_ru,
                provider: {
                  '@type': 'AutoRepair',
                  name: 'Мотор Эксперт',
                },
                areaServed: {
                  '@type': 'City',
                  name: 'Москва',
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
