'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { useEffect } from 'react';

export default function About() {
  const { t } = useI18n();

  useEffect(() => {
    document.title = 'Автосервис BMW Москва Мотор Эксперт — о компании';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Автосервис BMW Мотор Эксперт в Москве. Ремонт и обслуживание BMW и MINI с 2008 года. Гарантия 24 месяца. Автозаводская ул., 23, корп. 7. Работаем ежедневно с 9:00 до 21:00.');
    }
  }, []);

  return (
    <div className="pt-16">
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-center mb-12 text-4xl lg:text-5xl">Автосервис BMW Мотор Эксперт в Москве</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed mb-6">
              Автосервис BMW &quot;Мотор Эксперт&quot; — это профессиональный сервисный центр по ремонту и обслуживанию автомобилей BMW и MINI в Москве. Мы работаем с 2008 года и специализируемся исключительно на баварских автомобилях.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-8">Наши услуги</h2>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>Компьютерная диагностика BMW всех систем</li>
              <li>Ремонт двигателя BMW: N20, N47, N55, B58, B48</li>
              <li>Замена цепи ГРМ BMW с гарантией</li>
              <li>Ремонт турбин BMW всех моделей</li>
              <li>Ремонт подвески BMW и 3D сход-развал</li>
              <li>Замена масла BMW с оригинальными материалами</li>
              <li>Техническое обслуживание BMW любой сложности</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 mt-8">Модели BMW, которые мы обслуживаем</h2>
            <p className="text-base leading-relaxed mb-6">
              Ремонт BMW E81, E82, E87, E88, F20, F21, F22, F23, F45, E90, E93, F30, F34, F32, F33, F36, E60, E61, F10, F11, G30, F07, E63, E64, F12, F13, F06, G32, E65, E66, F01, F02, G11, G12, G15, X1, E84, F48, X2, F39, X3, F25, G01, X4, F26, G02, X5, E53, E70, F15, G05, X6, E71, F16, G06, и ремонт MINI: Cabrio, Clubman, Countryman, Coupe, Hatch, Paceman, Roadster.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-8">Контакты автосервиса BMW в Москве</h2>
            <p className="text-base leading-relaxed mb-4">
              <strong>Адрес:</strong> Москва, Автозаводская ул., 23, корп. 7 (напротив ТЦ &quot;Ривьера&quot;)
            </p>
            <p className="text-base leading-relaxed mb-4">
              <strong>Телефон:</strong> <a href="tel:+74951145552" className="text-[#003366] hover:underline">+7-495-114-55-52</a>
            </p>
            <p className="text-base leading-relaxed mb-8">
              <strong>Режим работы:</strong> Ежедневно с 9:00 до 21:00
            </p>

            <div className="text-center mt-12">
              <Link
                href="/services"
                className="inline-block bg-[#003366] text-white px-8 py-4 text-lg font-semibold hover:bg-[#004488] transition-colors mr-4"
              >
                Наши услуги
              </Link>
              <Link
                href="/booking"
                className="inline-block border-2 border-[#003366] text-[#003366] px-8 py-4 text-lg font-semibold hover:bg-[#003366] hover:text-white transition-colors"
              >
                Записаться на ремонт
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
