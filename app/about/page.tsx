'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n';

export default function About() {
  const { t } = useI18n();

  return (
    <div className="pt-16">
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-center mb-12">{t('about_title')}</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed mb-6">
              Автосервис &quot;Мотор-Эксперт&quot; располагается в городе Москва, по адресу: Автозаводская ул., 23, корп. 7, напротив ТЦ &quot;Ривьера&quot;.
            </p>

            <p className="text-base leading-relaxed mb-6">
              Обслуживаем такие модели БМВ, как: E81, E82, E87, E88, F20, F21, F22, F23, F45, E90, E93, F30, F34, F32, F33, F36, E60, E61, F10, F11, G30, F07, E63, E64, F12, F13, F06, G32, E65, E66, F01, F02, G11, G12, G15, X1, E84, F48, X2, F39, X3, E87, F25, G01, X4, F26, G02, X5, E53, E70, F15, G05, X6, E71, F16, G06, и автомобили марки MINI, такие как: Cabrio, Clubman, Countryman, Coupe, Hatch, Paceman, Roadster.
            </p>

            <p className="text-base leading-relaxed mb-8">
              Работаем с 9 утра до 21 вечера ежедневно. Для записи в автосервис - нажмите кнопку ниже:
            </p>

            <div className="text-center">
              <Link
                href="/services"
                className="inline-block bg-[#003366] text-white px-8 py-4 text-lg font-semibold hover:bg-[#004488] transition-colors"
              >
                Записаться в автосервис
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
