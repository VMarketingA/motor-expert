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
      value: settings?.phone_display || settings?.phone || '+7-495-114-55-52',
      link: `tel:${settings?.phone || '+74951145552'}`
    },
    {
      icon: Mail,
      title: language === 'ru' ? 'Email' : 'Email',
      value: settings?.email || 'info@motorbmw.ru',
      link: `mailto:${settings?.email || 'info@motorbmw.ru'}`
    },
    {
      icon: MapPin,
      title: language === 'ru' ? 'Адрес' : 'Address',
      value: settings?.address_full || t('contacts_address_value'),
      link: null
    },
    {
      icon: Clock,
      title: language === 'ru' ? 'График работы' : 'Working Hours',
      value: t('contacts_schedule_value'),
      link: null
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-16">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {language === 'ru' ? 'Контакты' : 'Contacts'}
            </h1>
            <p className="text-xl">
              {language === 'ru'
                ? 'Свяжитесь с нами любым удобным способом'
                : 'Contact us in any convenient way'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {contactInfo.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="border-2 border-black hover:border-[#003366] transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-lg">
                      <div className="p-3 bg-[#003366] text-white">
                        <Icon className="h-6 w-6" />
                      </div>
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {item.link ? (
                      <a
                        href={item.link}
                        className="hover:text-[#003366] transition-colors text-lg"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-lg">{item.value}</p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="bg-[#003366] text-white border-0 mb-8">
            <CardContent className="p-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">
                  {language === 'ru'
                    ? 'Готовы записаться на обслуживание?'
                    : 'Ready to schedule service?'}
                </h2>
                <p className="mb-6 text-lg text-gray-200">
                  {language === 'ru'
                    ? 'Позвоните нам сейчас или напишите на email для записи'
                    : 'Call us now or email us to schedule an appointment'}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-[#003366] hover:bg-gray-100 font-semibold text-lg px-8"
                  >
                    <a href={`tel:${settings?.phone || '+74951145552'}`}>
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
                    <a href={`mailto:${settings?.email || 'info@motorbmw.ru'}`}>
                      <Mail className="mr-2 h-5 w-5" />
                      {language === 'ru' ? 'Написать' : 'Email Us'}
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8 border-2 border-black">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">
                {language === 'ru' ? 'Мы в социальных сетях' : 'Follow Us'}
              </h2>
              <div className="flex justify-center space-x-6">
                <a
                  href="#"
                  className="flex flex-col items-center gap-2 hover:text-[#003366] transition-colors"
                  aria-label="Telegram"
                >
                  <div className="w-12 h-12 border-2 border-black flex items-center justify-center hover:border-[#003366] transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                    </svg>
                  </div>
                  <span className="text-sm">Telegram</span>
                </a>
                <a
                  href="https://vk.com/bmwmotorexpert"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 hover:text-[#003366] transition-colors"
                  aria-label="VK"
                >
                  <div className="w-12 h-12 border-2 border-black flex items-center justify-center hover:border-[#003366] transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.785 16.241s.288-.032.436-.194c.136-.148.131-.427.131-.427s-.019-1.304.58-1.496c.59-.189 1.348 1.26 2.152 1.818.607.422 1.068.329 1.068.329l2.146-.03s1.122-.07.59-.963c-.044-.073-.31-.659-1.597-1.863-1.348-1.26-1.168-1.056.456-3.235.99-1.328 1.386-2.139 1.263-2.486-.117-.332-.842-.244-.842-.244l-2.416.015s-.179-.025-.312.056c-.13.079-.214.265-.214.265s-.383 1.03-.892 1.907c-1.073 1.85-1.503 1.948-1.679 1.833-.408-.267-.306-1.073-.306-1.645 0-1.788.268-2.533-.522-2.725-.263-.064-.456-.106-1.128-.113-.862-.009-1.591.003-2.004.207-.275.136-.487.439-.358.456.16.022.522.099.714.362.248.341.239 1.107.239 1.107s.143 2.105-.333 2.365c-.328.179-.776-.186-1.74-1.86-.493-.853-.866-1.798-.866-1.798s-.072-.178-.2-.273c-.155-.115-.371-.151-.371-.151l-2.296.015s-.345.01-.472.161c-.113.134-.009.411-.009.411s1.804 4.268 3.845 6.418c1.873 1.973 4.007 1.844 4.007 1.844h.968z"/>
                    </svg>
                  </div>
                  <span className="text-sm">VKontakte</span>
                </a>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-2 border-black">
            <CardContent className="p-0">
              <iframe
                src="https://yandex.com/map-widget/v1/?um=constructor%3A64d4b5c3c68b2a4c29f5a51f3e8a0d5e5b9a0c5f5b8c5d5e5f5a5b5c5d5e5f5a&ll=37.641109%2C55.703353&z=17&indoorLevel=1"
                width="100%"
                height="400"
                frameBorder="0"
                className="w-full"
              />
              <div className="p-4 bg-white">
                <a
                  href="https://yandex.com/maps/org/bmv_motor_ekspert/33792368754/?indoorLevel=1&ll=37.641109%2C55.703353&z=17.06"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#003366] hover:underline"
                >
                  {language === 'ru' ? 'Открыть на Яндекс.Картах' : 'Open in Yandex Maps'}
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
