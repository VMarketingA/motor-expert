'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useSiteSettings } from '@/hooks/use-site-settings';
import { useI18n } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Phone, Clock, Shield } from 'lucide-react';

interface Service {
  id: string;
  name_ru: string;
  name_en: string;
  description_ru: string;
  description_en: string;
  price_from: number;
  category: string;
  slug: string;
}

interface ServiceContent {
  introduction: string;
  whyImportant: string;
  whenNeeded: string[];
  benefits: string[];
  process: string[];
  recommendations: string;
  warranty: string;
}

function generateServiceContent(service: Service, language: string): ServiceContent {
  const serviceName = language === 'ru' ? service.name_ru : service.name_en;
  const category = service.category;

  const contentTemplates: Record<string, ServiceContent> = {
    'Масло в ДВС + масляный фильтр': {
      introduction: 'Замена моторного масла и масляного фильтра — это основа правильного ухода за двигателем вашего BMW. Качественное масло создает защитную пленку между движущимися частями, снижает трение и отводит тепло, предотвращая преждевременный износ.',
      whyImportant: 'Современные двигатели BMW работают при высоких температурах и нагрузках. Со временем масло теряет свои защитные свойства, окисляется и загрязняется продуктами сгорания. Использование отработанного масла приводит к образованию нагара, ускоренному износу поршневой группы и может стать причиной капитального ремонта двигателя.',
      whenNeeded: [
        'При достижении регламентного пробега (обычно 10-15 тыс. км)',
        'Раз в год, даже при малых пробегах',
        'После покупки подержанного автомобиля',
        'При появлении стуков или посторонних шумов от двигателя',
        'Если масло потемнело или имеет запах гари'
      ],
      benefits: [
        'Продление срока службы двигателя на 30-40%',
        'Снижение расхода топлива на 5-10%',
        'Стабильная работа двигателя на холостом ходу',
        'Легкий запуск в морозную погоду',
        'Сохранение мощностных характеристик',
        'Предотвращение образования нагара и отложений'
      ],
      process: [
        'Прогрев двигателя до рабочей температуры',
        'Слив отработанного масла',
        'Замена масляного фильтра на оригинальный',
        'Заливка нового масла рекомендованной вязкости',
        'Проверка уровня и отсутствия утечек',
        'Сброс счетчика сервисного интервала'
      ],
      recommendations: 'Мы рекомендуем использовать только оригинальные масла BMW или одобренные производителем аналоги. Интервал замены зависит от условий эксплуатации: при городской езде, коротких поездках или агрессивном стиле вождения сокращайте интервал на 20-30%. Обязательно проверяйте уровень масла каждые 1000 км.',
      warranty: 'На выполненные работы и оригинальные запчасти предоставляется гарантия 24 месяца.'
    },
    'Охлаждающая жидкость': {
      introduction: 'Охлаждающая жидкость (антифриз) — критически важный элемент системы охлаждения двигателя BMW. Она не только предотвращает перегрев, но и защищает алюминиевые и магниевые детали от коррозии, обеспечивает работу системы отопления салона.',
      whyImportant: 'Со временем антифриз теряет свои защитные свойства: снижается эффективность теплоотвода, pH жидкости становится кислым, что приводит к коррозии радиаторов, разрушению помпы и термостата. Перегрев двигателя может привести к деформации головки блока цилиндров и дорогостоящему ремонту.',
      whenNeeded: [
        'Каждые 3-4 года или 60 тыс. км пробега',
        'При изменении цвета жидкости (помутнение, ржавый оттенок)',
        'После ремонта системы охлаждения',
        'При обнаружении утечек',
        'Если двигатель перегревается или долго прогревается'
      ],
      benefits: [
        'Стабильная температура двигателя в любых условиях',
        'Защита от коррозии алюминиевых деталей',
        'Предотвращение образования накипи',
        'Эффективная работа отопителя салона',
        'Защита от замерзания до -40°C',
        'Продление срока службы помпы и радиаторов'
      ],
      process: [
        'Слив старой охлаждающей жидкости',
        'Промывка системы охлаждения (при необходимости)',
        'Проверка состояния патрубков и хомутов',
        'Заливка оригинального антифриза BMW',
        'Удаление воздушных пробок',
        'Проверка работы системы под давлением'
      ],
      recommendations: 'Используйте только оригинальный антифриз BMW или одобренные аналоги с допуском. Никогда не смешивайте разные типы охлаждающих жидкостей. Регулярно проверяйте уровень в расширительном бачке — он должен находиться между отметками MIN и MAX на холодном двигателе.',
      warranty: 'Гарантия на работы и материалы — 24 месяца.'
    },
    'default': {
      introduction: `${serviceName} — важная процедура для поддержания вашего BMW в отличном состоянии. Регулярное обслуживание предотвращает серьезные поломки и продлевает срок службы автомобиля.`,
      whyImportant: 'Своевременное выполнение этой услуги позволяет избежать дорогостоящего ремонта в будущем. Пренебрежение техническим обслуживанием приводит к ускоренному износу деталей, снижению надежности и безопасности автомобиля.',
      whenNeeded: [
        'Согласно регламенту технического обслуживания',
        'При появлении признаков неисправности',
        'После длительного простоя автомобиля',
        'Перед дальней поездкой'
      ],
      benefits: [
        'Надежная и безопасная эксплуатация автомобиля',
        'Продление срока службы узлов и агрегатов',
        'Предотвращение внезапных поломок',
        'Сохранение заводских характеристик',
        'Экономия на дорогостоящем ремонте'
      ],
      process: [
        'Диагностика текущего состояния',
        'Демонтаж изношенных деталей',
        'Установка оригинальных запчастей',
        'Проверка качества выполненных работ',
        'Тестирование работы систем'
      ],
      recommendations: `Доверяйте ${serviceName.toLowerCase()} только квалифицированным специалистам. Используйте оригинальные запчасти или качественные аналоги с допусками BMW. Соблюдайте рекомендованные интервалы обслуживания.`,
      warranty: 'На все работы и установленные запчасти предоставляется гарантия 24 месяца.'
    }
  };

  return contentTemplates[service.name_ru] || contentTemplates['default'];
}

