'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { Phone, MapPin, Clock, Shield, Wrench, DollarSign } from 'lucide-react';

export default function Home() {
  const { t } = useI18n();

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
              Профессиональный ремонт и обслуживание BMW и MINI. Компьютерная диагностика, замена масла, ремонт двигателя, замена цепи ГРМ, ремонт турбин, ремонт подвески. Гарантия 12 месяцев. Работаем с 2008 года.
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/services" className="border border-black p-6 hover:border-[#003366] transition-colors bg-white">
              <h3 className="mb-3 text-lg font-semibold">Замена масла BMW</h3>
              <p className="text-sm mb-4">Замена масла и масляного фильтра с использованием оригинальных материалов</p>
              <span className="text-[#003366] text-sm font-semibold">от 2500 ₽ →</span>
            </Link>
            <Link href="/services" className="border border-black p-6 hover:border-[#003366] transition-colors bg-white">
              <h3 className="mb-3 text-lg font-semibold">Замена цепи ГРМ BMW</h3>
              <p className="text-sm mb-4">Замена цепи газораспределительного механизма на двигателях N20, N47, N55, B58</p>
              <span className="text-[#003366] text-sm font-semibold">от 35000 ₽ →</span>
            </Link>
            <Link href="/services" className="border border-black p-6 hover:border-[#003366] transition-colors bg-white">
              <h3 className="mb-3 text-lg font-semibold">Ремонт двигателя BMW</h3>
              <p className="text-sm mb-4">Капитальный ремонт моторов N55, N20, N47, B58 с гарантией</p>
              <span className="text-[#003366] text-sm font-semibold">от 80000 ₽ →</span>
            </Link>
            <Link href="/services" className="border border-black p-6 hover:border-[#003366] transition-colors bg-white">
              <h3 className="mb-3 text-lg font-semibold">Диагностика BMW</h3>
              <p className="text-sm mb-4">Компьютерная диагностика всех систем автомобиля на профессиональном оборудовании</p>
              <span className="text-[#003366] text-sm font-semibold">от 1500 ₽ →</span>
            </Link>
            <Link href="/services" className="border border-black p-6 hover:border-[#003366] transition-colors bg-white">
              <h3 className="mb-3 text-lg font-semibold">Ремонт турбин BMW</h3>
              <p className="text-sm mb-4">Диагностика и ремонт турбокомпрессоров с восстановлением мощности</p>
              <span className="text-[#003366] text-sm font-semibold">от 45000 ₽ →</span>
            </Link>
            <Link href="/services" className="border border-black p-6 hover:border-[#003366] transition-colors bg-white">
              <h3 className="mb-3 text-lg font-semibold">Ремонт подвески BMW</h3>
              <p className="text-sm mb-4">Замена амортизаторов, сайлентблоков, шаровых опор, 3D сход-развал</p>
              <span className="text-[#003366] text-sm font-semibold">от 8000 ₽ →</span>
            </Link>
            <Link href="/services" className="border border-black p-6 hover:border-[#003366] transition-colors bg-white">
              <h3 className="mb-3 text-lg font-semibold">Замена тормозных колодок</h3>
              <p className="text-sm mb-4">Замена передних и задних тормозных колодок и дисков</p>
              <span className="text-[#003366] text-sm font-semibold">от 4500 ₽ →</span>
            </Link>
            <Link href="/reviews" className="border border-black p-6 hover:border-[#003366] transition-colors bg-white">
              <h3 className="mb-3 text-lg font-semibold">Отзывы клиентов</h3>
              <p className="text-sm mb-4">Более 500 довольных клиентов. Средняя оценка 5.0</p>
              <span className="text-[#003366] text-sm font-semibold">Читать отзывы →</span>
            </Link>
          </div>
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
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AutoRepair',
            name: 'Мотор Эксперт — Автосервис BMW Москва',
            description: 'Профессиональный ремонт и обслуживание BMW в Москве. Компьютерная диагностика, замена масла, ремонт двигателя N55, замена цепи ГРМ, ремонт турбин, ремонт подвески. Гарантия 12 месяцев.',
            image: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg',
            '@id': 'https://motorexpert.ru',
            url: 'https://motorexpert.ru',
            telephone: '+74951145552',
            priceRange: '₽₽',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Автозаводская ул., 23, корп. 7',
              addressLocality: 'Москва',
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
            },
            makesOffer: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Замена масла BMW Москва',
                  description: 'Замена моторного масла и масляного фильтра BMW с использованием оригинальных материалов',
                },
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Ремонт двигателя BMW Москва',
                  description: 'Капитальный и частичный ремонт двигателей BMW N20, N47, N55, B58 с гарантией',
                },
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Замена цепи ГРМ BMW Москва',
                  description: 'Замена цепи газораспределительного механизма на двигателях BMW',
                },
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Диагностика BMW Москва',
                  description: 'Компьютерная диагностика всех систем BMW на профессиональном оборудовании',
                },
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Ремонт подвески BMW Москва',
                  description: 'Диагностика и ремонт подвески BMW, замена амортизаторов, сайлентблоков, 3D сход-развал',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
