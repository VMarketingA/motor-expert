'use client';

import { useEffect, useState } from 'react';
import { useI18n } from '@/lib/i18n';
import Image from 'next/image';

interface Certificate {
  id: number;
  title: string;
  titleEn: string;
  image: string;
  description: string;
  descriptionEn: string;
}

const certificates: Certificate[] = [
  {
    id: 1,
    title: 'Сертификат LIQUI MOLY',
    titleEn: 'LIQUI MOLY Certificate',
    image: 'https://motorbmw.ru/upload/iblock/027/0271528d65a73dad2683855eb04b4f93.JPG',
    description: 'Технический партнер LIQUI MOLY. Мы используем для обслуживания автомобилей оригинальную продукцию бренда.',
    descriptionEn: 'LIQUI MOLY technical partner. We use original brand products for vehicle maintenance.'
  },
  {
    id: 2,
    title: 'Сертификат Авилон АГ',
    titleEn: 'Avilon AG Certificate',
    image: 'https://motorbmw.ru/upload/iblock/55c/55c707501be84ff874a3012bf8efcfdc.jpeg',
    description: 'Партнер Официального дилера BMW АО "Авилон АГ" в рамках программы "Партнеры по качеству BMW".',
    descriptionEn: 'Partner of BMW Official Dealer Avilon AG as part of the BMW Quality Partners program.'
  },
  {
    id: 3,
    title: 'Сертификат соответствия ГОСТ Р',
    titleEn: 'GOST R Certificate',
    image: 'https://motorbmw.ru/upload/iblock/8b6/8b6948467349181e4ab3228a8b0b04f9.jpg',
    description: 'Сертификат соответствия на техническое обслуживание и ремонт транспортных средств, машин и оборудования.',
    descriptionEn: 'Conformity certificate for technical maintenance and repair of vehicles, machinery and equipment.'
  },
  {
    id: 4,
    title: 'Приложение к сертификату ГОСТ Р',
    titleEn: 'GOST R Certificate Appendix',
    image: 'https://motorbmw.ru/upload/iblock/eda/eda1c7bf5e100659ffc2814e48bb96d9.jpg',
    description: 'Перечень услуг (работ), на которые распространяется действие сертификата соответствия.',
    descriptionEn: 'List of services covered by the conformity certificate.'
  }
];

export default function Testimonials() {
  const { t, language } = useI18n();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (language === 'ru') {
      document.title = 'Благодарности и сертификаты — Ремонт BMW Москва | Мотор Эксперт';
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Сертификаты и благодарности автосервиса BMW Мотор Эксперт. Официальный партнер BMW Group и LIQUI MOLY. Сертифицированное обслуживание BMW и MINI ☎ +7-495-114-55-52');
      }
    } else {
      document.title = 'Certificates and Testimonials — BMW Repair Moscow | Motor Expert';
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Certificates and testimonials of BMW Motor Expert Auto Service. Official BMW Group and LIQUI MOLY partner. Certified BMW and MINI service ☎ +7-495-114-55-52');
      }
    }

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', 'https://motorexpert.ru/testimonials');
    } else {
      const newCanonical = document.createElement('link');
      newCanonical.setAttribute('rel', 'canonical');
      newCanonical.setAttribute('href', 'https://motorexpert.ru/testimonials');
      document.head.appendChild(newCanonical);
    }
  }, [language]);

  return (
    <div className="pt-16">
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            {language === 'ru' ? 'Сертификаты и благодарности' : 'Certificates and Testimonials'}
          </h1>
          <p className="text-center text-gray-600 mb-16 max-w-3xl mx-auto">
            {language === 'ru'
              ? 'Мы гордимся нашими партнерскими отношениями и сертификатами качества, подтверждающими высокий уровень обслуживания'
              : 'We are proud of our partnerships and quality certificates confirming our high level of service'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => setSelectedImage(cert.image)}
              >
                <div className="relative h-96 bg-white">
                  <Image
                    src={cert.image}
                    alt={language === 'ru' ? cert.title : cert.titleEn}
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    {language === 'ru' ? cert.title : cert.titleEn}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'ru' ? cert.description : cert.descriptionEn}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#003366] text-white rounded-lg p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              {language === 'ru' ? 'Доверьте свой BMW профессионалам' : 'Trust Your BMW to Professionals'}
            </h2>
            <p className="text-lg mb-6">
              {language === 'ru'
                ? 'Официальные сертификаты и многолетний опыт работы с автомобилями BMW и MINI'
                : 'Official certificates and years of experience with BMW and MINI vehicles'}
            </p>
            <a
              href="tel:+74951145552"
              className="inline-block bg-white text-[#003366] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              +7 (495) 114-55-52
            </a>
          </div>
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full">
            <Image
              src={selectedImage}
              alt="Certificate"
              fill
              className="object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
