'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useI18n } from '@/lib/i18n';
import { Phone, CheckCircle, Clock, Shield, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Service {
  id: string;
  name_ru: string;
  name_en: string;
  category: string;
  price_from: number;
  description_ru?: string;
  description_en?: string;
}

export default function ServicePage() {
  const params = useParams();
  const { t, language } = useI18n();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchService() {
      try {
        const serviceSlug = decodeURIComponent(params.slug as string);
        const searchName = serviceSlug.replace(/-/g, ' ');

        const { data, error } = await supabase
          .from('services')
          .select('*')
          .or(`name_ru.ilike.%${searchName}%,name_en.ilike.%${searchName}%`)
          .limit(1)
          .maybeSingle();

        if (error) throw error;
        setService(data);
      } catch (error) {
        console.error('Error fetching service:', error);
      } finally {
        setLoading(false);
      }
    }

    if (params.slug) {
      fetchService();
    }
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">{t('loading')}</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Услуга не найдена</h1>
          <Link href="/services">
            <Button>Вернуться к услугам</Button>
          </Link>
        </div>
      </div>
    );
  }

  const serviceName = language === 'en' && service.name_en ? service.name_en : service.name_ru;
  const categoryName = service.category;

  const getServiceContent = (serviceName: string, category: string) => {
    const content: any = {
      intro: '',
      why_important: '',
      benefits: [],
      process: [],
      signs: [],
      why_choose: []
    };

    if (serviceName.toLowerCase().includes('масло')) {
      content.intro = `${serviceName} для BMW — это основа долговечности и надежной работы двигателя вашего автомобиля. Моторное масло выполняет критически важные функции: смазывает детали двигателя, отводит тепло, очищает от продуктов износа и защищает от коррозии.`;
      content.why_important = 'Регулярная замена масла необходима для поддержания оптимальной работы двигателя BMW. Старое масло теряет свои защитные свойства, что приводит к повышенному износу деталей, образованию отложений и снижению мощности двигателя.';
      content.benefits = [
        'Продление срока службы двигателя',
        'Снижение расхода топлива',
        'Улучшение динамических характеристик',
        'Предотвращение масложора',
        'Защита турбины и системы VANOS'
      ];
      content.process = [
        'Компьютерная диагностика состояния двигателя',
        'Прогрев двигателя до рабочей температуры',
        'Слив отработанного масла',
        'Замена масляного фильтра на оригинальный',
        'Заливка качественного масла, соответствующего допускам BMW',
        'Сброс сервисного интервала в бортовом компьютере',
        'Контрольная проверка уровня и отсутствия подтеков'
      ];
      content.signs = [
        'Подошел регламентный срок замены (10-15 тыс. км)',
        'Темный цвет масла на щупе',
        'Появление посторонних шумов в двигателе',
        'Повышенный расход масла',
        'Загорелась лампа давления масла'
      ];
    } else if (serviceName.toLowerCase().includes('цепь') || serviceName.toLowerCase().includes('грм')) {
      content.intro = `${serviceName} BMW — критически важная процедура для моторов N47, N20, N55, B58 и других двигателей с цепным приводом ГРМ. Растянутая цепь может привести к серьезным повреждениям двигателя и дорогостоящему ремонту.`;
      content.why_important = 'Цепь ГРМ отвечает за синхронизацию работы клапанов и поршней. При растяжении цепи нарушаются фазы газораспределения, что приводит к потере мощности, повышенному расходу топлива и, в критических случаях, к встрече клапанов с поршнями.';
      content.benefits = [
        'Предотвращение капитального ремонта двигателя',
        'Восстановление мощности и динамики',
        'Снижение расхода топлива',
        'Устранение посторонних звуков при работе двигателя',
        'Увеличение ресурса двигателя'
      ];
      content.process = [
        'Детальная диагностика состояния цепи ГРМ',
        'Разборка передней части двигателя',
        'Замена цепи, натяжителей и успокоителей',
        'Установка новых направляющих при необходимости',
        'Настройка фаз газораспределения',
        'Замена масла и фильтра',
        'Адаптация и тестирование'
      ];
      content.signs = [
        'Характерный дизельный стук на холодном двигателе',
        'Ошибки по фазам газораспределения',
        'Потеря мощности двигателя',
        'Проблемы с запуском',
        'Пробег более 100-150 тыс. км'
      ];
    } else if (serviceName.toLowerCase().includes('диагностика')) {
      content.intro = `${serviceName} BMW — это комплексная проверка всех систем автомобиля с использованием профессионального оборудования. Современная компьютерная диагностика позволяет выявить неисправности на ранней стадии и предотвратить серьезные поломки.`;
      content.why_important = 'BMW оснащены сложной электроникой, которая контролирует работу двигателя, трансмиссии, подвески, тормозной системы и других узлов. Своевременная диагностика позволяет обнаружить скрытые проблемы до того, как они приведут к дорогостоящему ремонту.';
      content.benefits = [
        'Выявление неисправностей на ранней стадии',
        'Точное определение причины проблемы',
        'Экономия на ремонте',
        'Предотвращение серьезных поломок',
        'Полная информация о состоянии автомобиля'
      ];
      content.process = [
        'Подключение к диагностическому разъему OBD-II',
        'Сканирование всех электронных блоков управления',
        'Считывание кодов ошибок и параметров',
        'Проверка работы датчиков и исполнительных механизмов',
        'Анализ полученных данных',
        'Составление отчета с рекомендациями',
        'Консультация по необходимому ремонту'
      ];
      content.signs = [
        'Загорелась лампа Check Engine',
        'Нестабильная работа двигателя',
        'Снижение мощности',
        'Повышенный расход топлива',
        'Перед покупкой подержанного BMW'
      ];
    } else if (serviceName.toLowerCase().includes('турбин')) {
      content.intro = `${serviceName} BMW — сложная процедура, требующая высокой квалификации и специального оборудования. Турбина повышает мощность двигателя, нагнетая воздух под давлением, и её неисправность серьезно влияет на динамику автомобиля.`;
      content.why_important = 'Турбокомпрессор работает при экстремальных температурах и высоких оборотах. Износ подшипников, повреждение крыльчатки или утечка масла могут привести к полному выходу турбины из строя и повреждению двигателя.';
      content.benefits = [
        'Восстановление мощности двигателя',
        'Устранение дымления',
        'Снижение расхода масла',
        'Улучшение отклика на педаль газа',
        'Предотвращение повреждения двигателя'
      ];
      content.process = [
        'Диагностика турбокомпрессора',
        'Демонтаж турбины',
        'Дефектовка и определение объема работ',
        'Ремонт или замена турбины',
        'Замена прокладок и уплотнений',
        'Замена масла и маслопроводов',
        'Установка и настройка',
        'Тестирование под нагрузкой'
      ];
      content.signs = [
        'Свист или вой при разгоне',
        'Синий или черный дым из выхлопной',
        'Потеря мощности',
        'Повышенный расход масла',
        'Ошибки по давлению наддува'
      ];
    } else if (serviceName.toLowerCase().includes('подвеск')) {
      content.intro = `${serviceName} BMW — это залог комфорта, безопасности и управляемости вашего автомобиля. Подвеска принимает на себя все неровности дорожного покрытия, обеспечивает контакт колес с дорогой и стабильность при маневрах.`;
      content.why_important = 'Изношенная подвеска не только ухудшает комфорт, но и представляет серьезную угрозу безопасности. Неисправные амортизаторы увеличивают тормозной путь, а разбитые сайлентблоки и шаровые опоры могут привести к потере управления.';
      content.benefits = [
        'Повышение безопасности движения',
        'Улучшение управляемости',
        'Снижение вибраций и шумов',
        'Равномерный износ шин',
        'Комфортная езда'
      ];
      content.process = [
        'Подъем автомобиля на подъемнике',
        'Визуальный осмотр элементов подвески',
        'Проверка люфтов и износа',
        'Замена изношенных деталей',
        '3D сход-развал',
        'Тестовая поездка'
      ];
      content.signs = [
        'Стуки при проезде неровностей',
        'Неравномерный износ шин',
        'Автомобиль «рыскает» по дороге',
        'Увеличенный тормозной путь',
        'Вибрации на руле'
      ];
    } else if (serviceName.toLowerCase().includes('тормоз') || serviceName.toLowerCase().includes('колодк')) {
      content.intro = `${serviceName} BMW — это вопрос вашей безопасности и безопасности окружающих. Эффективная тормозная система критически важна для предотвращения аварийных ситуаций и обеспечения контроля над автомобилем.`;
      content.why_important = 'Тормозная система работает в экстремальных условиях: высокие температуры, большие нагрузки, воздействие влаги и реагентов. Изношенные колодки и диски увеличивают тормозной путь, а старая тормозная жидкость может закипеть при интенсивном торможении.';
      content.benefits = [
        'Максимальная безопасность',
        'Уверенное торможение в любых условиях',
        'Отсутствие скрипов и вибраций',
        'Предотвращение износа дисков',
        'Спокойствие за рулем'
      ];
      content.process = [
        'Проверка толщины колодок и дисков',
        'Диагностика тормозной системы',
        'Замена изношенных элементов',
        'Прокачка тормозов',
        'Сброс сервисного интервала',
        'Тестирование на ходу'
      ];
      content.signs = [
        'Скрип или визг при торможении',
        'Вибрация педали тормоза',
        'Увеличенный тормозной путь',
        'Увод автомобиля при торможении',
        'Горит индикатор износа колодок'
      ];
    } else if (serviceName.toLowerCase().includes('кондиционер')) {
      content.intro = `${serviceName} BMW — это не только комфорт в жаркую погоду, но и здоровый микроклимат в салоне автомобиля. Исправная климатическая система обеспечивает оптимальную температуру и очищает воздух от пыли и бактерий.`;
      content.why_important = 'Система кондиционирования требует регулярного обслуживания. Со временем фреон частично испаряется, масло теряет свои свойства, а в системе могут появиться утечки. Неисправный кондиционер может привести к перегреву двигателя.';
      content.benefits = [
        'Комфортная температура в салоне',
        'Быстрое охлаждение в жару',
        'Эффективное удаление влаги',
        'Чистый воздух без запахов',
        'Экономия топлива'
      ];
      content.process = [
        'Диагностика системы кондиционирования',
        'Проверка давления фреона',
        'Поиск утечек',
        'Вакуумирование системы',
        'Заправка фреоном',
        'Проверка работоспособности',
        'Антибактериальная обработка'
      ];
      content.signs = [
        'Слабое охлаждение',
        'Посторонние запахи при включении',
        'Шум при работе компрессора',
        'Запотевание стекол',
        'Кондиционер не включается'
      ];
    } else if (serviceName.toLowerCase().includes('фильтр')) {
      content.intro = `${serviceName} BMW — важная процедура регулярного технического обслуживания. Фильтры защищают двигатель, салон и системы автомобиля от загрязнений, обеспечивая их эффективную работу и долговечность.`;
      content.why_important = 'Засоренные фильтры снижают эффективность работы систем автомобиля, увеличивают расход топлива и могут привести к серьезным поломкам. Регулярная замена фильтров — это простая и недорогая профилактика дорогостоящего ремонта.';
      content.benefits = [
        'Защита двигателя от загрязнений',
        'Чистый воздух в салоне',
        'Оптимальная работа систем',
        'Экономия топлива',
        'Продление срока службы агрегатов'
      ];
      content.process = [
        'Диагностика состояния фильтров',
        'Подбор качественных фильтров',
        'Демонтаж старых фильтров',
        'Установка новых фильтров',
        'Проверка герметичности',
        'Контрольная диагностика'
      ];
      content.signs = [
        'Подошел регламентный срок замены',
        'Снижение мощности двигателя',
        'Повышенный расход топлива',
        'Посторонние запахи в салоне',
        'Запотевание стекол'
      ];
    } else if (serviceName.toLowerCase().includes('свечи')) {
      content.intro = `${serviceName} BMW — важная процедура для поддержания оптимальной работы двигателя. Свечи зажигания отвечают за воспламенение топливно-воздушной смеси, и их состояние напрямую влияет на мощность, расход топлива и стабильность работы мотора.`;
      content.why_important = 'Изношенные свечи приводят к пропускам зажигания, потере мощности, увеличению расхода топлива и повреждению катализатора. Своевременная замена свечей предотвращает дорогостоящий ремонт и обеспечивает надежный запуск в любую погоду.';
      content.benefits = [
        'Стабильная работа двигателя',
        'Легкий запуск в мороз',
        'Снижение расхода топлива',
        'Улучшение динамики',
        'Защита катализатора'
      ];
      content.process = [
        'Компьютерная диагностика двигателя',
        'Проверка состояния катушек зажигания',
        'Выкручивание старых свечей',
        'Проверка состояния резьбы',
        'Установка новых свечей с правильным моментом затяжки',
        'Сброс адаптаций',
        'Тестирование работы двигателя'
      ];
      content.signs = [
        'Пропуски зажигания',
        'Нестабильный холостой ход',
        'Затрудненный запуск',
        'Повышенный расход топлива',
        'Ошибки по цилиндрам'
      ];
    } else if (serviceName.toLowerCase().includes('амортизатор')) {
      content.intro = `${serviceName} BMW — ключевой элемент подвески, обеспечивающий комфорт и безопасность движения. Амортизаторы гасят колебания кузова, поддерживают постоянный контакт колес с дорогой и влияют на управляемость автомобиля.`;
      content.why_important = 'Изношенные амортизаторы увеличивают тормозной путь на 20%, ухудшают управляемость и приводят к неравномерному износу шин. Своевременная замена амортизаторов — это вопрос вашей безопасности.';
      content.benefits = [
        'Улучшение управляемости',
        'Сокращение тормозного пути',
        'Комфортная езда',
        'Равномерный износ шин',
        'Безопасность при маневрах'
      ];
      content.process = [
        'Диагностика подвески на стенде',
        'Подъем автомобиля',
        'Демонтаж колеса и защиты',
        'Снятие изношенного амортизатора',
        'Установка нового амортизатора',
        'Сборка и проверка',
        'Сход-развал при необходимости'
      ];
      content.signs = [
        'Раскачка кузова при торможении',
        'Стук в подвеске',
        'Потеки масла на амортизаторе',
        'Неравномерный износ шин',
        'Увеличенный тормозной путь'
      ];
    } else {
      content.intro = `${serviceName} для BMW — профессиональное обслуживание в специализированном автосервисе. Наши мастера имеют многолетний опыт работы с автомобилями BMW и используют только качественные запчасти.`;
      content.why_important = 'Своевременное обслуживание и ремонт BMW гарантируют надежность, безопасность и сохранение ценности вашего автомобиля. Мы используем оригинальные запчасти и современное диагностическое оборудование.';
      content.benefits = [
        'Профессиональный подход',
        'Качественные запчасти',
        'Гарантия на работы 24 месяца',
        'Доступные цены',
        'Быстрое выполнение'
      ];
      content.process = [
        'Первичная диагностика',
        'Согласование стоимости',
        'Выполнение работ',
        'Контроль качества',
        'Тестирование'
      ];
      content.signs = [
        'Регламентное обслуживание',
        'Появление неисправностей',
        'Подготовка к сезону'
      ];
    }

    return content;
  };

  const content = getServiceContent(serviceName, categoryName);

  return (
    <div className="min-h-screen bg-white pt-16">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              {serviceName} BMW в Москве
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-3xl">
              Профессиональный автосервис BMW. Опыт работы более 10 лет. Гарантия 24 месяца.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/booking">
                <Button size="lg" className="bg-[#003366] hover:bg-[#004488] text-white px-8 py-6 text-lg">
                  <Phone className="mr-2 h-5 w-5" />
                  Записаться на ремонт
                </Button>
              </Link>
              <a href="tel:+74951145552">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                  +7 (495) 114-55-52
                </Button>
              </a>
            </div>
            {service.price_from > 0 && (
              <div className="mt-8 text-2xl font-bold">
                Стоимость от {service.price_from.toLocaleString('ru-RU')} ₽
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">О услуге</h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                {content.intro}
              </p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Почему это важно</h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                {content.why_important}
              </p>
              <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-[#003366]">
                <h3 className="font-bold text-xl mb-3">Преимущества услуги:</h3>
                <ul className="space-y-2">
                  {content.benefits.map((benefit: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Как мы работаем</h2>
              <div className="space-y-4">
                {content.process.map((step: string, index: number) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-[#003366] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-lg">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Когда необходима услуга</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {content.signs.map((sign: string, index: number) => (
                  <div key={index} className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <div className="flex items-start">
                      <ArrowRight className="h-5 w-5 text-amber-600 mr-2 mt-1 flex-shrink-0" />
                      <span>{sign}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              <div className="bg-[#003366] text-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Запишитесь на ремонт</h3>
                <p className="mb-6">Оставьте заявку и мы перезвоним вам в течение 5 минут</p>
                <Link href="/booking">
                  <Button className="w-full bg-white text-[#003366] hover:bg-slate-100">
                    Записаться сейчас
                  </Button>
                </Link>
                <div className="mt-6 pt-6 border-t border-white/20">
                  <p className="text-sm mb-2">Или позвоните нам:</p>
                  <a href="tel:+74951145552" className="text-xl font-bold hover:underline">
                    +7 (495) 114-55-52
                  </a>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-lg space-y-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-6 w-6 text-[#003366] flex-shrink-0" />
                  <div>
                    <h4 className="font-bold mb-1">Гарантия 24 месяца</h4>
                    <p className="text-sm text-slate-600">На все виды работ</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-6 w-6 text-[#003366] flex-shrink-0" />
                  <div>
                    <h4 className="font-bold mb-1">Работаем ежедневно</h4>
                    <p className="text-sm text-slate-600">9:00 - 21:00</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="h-6 w-6 text-[#003366] flex-shrink-0" />
                  <div>
                    <h4 className="font-bold mb-1">Опыт более 10 лет</h4>
                    <p className="text-sm text-slate-600">Работаем только с BMW</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
                <h4 className="font-bold text-lg mb-2">Специальное предложение</h4>
                <p className="text-sm mb-4">При комплексном обслуживании — диагностика бесплатно!</p>
                <Link href="/booking">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Получить предложение
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Готовы записаться на {serviceName.toLowerCase()}?
          </h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Наши специалисты проведут качественную диагностику и выполнят все необходимые работы с гарантией
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 px-8">
                <Phone className="mr-2 h-5 w-5" />
                Записаться на ремонт
              </Button>
            </Link>
            <a href="tel:+74951145552">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                Позвонить: +7 (495) 114-55-52
              </Button>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
