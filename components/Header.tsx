'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Button } from './ui/button';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">Motor</span>
            <span className="text-2xl font-bold">Expert</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/" className="transition-colors hover:text-blue-600">
            Главная
          </Link>
          <Link href="/services" className="transition-colors hover:text-blue-600">
            Услуги
          </Link>
          <Link href="/gallery" className="transition-colors hover:text-blue-600">
            Галерея
          </Link>
          <Link href="/reviews" className="transition-colors hover:text-blue-600">
            Отзывы
          </Link>
          <Link href="/contact" className="transition-colors hover:text-blue-600">
            Контакты
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <a href="tel:+79999999999" className="flex items-center text-sm hover:text-blue-600">
            <Phone className="w-4 h-4 mr-2" />
            +7 (999) 999-99-99
          </a>
          <Button>Записаться</Button>
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="container py-4 flex flex-col space-y-4">
            <Link href="/" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
              Главная
            </Link>
            <Link href="/services" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
              Услуги
            </Link>
            <Link href="/gallery" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
              Галерея
            </Link>
            <Link href="/reviews" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
              Отзывы
            </Link>
            <Link href="/contact" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
              Контакты
            </Link>
            <div className="flex flex-col space-y-2 pt-4 border-t">
              <a href="tel:+79999999999" className="flex items-center text-sm">
                <Phone className="w-4 h-4 mr-2" />
                +7 (999) 999-99-99
              </a>
              <a href="mailto:info@motorexpert.ru" className="flex items-center text-sm">
                <Mail className="w-4 h-4 mr-2" />
                info@motorexpert.ru
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
