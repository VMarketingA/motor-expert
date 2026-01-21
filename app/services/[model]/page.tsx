'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useI18n } from '@/lib/i18n';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

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

export default function ModelPage() {
  const params = useParams();
  const { t } = useI18n();
  const modelId = params.model as string;

  const [modelInfo, setModelInfo] = useState<Model | null>(null);
  const [maintenanceServices, setMaintenanceServices] = useState<Service[]>([]);
  const [engineServices, setEngineServices] = useState<Service[]>([]);
  const [suspensionServices, setSuspensionServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [modelId]);

  async function loadData() {
    if (!isSupabaseConfigured) {
      console.error('Supabase is not configured');
      setLoading(false);
      return;
    }

    try {
      const [modelResponse, servicesResponse] = await Promise.all([
        supabase
          .from('models')
          .select('*')
          .eq('model_id', modelId)
          .eq('is_active', true)
          .maybeSingle(),
        supabase
          .from('services')
          .select('*')
          .eq('is_active', true)
          .order('sort_order')
      ]);

      if (modelResponse.error) {
        console.error('Error loading model:', modelResponse.error);
      } else if (modelResponse.data) {
        setModelInfo(modelResponse.data);
      }

      if (servicesResponse.error) {
        console.error('Error loading services:', servicesResponse.error);
      } else if (servicesResponse.data) {
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

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl mb-4">Загрузка...</div>
        </div>
      </div>
    );
  }

  if (!modelInfo) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Модель не найдена</h1>
          <Link href="/services" className="text-[#003366] hover:underline">
            Вернуться к списку услуг
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center text-[#003366] hover:underline mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад к списку моделей
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
            <div>
              <h1 className="mb-6">Услуги для {modelInfo.name}</h1>
              <p className="text-base leading-relaxed mb-8">
                {modelInfo.description}
              </p>
              <Link
                href={`/booking?model=${modelId}`}
                className="inline-block bg-[#003366] text-white px-8 py-4 font-semibold hover:bg-[#004488] transition-colors"
              >
                Записаться в автосервис
              </Link>
            </div>
            <div className="aspect-video bg-gray-100">
              <img
                src={modelInfo.image}
                alt={modelInfo.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-16">
            <div>
              <h2 className="mb-8 pb-4 border-b-2 border-black">{t('services_maintenance')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {maintenanceServices.map((service) => (
                  <div key={service.id} className="border border-black p-6 flex flex-col">
                    <h3 className="mb-2 text-lg">{service.name_ru}</h3>
                    <p className="text-sm text-gray-600 mb-4 flex-grow">{service.description_ru}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-black">
                      <span className="font-semibold text-lg">от {service.price_from.toLocaleString('ru-RU')} ₽</span>
                      <Link
                        href={`/booking?model=${modelId}`}
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
              <h2 className="mb-8 pb-4 border-b-2 border-black">{t('services_engine')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {engineServices.map((service) => (
                  <div key={service.id} className="border border-black p-6 flex flex-col">
                    <h3 className="mb-2 text-lg">{service.name_ru}</h3>
                    <p className="text-sm text-gray-600 mb-4 flex-grow">{service.description_ru}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-black">
                      <span className="font-semibold text-lg">от {service.price_from.toLocaleString('ru-RU')} ₽</span>
                      <Link
                        href={`/booking?model=${modelId}`}
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
              <h2 className="mb-8 pb-4 border-b-2 border-black">{t('services_suspension')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {suspensionServices.map((service) => (
                  <div key={service.id} className="border border-black p-6 flex flex-col">
                    <h3 className="mb-2 text-lg">{service.name_ru}</h3>
                    <p className="text-sm text-gray-600 mb-4 flex-grow">{service.description_ru}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-black">
                      <span className="font-semibold text-lg">от {service.price_from.toLocaleString('ru-RU')} ₽</span>
                      <Link
                        href={`/booking?model=${modelId}`}
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
        </div>
      </section>
    </div>
  );
}