export default function ServicePage() {
  const params = useParams();
  const router = useRouter();
  const { t, language } = useI18n();
  const { settings } = useSiteSettings();
  const [service, setService] = useState<Service | null>(null);
  const [content, setContent] = useState<ServiceContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadService();
  }, [params.slug]);

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
        setContent(generateServiceContent(data, language));

        const serviceName = language === 'ru' ? data.name_ru : data.name_en;
        document.title = `${serviceName} BMW в Москве — Автосервис ${settings.company_name || 'BMW'}`;

        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute('content', `${serviceName} BMW в автосервисе ${settings.company_name || 'BMW'} Москва. Профессиональное обслуживание, оригинальные запчасти, гарантия 24 месяца. ☎ ${settings.phone_display || settings.phone}`);
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

  if (!service || !content) {
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

  const serviceName = language === 'ru' ? service.name_ru : service.name_en;
  const serviceDescription = language === 'ru' ? service.description_ru : service.description_en;

  return (
    <div className="pt-16">
      <section className="bg-gradient-to-br from-[#003366] to-[#004488] text-white py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/services" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
            ← {language === 'ru' ? 'Все услуги' : 'All Services'}
          </Link>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {serviceName}
          </h1>

          <p className="text-lg sm:text-xl text-white/90 mb-6">
            {serviceDescription}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded">
              <div className="text-sm text-white/80">{language === 'ru' ? 'Стоимость от' : 'Price from'}</div>
              <div className="text-2xl font-bold">{service.price_from.toLocaleString()} ₽</div>
            </div>

            <Button
              onClick={() => router.push('/booking')}
              size="lg"
              className="bg-white text-[#003366] hover:bg-white/90 font-semibold"
            >
              {language === 'ru' ? 'Записаться на ремонт' : 'Book Repair'}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed mb-8">
              {content.introduction}
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold mb-4 mt-12">
              {language === 'ru' ? 'Почему это важно?' : 'Why is this important?'}
            </h2>
            <p className="text-lg leading-relaxed mb-8">
              {content.whyImportant}
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold mb-6 mt-12">
              {language === 'ru' ? 'Когда необходимо выполнять?' : 'When is it necessary?'}
            </h2>
            <ul className="space-y-3 mb-8">
              {content.whenNeeded.map((item, index) => (
                <li key={index} className="flex items-start">
                  <Clock className="w-5 h-5 text-[#003366] mr-3 mt-1 flex-shrink-0" />
                  <span className="text-lg">{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-2xl sm:text-3xl font-bold mb-6 mt-12">
              {language === 'ru' ? 'Преимущества своевременного обслуживания' : 'Benefits of Timely Service'}
            </h2>
            <ul className="space-y-3 mb-8">
              {content.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <Check className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-lg">{benefit}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-2xl sm:text-3xl font-bold mb-6 mt-12">
              {language === 'ru' ? 'Процесс выполнения работ' : 'Service Process'}
            </h2>
            <ol className="space-y-3 mb-8 list-decimal list-inside">
              {content.process.map((step, index) => (
                <li key={index} className="text-lg leading-relaxed">
                  {step}
                </li>
              ))}
            </ol>

            <h2 className="text-2xl sm:text-3xl font-bold mb-4 mt-12">
              {language === 'ru' ? 'Наши рекомендации' : 'Our Recommendations'}
            </h2>
            <p className="text-lg leading-relaxed mb-8">
              {content.recommendations}
            </p>

            <div className="bg-blue-50 border-l-4 border-[#003366] p-6 my-8">
              <div className="flex items-start">
                <Shield className="w-6 h-6 text-[#003366] mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-2">{language === 'ru' ? 'Гарантия качества' : 'Quality Guarantee'}</h3>
                  <p className="text-base">{content.warranty}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            {language === 'ru' ? 'Готовы записаться?' : 'Ready to Book?'}
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            {language === 'ru'
              ? 'Запишитесь на обслуживание прямо сейчас или позвоните нам для консультации'
              : 'Book your service now or call us for consultation'}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => router.push('/booking')}
              size="lg"
              className="bg-[#003366] hover:bg-[#004488] text-white font-semibold"
            >
              {language === 'ru' ? 'Записаться онлайн' : 'Book Online'}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <Button
              onClick={() => window.location.href = `tel:${settings.phone}`}
              size="lg"
              variant="outline"
              className="border-2 border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white font-semibold"
            >
              <Phone className="mr-2 w-5 h-5" />
              {settings.phone_display || settings.phone}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
