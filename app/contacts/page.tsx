'use client';

import { Phone, MapPin, Clock, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSiteSettings } from '@/hooks/use-site-settings';
import { useI18n } from '@/lib/i18n';

export default function ContactsPage() {
  const { settings } = useSiteSettings();
  const { t, language } = useI18n();

  const contactInfo = [
    {
      icon: Phone,
      title: language === 'ru' ? 'Телефон' : 'Phone',
      value: settings?.phone || '+7 (XXX) XXX-XX-XX',
      link: `tel:${settings?.phone?.replace(/[^0-9+]/g, '')}`
    },
    {
      icon: Mail,
      title: language === 'ru' ? 'Email' : 'Email',
      value: settings?.email || 'info@motorexpert.ru',
      link: `mailto:${settings?.email}`
    },
    {
      icon: MapPin,
      title: language === 'ru' ? 'Адрес' : 'Address',
      value: settings?.address || 'Москва, ул. Примерная, д. 1',
      link: null
    },
    {
      icon: Clock,
      title: language === 'ru' ? 'Часы работы' : 'Working Hours',
      value: settings?.working_hours || 'Пн-Пт: 9:00-19:00, Сб-Вс: 10:00-17:00',
      link: null
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              {language === 'ru' ? 'Контакты' : 'Contacts'}
            </h1>
            <p className="text-xl text-slate-600">
              {language === 'ru'
                ? 'Свяжитесь с нами любым удобным способом'
                : 'Contact us in any convenient way'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {contactInfo.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="border-2 hover:border-blue-500 transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-lg">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {item.link ? (
                      <a
                        href={item.link}
                        className="text-slate-700 hover:text-blue-600 transition-colors text-lg"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-slate-700 text-lg">{item.value}</p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="bg-gradient-to-br from-blue-600 to-blue-800 text-white border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">
                  {language === 'ru'
                    ? 'Готовы записаться на обслуживание?'
                    : 'Ready to schedule service?'}
                </h2>
                <p className="text-blue-100 mb-6 text-lg">
                  {language === 'ru'
                    ? 'Позвоните нам сейчас или напишите на email для записи'
                    : 'Call us now or email us to schedule an appointment'}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-blue-50 font-semibold text-lg px-8"
                  >
                    <a href={`tel:${settings?.phone?.replace(/[^0-9+]/g, '')}`}>
                      <Phone className="mr-2 h-5 w-5" />
                      {language === 'ru' ? 'Позвонить' : 'Call Now'}
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/10 font-semibold text-lg px-8"
                  >
                    <a href={`mailto:${settings?.email}`}>
                      <Mail className="mr-2 h-5 w-5" />
                      {language === 'ru' ? 'Написать' : 'Email Us'}
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {settings?.map_embed && (
            <Card className="mt-8 overflow-hidden">
              <CardContent className="p-0">
                <div
                  className="w-full h-96"
                  dangerouslySetInnerHTML={{ __html: settings.map_embed }}
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
