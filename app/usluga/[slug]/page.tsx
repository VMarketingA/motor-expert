'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useSiteSettings } from '@/hooks/use-site-settings';
import { useI18n } from '@/lib/i18n';
import { ArrowRight, Phone } from 'lucide-react';

interface Service {
  id: string;
  name_ru: string;
  name_en: string | null;
  description_ru: string;
  description_en: string | null;
  description: string | null;
  price_from: number;
  category: string;
  slug: string;
}

export default function ServicePage() {
  const params = useParams();
  const router = useRouter();
  const { t, language } = useI18n();
  const { settings } = useSiteSettings();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadService();
  }, [params.slug, language]);

  async function loadService() {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('slug', params.slug)
        .eq('is_active', true)
        .maybeSingle();

      if (error) {
        console.error('Error loading service:', error);
        setService(null);
      } else if (data) {
        setService(data);

        const serviceName = language === 'ru' ? data.name_ru : (data.name_en || data.name_ru);
        document.title = `${serviceName} — ${settings.company_name || 'Автосервис BMW'}`;

        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute('content', `${serviceName} BMW в автосервисе ${settings.company_name || 'Motor Expert'} Москва. Профессиональное обслуживание, гарантия качества. ☎ ${settings.phone_display || settings.phone}`);
        }
      } else {
        setService(null);
      }
    } catch (error) {
      console.error('Error loading service:', error);
      setService(null);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-xl">{language === 'ru' ? 'Загрузка...' : 'Loading...'}</div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <h1 className="text-3xl mb-4">{language === 'ru' ? 'Услуга не найдена' : 'Service Not Found'}</h1>
          <p className="mb-6 text-gray-600">
            {language === 'ru' ? 'К сожалению, запрашиваемая услуга не найдена.' : 'Sorry, the requested service was not found.'}
          </p>
          <Link href="/services" className="text-[#003366] hover:underline font-semibold">
            ← {language === 'ru' ? 'Вернуться к услугам' : 'Back to Services'}
          </Link>
        </div>
      </div>
    );
  }

  const serviceName = language === 'ru' ? service.name_ru : (service.name_en || service.name_ru);
  const fullDescription = service.description || service.description_ru;

  return (
    <div className="pt-16">
      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/services" className="inline-flex items-center text-gray-600 hover:text-[#003366] mb-8 transition-colors">
            ← {language === 'ru' ? 'Все услуги' : 'All Services'}
          </Link>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            {serviceName}
          </h1>

          <div className="mb-6 text-2xl font-bold text-[#003366]">
            {service.price_from === 0
              ? (language === 'ru' ? 'Бесплатно' : 'Free')
              : `${language === 'ru' ? 'от' : 'from'} ${service.price_from.toLocaleString('ru-RU')} ₽`}
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="text-lg leading-relaxed whitespace-pre-line">
              {fullDescription}
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-xl mb-6 text-center">
              {language === 'ru'
                ? 'Запишитесь на обслуживание или рассчитайте стоимость работ'
                : 'Book a service or calculate the cost'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/calculator"
                className="inline-flex items-center justify-center bg-white border-2 border-[#003366] text-[#003366] px-8 py-4 text-lg font-semibold hover:bg-[#003366] hover:text-white transition-colors"
              >
                {language === 'ru' ? 'Рассчитать стоимость' : 'Calculate Cost'}
              </Link>

              <Link
                href="/contacts"
                className="inline-flex items-center justify-center bg-[#003366] text-white px-8 py-4 text-lg font-semibold hover:bg-[#004488] transition-colors"
              >
                {language === 'ru' ? 'Записаться на ремонт' : 'Book Repair'}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
