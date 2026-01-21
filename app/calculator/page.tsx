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
  name: string;
  price: number;
  category: string;
}

export default function Calculator() {
  const { t } = useI18n();
  const [model, setModel] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [expandedCategory, setExpandedCategory] = useState<string | null>('maintenance');
  const [maintenanceServices, setMaintenanceServices] = useState<ServiceItem[]>([]);
  const [engineServices, setEngineServices] = useState<ServiceItem[]>([]);
  const [suspensionServices, setSuspensionServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Калькулятор стоимости ремонта BMW Москва — Мотор Эксперт';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Рассчитайте стоимость ремонта BMW онлайн. Калькулятор цен на ТО, замену масла, ремонт двигателя, замену цепи ГРМ, ремонт подвески. Автосервис Мотор Эксперт Москва ☎ +7-495-114-55-52');
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
  }, []);

  const loadServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('id, name_ru, price_from, category, is_active')
        .eq('is_active', true)
        .order('sort_order');

      if (error) throw error;

      if (data) {
        const services = data.map(service => ({
          id: service.id,
          name: service.name_ru,
          price: service.price_from,
          category: service.category
        }));

        setMaintenanceServices(services.filter(s => s.category === 'maintenance'));
        setEngineServices(services.filter(s => s.category === 'engine'));
        setSuspensionServices(services.filter(s => s.category === 'suspension'));
      }
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setLoading(false);
    }
  };

  const allServices = [
    ...maintenanceServices,
    ...engineServices,
    ...suspensionServices,
  ];

  const toggleService = (serviceName: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceName)
        ? prev.filter((s) => s !== serviceName)
        : [...prev, serviceName]
    );
  };

  const calculateTotal = () => {
    return selectedServices.reduce((total, serviceName) => {
      const service = allServices.find((s) => s.name === serviceName);
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
            <div className="text-center">Загрузка...</div>
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
                    Выберите услуги
                  </label>
                  {selectedServicesCount > 0 && (
                    <span className="text-sm font-medium bg-[#003366] text-white px-3 py-1 rounded">
                      Выбрано: {selectedServicesCount}
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="border border-black">
                    <button
                      type="button"
                      onClick={() => setExpandedCategory(expandedCategory === 'maintenance' ? null : 'maintenance')}
                      className="w-full px-4 py-3 text-left font-semibold bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
                    >
                      <span>{t('services_maintenance')}</span>
                      <span>{expandedCategory === 'maintenance' ? '-' : '+'}</span>
                    </button>
                    {expandedCategory === 'maintenance' && (
                      <div className="p-4 space-y-2 max-h-64 overflow-y-auto">
                        {maintenanceServices.map((service) => (
                          <label key={service.name} className="flex items-center cursor-pointer hover:bg-gray-50 p-2">
                            <input
                              type="checkbox"
                              checked={selectedServices.includes(service.name)}
                              onChange={() => toggleService(service.name)}
                              className="mr-3 w-4 h-4"
                            />
                            <span className="flex-1 text-sm">{service.name}</span>
                            <span className="text-sm font-medium">{service.price} ₽</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="border border-black">
                    <button
                      type="button"
                      onClick={() => setExpandedCategory(expandedCategory === 'engine' ? null : 'engine')}
                      className="w-full px-4 py-3 text-left font-semibold bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
                    >
                      <span>{t('services_engine')}</span>
                      <span>{expandedCategory === 'engine' ? '-' : '+'}</span>
                    </button>
                    {expandedCategory === 'engine' && (
                      <div className="p-4 space-y-2 max-h-64 overflow-y-auto">
                        {engineServices.map((service) => (
                          <label key={service.name} className="flex items-center cursor-pointer hover:bg-gray-50 p-2">
                            <input
                              type="checkbox"
                              checked={selectedServices.includes(service.name)}
                              onChange={() => toggleService(service.name)}
                              className="mr-3 w-4 h-4"
                            />
                            <span className="flex-1 text-sm">{service.name}</span>
                            <span className="text-sm font-medium">{service.price} ₽</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="border border-black">
                    <button
                      type="button"
                      onClick={() => setExpandedCategory(expandedCategory === 'suspension' ? null : 'suspension')}
                      className="w-full px-4 py-3 text-left font-semibold bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
                    >
                      <span>{t('services_suspension')}</span>
                      <span>{expandedCategory === 'suspension' ? '-' : '+'}</span>
                    </button>
                    {expandedCategory === 'suspension' && (
                      <div className="p-4 space-y-2 max-h-64 overflow-y-auto">
                        {suspensionServices.map((service) => (
                          <label key={service.name} className="flex items-center cursor-pointer hover:bg-gray-50 p-2">
                            <input
                              type="checkbox"
                              checked={selectedServices.includes(service.name)}
                              onChange={() => toggleService(service.name)}
                              className="mr-3 w-4 h-4"
                            />
                            <span className="flex-1 text-sm">{service.name}</span>
                            <span className="text-sm font-medium">{service.price} ₽</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {selectedServicesCount > 0 && (
                <div className="mt-8 p-6 border-2 border-black bg-gray-50">
                  <div className="text-sm font-medium mb-2">
                    Выбрано услуг: <span className="font-bold">{selectedServicesCount}</span>
                  </div>
                  <ul className="space-y-1 mb-4">
                    {selectedServices.map((service) => (
                      <li key={service} className="text-sm flex justify-between">
                        <span>{service}</span>
                        <span className="font-medium">{allServices.find((s) => s.name === service)?.price.toLocaleString('ru-RU') || 0} ₽</span>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t-2 border-black pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">{t('calculator_result')}:</span>
                      <span className="text-2xl font-bold text-[#003366]">{calculateTotal().toLocaleString('ru-RU')} ₽</span>
                    </div>
                  </div>
                  {model && (
                    <p className="mt-4 text-sm text-center text-gray-600">
                      Расчёт для: {model}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 text-center text-sm">
            <p>
              * Указанная стоимость является приблизительной. Точную цену уточняйте у мастера после диагностики.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
