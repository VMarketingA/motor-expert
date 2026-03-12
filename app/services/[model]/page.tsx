'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useI18n } from '@/lib/i18n';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
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
}

interface ServicesByCategory {
  [key: string]: Service[];
}

export default function ModelPage() {
  const params = useParams();
  const { t, language } = useI18n();
  const modelId = params.model as string;

  const [modelInfo, setModelInfo] = useState<Model | null>(null);
  const [servicesByCategory, setServicesByCategory] = useState<ServicesByCategory>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [modelId]);

  useEffect(() => {
    if (modelInfo) {
      if (language === 'ru') {
        document.title = `Ремонт ${modelInfo.name} Москва — Автосервис Мотор Эксперт | ТО, диагностика, ремонт`;
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute('content', `Профессиональный ремонт ${modelInfo.name} в Москве. Диагностика, ТО, ремонт двигателя, замена цепи ГРМ, ремонт подвески. Гарантия 24 месяца ☎ +7-495-114-55-52`);
        }
      } else {
        document.title = `${modelInfo.name} Repair Moscow — Motor Expert Auto Service | Maintenance, Diagnostics, Repair`;
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute('content', `Professional ${modelInfo.name} repair in Moscow. Diagnostics, maintenance, engine repair, timing chain replacement, suspension repair. 24-month warranty ☎ +7-495-114-55-52`);
        }
      }

      const canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.setAttribute('href', `https://motorexpert.ru/services/${modelId}`);
      } else {
        const newCanonical = document.createElement('link');
        newCanonical.setAttribute('rel', 'canonical');
        newCanonical.setAttribute('href', `https://motorexpert.ru/services/${modelId}`);
        document.head.appendChild(newCanonical);
      }
    }
  }, [modelInfo, modelId, language]);

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

  if (!modelInfo) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4">{language === 'ru' ? 'Модель не найдена' : 'Model not found'}</h1>
          <Link href="/services" className="text-[#003366] hover:underline">
            {language === 'ru' ? 'Вернуться к списку услуг' : 'Back to services'}
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
            {language === 'ru' ? 'Назад к списку моделей' : 'Back to models list'}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
            <div>
              <h1 className="mb-6">
                {language === 'ru' ? `Услуги для ${modelInfo.name}` : `Services for ${modelInfo.name}`}
              </h1>
              <p className="text-base leading-relaxed mb-8">
                {modelInfo.description}
              </p>
              <Link
                href={`/booking?model=${modelId}`}
                className="inline-block bg-[#003366] text-white px-8 py-4 font-semibold hover:bg-[#004488] transition-colors"
              >
                {language === 'ru' ? 'Записаться в автосервис' : 'Book Service'}
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
            {Object.entries(servicesByCategory).map(([category, services]) => (
              <div key={category}>
                <h2 className="mb-8 pb-4 border-b-2 border-black text-xl sm:text-2xl">
                  {t(getCategoryTranslationKey(category))}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((service) => (
                    <div key={service.id} className="border border-black p-6 flex flex-col">
                      <h3 className="mb-2 text-lg">
                        {language === 'ru' ? service.name_ru : (service.name_en || service.name_ru)}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 flex-grow">
                        {language === 'ru' ? service.description_ru : (service.description_en || service.description_ru)}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-black">
                        <span className="font-semibold text-lg">
                          {service.price_from === 0 ? t('services_free') : `${t('services_from')} ${service.price_from.toLocaleString('ru-RU')} ₽`}
                        </span>
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
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
