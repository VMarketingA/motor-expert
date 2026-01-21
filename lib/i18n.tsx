'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'ru' | 'en';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const translations = {
  ru: {
    nav_home: 'Главная',
    nav_about: 'О сервисе',
    nav_services: 'Услуги',
    nav_calculator: 'Калькулятор ТО',
    nav_gallery: 'Фото работ',
    nav_reviews: 'Отзывы',
    nav_testimonials: 'Благодарности',

    hero_title: 'Ремонт и обслуживание BMW в Москве',
    hero_subtitle: 'ТО от 8000 ₽, гарантия 12 месяцев',
    hero_cta: 'Записаться на ТО',

    problems_title: 'Двигатель вашего BMW барахлит?',
    problem_oil_title: 'Масложор',
    problem_oil_desc: 'Повышенный расход масла требует диагностики',
    problem_timing_title: 'Цепь ГРМ',
    problem_timing_desc: 'Растянутая цепь приводит к серьёзным поломкам',
    problem_turbo_title: 'Турбина',
    problem_turbo_desc: 'Потеря мощности и свист при разгоне',
    problem_vanos_title: 'VANOS',
    problem_vanos_desc: 'Проблемы с системой изменения фаз газораспределения',

    advantages_title: 'Почему выбирают нас',
    advantage_warranty: 'Гарантия',
    advantage_warranty_desc: '24 месяца',
    advantage_parts: 'Запчасти',
    advantage_parts_desc: 'Только оригинальные запчасти',
    advantage_price: 'Честные цены',
    advantage_price_desc: 'Без скрытых платежей',

    contacts_title: 'Контакты',
    contacts_phone: 'Телефон',
    contacts_address: 'Адрес',
    contacts_address_value: 'Автозаводская ул., 23, корп. 7, Москва',
    contacts_schedule: 'График работы',
    contacts_schedule_value: 'Ежедневно, 9:00-21:00',
    contacts_form_title: 'Обратная связь',
    contacts_form_name: 'Ваше имя',
    contacts_form_phone: 'Телефон',
    contacts_form_message: 'Сообщение',
    contacts_form_submit: 'Отправить',

    about_title: 'О нашем сервисе',
    about_text: 'Здесь будет текст о нас',

    services_title: 'Наши услуги',
    services_maintenance: 'Обслуживание BMW',
    services_engine: 'Ремонт двигателя',
    services_suspension: 'Ремонт подвески',
    services_from: 'от',
    services_book: 'Записаться',

    calculator_title: 'Калькулятор стоимости ТО',
    calculator_model: 'Выберите модель BMW',
    calculator_service: 'Выберите тип ТО',
    calculator_calculate: 'Рассчитать',
    calculator_result: 'Стоимость',
    calculator_service_basic: 'Базовое ТО (масло + фильтры)',
    calculator_service_full: 'Полное ТО',
    calculator_service_diagnostics: 'Диагностика',

    gallery_title: 'Фото наших работ',
    gallery_services_for: 'Услуги для этой модели авто',

    reviews_title: 'Отзывы клиентов',

    testimonials_title: 'Благодарности от клиентов',

    footer_developed: 'Разработано Motor Expert Team',

    book_service: 'Записаться на сервис',
    book_form_title: 'Запись на сервис',
    book_form_model: 'Модель автомобиля',
    book_form_service: 'Услуга',
    book_form_submit: 'Отправить заявку',
  },
  en: {
    nav_home: 'Home',
    nav_about: 'About',
    nav_services: 'Services',
    nav_calculator: 'TO Calculator',
    nav_gallery: 'Photo Gallery',
    nav_reviews: 'Reviews',
    nav_testimonials: 'Testimonials',

    hero_title: 'BMW Repair and Maintenance in Moscow',
    hero_subtitle: 'Maintenance from 8000 ₽, 12 months warranty',
    hero_cta: 'Book Maintenance',

    problems_title: 'Is Your BMW Engine Misbehaving?',
    problem_oil_title: 'Oil Consumption',
    problem_oil_desc: 'Excessive oil consumption requires diagnostics',
    problem_timing_title: 'Timing Chain',
    problem_timing_desc: 'Stretched chain leads to serious breakdowns',
    problem_turbo_title: 'Turbocharger',
    problem_turbo_desc: 'Power loss and whistling during acceleration',
    problem_vanos_title: 'VANOS',
    problem_vanos_desc: 'Variable valve timing system issues',

    advantages_title: 'Why Choose Us',
    advantage_warranty: 'Warranty',
    advantage_warranty_desc: '24 months',
    advantage_parts: 'Parts',
    advantage_parts_desc: 'Only original parts',
    advantage_price: 'Fair Prices',
    advantage_price_desc: 'No hidden fees',

    contacts_title: 'Contacts',
    contacts_phone: 'Phone',
    contacts_address: 'Address',
    contacts_address_value: 'Avtozavodskaya St., 23, bldg. 7, Moscow',
    contacts_schedule: 'Working Hours',
    contacts_schedule_value: 'Daily, 9:00-21:00',
    contacts_form_title: 'Contact Form',
    contacts_form_name: 'Your Name',
    contacts_form_phone: 'Phone',
    contacts_form_message: 'Message',
    contacts_form_submit: 'Send',

    about_title: 'About Our Service',
    about_text: 'Here will be text about us',

    services_title: 'Our Services',
    services_maintenance: 'BMW Maintenance',
    services_engine: 'Engine Repair',
    services_suspension: 'Suspension Repair',
    services_from: 'from',
    services_book: 'Book Now',

    calculator_title: 'Maintenance Cost Calculator',
    calculator_model: 'Select BMW Model',
    calculator_service: 'Select Service Type',
    calculator_calculate: 'Calculate',
    calculator_result: 'Cost',
    calculator_service_basic: 'Basic Maintenance (oil + filters)',
    calculator_service_full: 'Full Maintenance',
    calculator_service_diagnostics: 'Diagnostics',

    gallery_title: 'Our Work Photos',
    gallery_services_for: 'Services for this model',

    reviews_title: 'Customer Reviews',

    testimonials_title: 'Customer Testimonials',

    footer_developed: 'Developed by Motor Expert Team',

    book_service: 'Book Service',
    book_form_title: 'Service Booking',
    book_form_model: 'Car Model',
    book_form_service: 'Service',
    book_form_submit: 'Submit Request',
  },
};

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ru');

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved && (saved === 'ru' || saved === 'en')) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.ru] || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}
