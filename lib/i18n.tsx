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

    hero_title: 'Ремонт BMW в Москве — Автосервис Мотор Эксперт',
    hero_subtitle: 'Профессиональный ремонт и обслуживание BMW и MINI. Компьютерная диагностика, замена масла, ремонт двигателя, замена цепи ГРМ, ремонт турбин, ремонт подвески. Гарантия 24 месяца.',
    hero_cta: 'Записаться на ремонт',
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

    advantages_title: 'Почему выбирают наш автосервис BMW в Москве',
    popular_services_title: 'Популярные услуги ремонта BMW',
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

    about_title: 'Автосервис BMW Мотор Эксперт в Москве',
    about_subtitle: 'Профессиональный ремонт BMW в Москве',
    about_text: 'Автосервис BMW "Мотор Эксперт" — это профессиональный сервисный центр по ремонту и обслуживанию автомобилей BMW и MINI в Москве, специализирующийся исключительно на баварских автомобилях.',
    about_experience: 'Более 10 лет опыта',
    about_clients: 'Более 1000 довольных клиентов',
    about_warranty: 'Гарантия 24 месяца',
    about_our_services: 'Наши услуги',
    about_service_1: 'Компьютерная диагностика BMW всех систем',
    about_service_2: 'Ремонт двигателя BMW: N20, N47, N55, B58, B48',
    about_service_3: 'Замена цепи ГРМ BMW с гарантией',
    about_service_4: 'Ремонт турбин BMW всех моделей',
    about_service_5: 'Ремонт подвески BMW и 3D сход-развал',
    about_service_6: 'Замена масла BMW с оригинальными материалами',
    about_service_7: 'Техническое обслуживание BMW любой сложности',
    about_models_title: 'Модели BMW, которые мы обслуживаем',
    about_models_text: 'Ремонт BMW E81, E82, E87, E88, F20, F21, F22, F23, F45, E90, E93, F30, F34, F32, F33, F36, E60, E61, F10, F11, G30, F07, E63, E64, F12, F13, F06, G32, E65, E66, F01, F02, G11, G12, G15, X1, E84, F48, X2, F39, X3, F25, G01, X4, F26, G02, X5, E53, E70, F15, G05, X6, E71, F16, G06, и ремонт MINI: Cabrio, Clubman, Countryman, Coupe, Hatch, Paceman, Roadster.',
    about_contacts_title: 'Контакты автосервиса BMW в Москве',

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
    reviews_description: 'Более 500 довольных клиентов. Средняя оценка 5.0',
    read_reviews: 'Читать отзывы',

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
    footer_developed: 'Разработано VMarketing',
    footer_rights: 'Все права защищены',
    footer_description: 'Профессиональный ремонт и обслуживание BMW в Москве',
    footer_navigation: 'Навигация',
    footer_privacy_policy: 'Политика конфиденциальности',

    loading: 'Загрузка...',
    error: 'Ошибка',
    try_again: 'Попробовать снова',
    open_on_maps: 'Открыть на Яндекс Картах',
    coming_soon: 'Скоро здесь появятся благодарности',
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

    hero_title: 'BMW Repair in Moscow — Motor Expert Auto Service',
    hero_subtitle: 'Professional BMW and MINI repair and maintenance. Computer diagnostics, oil change, engine repair, timing chain replacement, turbo repair, suspension repair. 24-month warranty.',
    hero_cta: 'Book Repair',
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

    advantages_title: 'Why Choose Our BMW Auto Service in Moscow',
    popular_services_title: 'Popular BMW Repair Services',
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

    about_title: 'BMW Motor Expert Auto Service in Moscow',
    about_subtitle: 'Professional BMW Repair in Moscow',
    about_text: 'BMW Motor Expert Auto Service is a professional service center for BMW and MINI repair and maintenance in Moscow, specializing exclusively in Bavarian automobiles.',
    about_experience: 'Over 10 years of experience',
    about_clients: 'Over 1000 satisfied customers',
    about_warranty: '24-month warranty',
    about_our_services: 'Our Services',
    about_service_1: 'Computer diagnostics of all BMW systems',
    about_service_2: 'BMW engine repair: N20, N47, N55, B58, B48',
    about_service_3: 'BMW timing chain replacement with warranty',
    about_service_4: 'BMW turbo repair for all models',
    about_service_5: 'BMW suspension repair and 3D wheel alignment',
    about_service_6: 'BMW oil change with original materials',
    about_service_7: 'BMW technical maintenance of any complexity',
    about_models_title: 'BMW Models We Service',
    about_models_text: 'BMW repair: E81, E82, E87, E88, F20, F21, F22, F23, F45, E90, E93, F30, F34, F32, F33, F36, E60, E61, F10, F11, G30, F07, E63, E64, F12, F13, F06, G32, E65, E66, F01, F02, G11, G12, G15, X1, E84, F48, X2, F39, X3, F25, G01, X4, F26, G02, X5, E53, E70, F15, G05, X6, E71, F16, G06, and MINI repair: Cabrio, Clubman, Countryman, Coupe, Hatch, Paceman, Roadster.',
    about_contacts_title: 'BMW Auto Service Contacts in Moscow',

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
    reviews_description: 'Over 500 satisfied customers. Average rating 5.0',
    read_reviews: 'Read Reviews',

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
    footer_developed: 'Developed by VMarketing',
    footer_rights: 'All rights reserved',
    footer_description: 'Professional BMW repair and maintenance in Moscow',
    footer_navigation: 'Navigation',
    footer_privacy_policy: 'Privacy Policy',

    loading: 'Loading...',
    error: 'Error',
    try_again: 'Try Again',
    open_on_maps: 'Open on Yandex Maps',
    coming_soon: 'Testimonials coming soon',
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
