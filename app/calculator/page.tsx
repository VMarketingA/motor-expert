'use client';

import { useState, useEffect } from 'react';
import { useI18n } from '@/lib/i18n';
import { supabase } from '@/lib/supabase';

const bmwModels = [
  'E81', 'E82', 'E87', 'E88', 'F20', 'F21', 'F22', 'F23', 'F45',
  'E90', 'E93', 'F30', 'F34', 'F32', 'F33', 'F36',
  'E60', 'E61', 'F10', 'F11', 'G30', 'F07',
  'E63', 'E64', 'F12', 'F13', 'F06', 'G32',
  'E65', 'E66', 'F01', 'F02', 'G11', 'G12', 'G15',
  'X1', 'E84', 'F48', 'X2', 'F39', 'X3', 'F25', 'G01',
  'X4', 'F26', 'G02', 'X5', 'E53', 'E70', 'F15', 'G05',
  'X6', 'E71', 'F16', 'G06'
];

const miniModels = [
  'MINI Cabrio', 'MINI Clubman', 'MINI Countryman', 'MINI Coupe',
  'MINI Hatch', 'MINI Paceman', 'MINI Roadster'
];

interface ServiceItem {
  id: string;
  name_ru: string;
  name_en: string;
  name: string;
  price: number;
  category: string;
}

interface ServicesByCategory {
  [key: string]: ServiceItem[];
}

export default function Calculator() {
  const { t, language } = useI18n();
  const [model, setModel] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [servicesByCategory, setServicesByCategory] = useState<ServicesByCategory>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (language === 'ru') {
      document.title = 'Калькулятор стоимости ремонта BMW Москва — Мотор Эксперт';
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Рассчитайте стоимость ремонта BMW онлайн. Калькулятор цен на ТО, замену масла, ремонт двигателя, замену цепи ГРМ, ремонт подвески. Автосервис Мотор Эксперт Москва ☎ +7-495-114-55-52');
      }
    } else {
      document.title = 'BMW Repair Cost Calculator Moscow — Motor Expert';
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Calculate BMW repair costs online. Price calculator for maintenance, oil change, engine repair, timing chain replacement, suspension repair. Motor Expert Auto Service Moscow ☎ +7-495-114-55-52');
      }
    }

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', 'https://motorexpert.ru/calculator');
    } else {
      const newCanonical = document.createElement('link');
      newCanonical.setAttribute('rel', 'canonical');
      newCanonical.setAttribute('href', 'https://motorexpert.ru/calculator');
      document.head.appendChild(newCanonical);
    }

    loadServices();
  }, [language]);

  const loadServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('id, name_ru, name_en, price_from, category, is_active')
        .eq('is_active', true)
        .order('sort_order');

      if (error) throw error;

      if (data) {
        const services = data.map(service => ({
          id: service.id,
          name_ru: service.name_ru,
          name_en: service.name_en || service.name_ru,
          name: language === 'ru' ? service.name_ru : (service.name_en || service.name_ru),
          price: service.price_from,
          category: service.category
        }));

        const grouped: ServicesByCategory = {};
        services.forEach(service => {
          if (!grouped[service.category]) {
            grouped[service.category] = [];
          }
          grouped[service.category].push(service);
        });

        setServicesByCategory(grouped);

        const firstCategory = Object.keys(grouped)[0];
        if (firstCategory) {
          setExpandedCategory(firstCategory);
        }
      }
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setLoading(false);
    }
  };

  const allServices = Object.values(servicesByCategory).flat();

  const toggleService = (serviceName: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceName)
        ? prev.filter((s) => s !== serviceName)
        : [...prev, serviceName]
    );
  };

  const calculateTotal = () => {
    return selectedServices.reduce((total, serviceName) => {
      const service = allServices.find((s) => {
        const displayName = language === 'ru' ? s.name_ru : s.name_en;
        return displayName === serviceName;
      });
      return total + (service?.price || 0);
    }, 0);
  };

  const selectedServicesCount = selectedServices.length;

  const allModels = [
    ...bmwModels.map((m) => `BMW ${m}`),
    ...miniModels,
  ];

  if (loading) {
    return (
      <div className="pt-16">
        <section className="bg-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">{t('loading')}</div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-center mb-12">{t('calculator_title')}</h1>

          <div className="border border-black p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-semibold mb-3">
                  {t('calculator_model')}
                </label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full border border-black px-4 py-3 focus:outline-none focus:border-[#003366]"
                >
                  <option value="">--</option>
                  <optgroup label="BMW">
                    {bmwModels.map((m) => (
                      <option key={m} value={`BMW ${m}`}>
                        BMW {m}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="MINI">
                    {miniModels.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-lg font-semibold">
                    {t('calculator_select_services')}
                  </label>
                  {selectedServicesCount > 0 && (
                    <span className="text-sm font-medium bg-[#003366] text-white px-3 py-1 rounded">
                      {t('calculator_selected')}: {selectedServicesCount}
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  {Object.entries(servicesByCategory).map(([category, services]) => (
                    <div key={category} className="border border-black">
                      <button
                        type="button"
                        onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
                        className="w-full px-4 py-3 text-left font-semibold bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
                      >
                        <span>{category}</span>
                        <span>{expandedCategory === category ? '-' : '+'}</span>
                      </button>
                      {expandedCategory === category && (
                        <div className="p-4 space-y-2 max-h-64 overflow-y-auto">
                          {services.map((service) => {
                            const displayName = language === 'ru' ? service.name_ru : service.name_en;
                            return (
                              <label key={service.id} className="flex items-center cursor-pointer hover:bg-gray-50 p-2">
                                <input
                                  type="checkbox"
                                  checked={selectedServices.includes(displayName)}
                                  onChange={() => toggleService(displayName)}
                                  className="mr-3 w-4 h-4"
                                />
                                <span className="flex-1 text-sm">{displayName}</span>
                                <span className="text-sm font-medium">
                                  {service.price === 0 ? t('services_free') : `${service.price.toLocaleString('ru-RU')} ₽`}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {selectedServicesCount > 0 && (
                <div className="mt-8 p-6 border-2 border-black bg-gray-50">
                  <div className="text-sm font-medium mb-2">
                    {t('calculator_selected_services')}: <span className="font-bold">{selectedServicesCount}</span>
                  </div>
                  <ul className="space-y-1 mb-4">
                    {selectedServices.map((serviceName) => {
                      const foundService = allServices.find((s) => {
                        const displayName = language === 'ru' ? s.name_ru : s.name_en;
                        return displayName === serviceName;
                      });
                      return (
                        <li key={serviceName} className="text-sm flex justify-between">
                          <span>{serviceName}</span>
                          <span className="font-medium">
                            {foundService?.price === 0 ? t('services_free') : `${foundService?.price.toLocaleString('ru-RU') || 0} ₽`}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="border-t-2 border-black pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">{t('calculator_result')}:</span>
                      <span className="text-2xl font-bold text-[#003366]">{calculateTotal().toLocaleString('ru-RU')} ₽</span>
                    </div>
                  </div>
                  {model && (
                    <p className="mt-4 text-sm text-center text-gray-600">
                      {t('calculator_calculation_for')}: {model}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 text-center text-sm">
            <p>{t('calculator_note')}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
