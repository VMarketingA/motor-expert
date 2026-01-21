import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { I18nProvider } from '@/lib/i18n';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'Ремонт BMW Москва — Автосервис Мотор Эксперт',
  description: 'Ремонт бмв москва, автосервис бмв москва, ремонт двигателя бмв москва',
  keywords: ['ремонт бмв москва', 'автосервис бмв москва', 'ремонт двигателя бмв москва', 'замена масла бмв', 'замена цепи грм бмв', 'диагностика бмв', 'ремонт подвески бмв', 'ремонт турбины бмв', 'сервис бмв', 'техобслуживание бмв'],
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
