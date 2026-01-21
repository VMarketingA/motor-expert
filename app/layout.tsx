import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { I18nProvider } from '@/lib/i18n';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'Мотор Эксперт - Ремонт и обслуживание BMW в Москве',
  description: 'Профессиональный ремонт и обслуживание BMW. ТО от 8000 ₽, гарантия 12 месяцев. Специализируемся на BMW более 15 лет.',
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
