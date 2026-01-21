import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { I18nProvider } from '@/lib/i18n';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'Ремонт BMW Москва — Автосервис Мотор Эксперт',
  description: 'Ремонт и обслуживание BMW в Москве от 2500₽. Диагностика, замена масла, ремонт двигателя N55, замена цепи ГРМ. Гарантия 12 месяцев. Запись: +7-495-114-55-52',
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
