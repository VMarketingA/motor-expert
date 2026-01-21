import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, Award, Clock, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div>
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Профессиональный сервис BMW
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Ремонт двигателей, подвески и диагностика вашего автомобиля.
              Опытные мастера, оригинальные запчасти, гарантия качества.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" variant="secondary">
                Записаться на сервис
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                <Link href="/services">Наши услуги</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <Wrench className="w-10 h-10 text-blue-600 mb-2" />
                <CardTitle>Опытные мастера</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Более 15 лет опыта работы с автомобилями BMW
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Award className="w-10 h-10 text-blue-600 mb-2" />
                <CardTitle>Гарантия качества</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Гарантия на все виды работ до 12 месяцев
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="w-10 h-10 text-blue-600 mb-2" />
                <CardTitle>Быстрый сервис</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Оперативное выполнение работ в согласованные сроки
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="w-10 h-10 text-blue-600 mb-2" />
                <CardTitle>Оригинальные запчасти</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Используем только оригинальные и сертифицированные детали
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Наши услуги</h2>
            <p className="text-xl text-muted-foreground">
              Полный спектр услуг по обслуживанию и ремонту BMW
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Ремонт двигателя</CardTitle>
                <CardDescription>От диагностики до капремонта</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Замена цепи ГРМ</li>
                  <li>• Ремонт турбин</li>
                  <li>• Капитальный ремонт</li>
                  <li>• Диагностика двигателя</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Обслуживание</CardTitle>
                <CardDescription>Регулярное ТО вашего BMW</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Замена масла и фильтров</li>
                  <li>• Замена охлаждающей жидкости</li>
                  <li>• Компьютерная диагностика</li>
                  <li>• Проверка систем</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ремонт подвески</CardTitle>
                <CardDescription>Восстановление ходовой части</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Замена амортизаторов</li>
                  <li>• Ремонт рулевого управления</li>
                  <li>• Замена сайлентблоков</li>
                  <li>• Развал-схождение</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button size="lg">
              <Link href="/services">Все услуги</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/50">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-4">Готовы начать?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Свяжитесь с нами для консультации или записи на сервис
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg">
              Записаться
            </Button>
            <Button size="lg" variant="outline">
              <Link href="/contact">Контакты</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
