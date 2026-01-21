'use client';

import { useI18n } from '@/lib/i18n';

export default function Testimonials() {
  const { t } = useI18n();

  return (
    <div className="pt-16">
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-center mb-12">{t('testimonials_title')}</h1>

          <div className="text-center py-12">
            <p className="text-xl">
              Скоро здесь появятся благодарности
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
