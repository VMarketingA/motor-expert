import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="container py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Контакты</h1>
        <p className="text-xl text-muted-foreground">
          Свяжитесь с нами удобным для вас способом
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <Phone className="w-10 h-10 text-blue-600 mb-2" />
            <CardTitle>Телефон</CardTitle>
            <CardDescription>Позвоните нам в любое удобное время</CardDescription>
          </CardHeader>
          <CardContent>
            <a href="tel:+79999999999" className="text-2xl font-semibold hover:text-blue-600">
              +7 (999) 999-99-99
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Mail className="w-10 h-10 text-blue-600 mb-2" />
            <CardTitle>Email</CardTitle>
            <CardDescription>Напишите нам на электронную почту</CardDescription>
          </CardHeader>
          <CardContent>
            <a href="mailto:info@motorexpert.ru" className="text-2xl font-semibold hover:text-blue-600">
              info@motorexpert.ru
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <MapPin className="w-10 h-10 text-blue-600 mb-2" />
            <CardTitle>Адрес</CardTitle>
            <CardDescription>Наш автосервис находится по адресу</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              г. Москва, ул. Примерная, д. 123
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Clock className="w-10 h-10 text-blue-600 mb-2" />
            <CardTitle>Режим работы</CardTitle>
            <CardDescription>Мы работаем для вас</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              Пн-Пт: 9:00 - 20:00<br />
              Сб: 10:00 - 18:00<br />
              Вс: выходной
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Запись на сервис</CardTitle>
          <CardDescription>
            Оставьте заявку, и мы свяжемся с вами в ближайшее время
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Ваше имя
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Иван Иванов"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">
                Телефон
              </label>
              <input
                type="tel"
                id="phone"
                className="w-full px-4 py-2 border rounded-md"
                placeholder="+7 (999) 999-99-99"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Комментарий
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Опишите вашу проблему или услугу"
              />
            </div>
            <Button size="lg" type="submit">
              Отправить заявку
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
