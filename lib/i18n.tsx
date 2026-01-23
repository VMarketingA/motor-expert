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
    nav_calculator: 'Калькулятор',
    nav_gallery: 'Галерея',
    nav_reviews: 'Отзывы',
    nav_testimonials: 'Благодарности',
    nav_booking: 'Запись',

    hero_title: 'Профессиональный ремонт и обслуживание BMW в Москве',
    hero_subtitle: 'Качественный сервис с гарантией 24 месяца',
    hero_cta: 'Записаться на сервис',
    hero_phone: 'Позвонить',

    problems_title: 'Проблемы с двигателем BMW?',
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
    advantage_warranty_desc: '24 месяца на все работы',
    advantage_parts: 'Оригинальные запчасти',
    advantage_parts_desc: 'Работаем только с проверенными поставщиками',
    advantage_price: 'Честные цены',
    advantage_price_desc: 'Без скрытых платежей и доплат',
    advantage_experience: 'Опыт',
    advantage_experience_desc: 'Более 10 лет работы с BMW',

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

    about_title: 'О нашем автосервисе',
    about_subtitle: 'Профессиональный ремонт BMW в Москве',
    about_text: 'Мотор Эксперт - специализированный автосервис по ремонту и обслуживанию автомобилей BMW и MINI. Мы предлагаем полный спектр услуг от диагностики до капитального ремонта двигателя.',
    about_experience: 'Более 10 лет опыта',
    about_clients: 'Более 1000 довольных клиентов',
    about_warranty: 'Гарантия 24 месяца',

    services_title: 'Услуги по ремонту и обслуживанию BMW в Москве',
    services_subtitle: 'Профессиональный автосервис BMW Москва. Ремонт двигателя, замена цепи ГРМ, ремонт турбин, диагностика, ремонт подвески. Работаем со всеми моделями BMW и MINI. Гарантия 24 месяца.',
    services_models_title: 'Ремонт BMW по моделям в Москве',
    services_bmw: 'Ремонт BMW',
    services_mini: 'Ремонт MINI',
    services_from: 'от',
    services_book: 'Записаться',
    services_free: 'Бесплатно',
    services_calculate: 'Рассчитать стоимость',
    services_reviews: 'Отзывы клиентов',

    calculator_title: 'Калькулятор стоимости ремонта BMW',
    calculator_model: 'Модель автомобиля',
    calculator_select_services: 'Выберите услуги',
    calculator_selected: 'Выбрано',
    calculator_selected_services: 'Выбрано услуг',
    calculator_result: 'Итого',
    calculator_calculation_for: 'Расчёт для',
    calculator_note: '* Указанная стоимость является приблизительной. Точную цену уточняйте у мастера после диагностики.',

    gallery_title: 'Галерея наших работ',
    gallery_subtitle: 'Фотографии выполненных работ в нашем автосервисе',

    reviews_title: 'Отзывы клиентов',
    reviews_subtitle: 'Что говорят наши клиенты о нашем сервисе',

    testimonials_title: 'Благодарности от клиентов',
    testimonials_subtitle: 'Письменные благодарности от наших довольных клиентов',

    booking_title: 'Запись на сервис',
    booking_subtitle: 'Заполните форму и мы свяжемся с вами в ближайшее время',
    booking_name: 'Ваше имя',
    booking_phone: 'Телефон',
    booking_model: 'Модель автомобиля',
    booking_service: 'Услуга',
    booking_date: 'Желаемая дата',
    booking_time: 'Время',
    booking_message: 'Комментарий',
    booking_submit: 'Отправить заявку',
    booking_success: 'Спасибо! Мы свяжемся с вами в ближайшее время.',
    booking_error: 'Произошла ошибка. Пожалуйста, позвоните нам по телефону.',

    footer_about: 'О нас',
    footer_services: 'Услуги',
    footer_contact: 'Контакты',
    footer_developed: 'Разработано Motor Expert Team',
    footer_rights: 'Все права защищены',

    loading: 'Загрузка...',
    error: 'Ошибка',
    try_again: 'Попробовать снова',
  },
  en: {
    nav_home: 'Home',
    nav_about: 'About',
    nav_services: 'Services',
    nav_calculator: 'Calculator',
    nav_gallery: 'Gallery',
    nav_reviews: 'Reviews',
    nav_testimonials: 'Testimonials',
    nav_booking: 'Booking',

    hero_title: 'Professional BMW Repair and Maintenance in Moscow',
    hero_subtitle: 'Quality service with 24-month warranty',
    hero_cta: 'Book Service',
    hero_phone: 'Call Now',

    problems_title: 'BMW Engine Problems?',
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
    advantage_warranty_desc: '24 months on all work',
    advantage_parts: 'Original Parts',
    advantage_parts_desc: 'We work only with verified suppliers',
    advantage_price: 'Fair Prices',
    advantage_price_desc: 'No hidden fees or extra charges',
    advantage_experience: 'Experience',
    advantage_experience_desc: 'Over 10 years working with BMW',

    contacts_title: 'Contacts',
    contacts_phone: 'Phone',
    contacts_address: 'Address',
    contacts_address_value: 'Avtozavodskaya St., 23, bldg. 7, Moscow',
    contacts_schedule: 'Working Hours',
    contacts_schedule_value: 'Daily, 9:00 AM - 9:00 PM',
    contacts_form_title: 'Contact Us',
    contacts_form_name: 'Your Name',
    contacts_form_phone: 'Phone',
    contacts_form_message: 'Message',
    contacts_form_submit: 'Send',

    about_title: 'About Our Auto Service',
    about_subtitle: 'Professional BMW Repair in Moscow',
    about_text: 'Motor Expert is a specialized auto service for BMW and MINI repair and maintenance. We offer a full range of services from diagnostics to complete engine overhaul.',
    about_experience: 'Over 10 years of experience',
    about_clients: 'Over 1000 satisfied customers',
    about_warranty: '24-month warranty',

    services_title: 'BMW Repair and Maintenance Services in Moscow',
    services_subtitle: 'Professional BMW auto service in Moscow. Engine repair, timing chain replacement, turbo repair, diagnostics, suspension repair. We work with all BMW and MINI models. 24-month warranty.',
    services_models_title: 'BMW Repair by Model in Moscow',
    services_bmw: 'BMW Repair',
    services_mini: 'MINI Repair',
    services_from: 'from',
    services_book: 'Book Now',
    services_free: 'Free',
    services_calculate: 'Calculate Cost',
    services_reviews: 'Customer Reviews',

    calculator_title: 'BMW Repair Cost Calculator',
    calculator_model: 'Car Model',
    calculator_select_services: 'Select Services',
    calculator_selected: 'Selected',
    calculator_selected_services: 'Services selected',
    calculator_result: 'Total',
    calculator_calculation_for: 'Calculation for',
    calculator_note: '* The stated cost is approximate. Please confirm the exact price with a technician after diagnostics.',

    gallery_title: 'Our Work Gallery',
    gallery_subtitle: 'Photos of completed work at our auto service',

    reviews_title: 'Customer Reviews',
    reviews_subtitle: 'What our customers say about our service',

    testimonials_title: 'Customer Testimonials',
    testimonials_subtitle: 'Written testimonials from our satisfied customers',

    booking_title: 'Service Booking',
    booking_subtitle: 'Fill out the form and we will contact you shortly',
    booking_name: 'Your Name',
    booking_phone: 'Phone',
    booking_model: 'Car Model',
    booking_service: 'Service',
    booking_date: 'Preferred Date',
    booking_time: 'Time',
    booking_message: 'Comment',
    booking_submit: 'Submit Request',
    booking_success: 'Thank you! We will contact you shortly.',
    booking_error: 'An error occurred. Please call us.',

    footer_about: 'About Us',
    footer_services: 'Services',
    footer_contact: 'Contact',
    footer_developed: 'Developed by Motor Expert Team',
    footer_rights: 'All rights reserved',

    loading: 'Loading...',
    error: 'Error',
    try_again: 'Try Again',
  },
};

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

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
