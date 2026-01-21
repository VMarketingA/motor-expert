import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <span className="text-xl font-bold text-blue-600">Motor</span>
              <span className="text-xl font-bold">Expert</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Профессиональный ремонт и обслуживание BMW
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Навигация</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link href="/" className="text-muted-foreground hover:text-foreground">
                Главная
              </Link>
              <Link href="/services" className="text-muted-foreground hover:text-foreground">
                Услуги
              </Link>
              <Link href="/gallery" className="text-muted-foreground hover:text-foreground">
                Галерея
              </Link>
              <Link href="/reviews" className="text-muted-foreground hover:text-foreground">
                Отзывы
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Контакты</h3>
            <div className="flex flex-col space-y-2 text-sm">
              <a href="tel:+79999999999" className="flex items-center text-muted-foreground hover:text-foreground">
                <Phone className="w-4 h-4 mr-2" />
                +7 (999) 999-99-99
              </a>
              <a href="mailto:info@motorexpert.ru" className="flex items-center text-muted-foreground hover:text-foreground">
                <Mail className="w-4 h-4 mr-2" />
                info@motorexpert.ru
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Адрес</h3>
            <div className="flex items-start text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 mr-2 mt-1" />
              <span>Москва, ул. Примерная, д. 123</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Motor Expert. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
