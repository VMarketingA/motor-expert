import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { I18nProvider } from '@/lib/i18n';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://motorexpert.ru'),
  title: 'Лучший автосервис БМВ в Москве рядом со мной',
  description: 'Профессиональный ремонт BMW в Москве ⚡ Замена масла от 1000₽ ⚡ Ремонт двигателя от 80000₽ ⚡ Замена цепи ГРМ от 35000₽ ⚡ Гарантия 24 месяца ☎ +7-495-114-55-52',
  keywords: [
    'ремонт бмв москва',
    'автосервис бмв москва',
    'ремонт двигателя бмв москва',
    'замена масла бмв москва',
    'замена цепи грм бмв',
    'диагностика бмв москва',
    'ремонт подвески бмв',
    'ремонт турбины бмв',
    'сервис бмв москва',
    'техобслуживание бмв',
    'ремонт bmw москва',
    'автосервис bmw',
    'ремонт мини москва',
    'ремонт mini cooper москва',
    'замена масла bmw',
    'диагностика bmw',
    'ремонт n55',
    'ремонт n47',
    'ремонт b58',
    'замена цепи грм n47',
    'замена цепи грм n55'
  ],
  authors: [{ name: 'Мотор Эксперт' }],
  creator: 'Мотор Эксперт',
  publisher: 'Мотор Эксперт',
  formatDetection: {
    telephone: true,
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://motorexpert.ru',
    siteName: 'Мотор Эксперт — Автосервис BMW Москва',
    title: 'Лучший автосервис БМВ в Москве рядом со мной',
    description: 'Профессиональный ремонт BMW в Москве. Замена масла от 1000₽, ремонт двигателя от 80000₽, замена цепи ГРМ от 35000₽. Гарантия 24 месяца',
    images: [
      {
        url: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg',
        width: 1200,
        height: 630,
        alt: 'Автосервис BMW Мотор Эксперт',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <I18nProvider>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
