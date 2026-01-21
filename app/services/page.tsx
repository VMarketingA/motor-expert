'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { bmwModels, miniModels } from '@/lib/modelData';
import { maintenanceServices, engineServices, suspensionServices } from '@/lib/servicesData';

export default function Services() {
  const { t } = useI18n();

  return (
    <div className="pt-16">
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-center mb-16">{t('services_title')}</h1>

          <div className="mb-20">
            <h2 className="text-center mb-8">Выберите свою модель авто</h2>

            <h3 className="mb-6 text-xl font-semibold">BMW</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
              {bmwModels.map((model) => (
                <Link
                  key={model.id}
                  href={`/services/${model.id}`}
                  className="group border border-black overflow-hidden hover:border-[#003366] transition-colors"
                >
                  <div className="aspect-video overflow-hidden bg-gray-100">
                    <img
                      src={model.image}
                      alt={model.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3 text-center font-semibold text-sm">
                    {model.name}
                  </div>
                </Link>
              ))}
            </div>

            <h3 className="mb-6 text-xl font-semibold">MINI</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {miniModels.map((model) => (
                <Link
                  key={model.id}
                  href={`/services/${model.id}`}
                  className="group border border-black overflow-hidden hover:border-[#003366] transition-colors"
                >
                  <div className="aspect-video overflow-hidden bg-gray-100">
                    <img
                      src={model.image}
                      alt={model.name}
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
              <h2 className="mb-8 pb-4 border-b-2 border-black">{t('services_maintenance')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {maintenanceServices.map((service, index) => (
                  <div key={index} className="border border-black p-6 flex flex-col">
                    <h3 className="mb-2 text-lg">{service.name}</h3>
                    <p className="text-sm text-gray-600 mb-4 flex-grow">{service.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-black">
                      <span className="font-semibold">0 ₽</span>
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
              <h2 className="mb-8 pb-4 border-b-2 border-black">{t('services_engine')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {engineServices.map((service, index) => (
                  <div key={index} className="border border-black p-6 flex flex-col">
                    <h3 className="mb-2 text-lg">{service.name}</h3>
                    <p className="text-sm text-gray-600 mb-4 flex-grow">{service.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-black">
                      <span className="font-semibold">0 ₽</span>
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
              <h2 className="mb-8 pb-4 border-b-2 border-black">{t('services_suspension')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {suspensionServices.map((service, index) => (
                  <div key={index} className="border border-black p-6 flex flex-col">
                    <h3 className="mb-2 text-lg">{service.name}</h3>
                    <p className="text-sm text-gray-600 mb-4 flex-grow">{service.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-black">
                      <span className="font-semibold">0 ₽</span>
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
        </div>
      </section>
    </div>
  );
}
