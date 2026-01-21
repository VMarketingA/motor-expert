'use client';

import { useI18n } from '@/lib/i18n';

const galleryPhotos = [
  {
    id: 1,
    image_url: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Диагностика двигателя BMW X5 - выявление неисправностей системы впрыска',
  },
  {
    id: 2,
    image_url: 'https://images.pexels.com/photos/3807319/pexels-photo-3807319.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Замена цепи ГРМ на BMW 5-серии - профилактика растяжения',
  },
  {
    id: 3,
    image_url: 'https://images.pexels.com/photos/4489702/pexels-photo-4489702.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Ремонт турбины BMW 3-серии - восстановление заводской мощности',
  },
  {
    id: 4,
    image_url: 'https://images.pexels.com/photos/4489749/pexels-photo-4489749.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Замена тормозных колодок и дисков - обеспечение безопасности',
  },
  {
    id: 5,
    image_url: 'https://images.pexels.com/photos/5835359/pexels-photo-5835359.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Компьютерная диагностика BMW - считывание кодов ошибок',
  },
  {
    id: 6,
    image_url: 'https://images.pexels.com/photos/4480505/pexels-photo-4480505.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Замена масла и фильтров - регулярное техническое обслуживание',
  },
  {
    id: 7,
    image_url: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Ремонт пневмоподвески BMW X6 - устранение проседания',
  },
  {
    id: 8,
    image_url: 'https://images.pexels.com/photos/4489765/pexels-photo-4489765.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Замена рулевых тяг и наконечников - восстановление управляемости',
  },
  {
    id: 9,
    image_url: 'https://images.pexels.com/photos/3807386/pexels-photo-3807386.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Заправка и диагностика кондиционера - подготовка к летнему сезону',
  },
];

export default function Gallery() {
  const { t } = useI18n();

  return (
    <div className="pt-16">
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-center mb-12">{t('gallery_title')}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryPhotos.map((photo) => (
              <div key={photo.id} className="border border-black overflow-hidden">
                <div className="relative h-64">
                  <img
                    src={photo.image_url}
                    alt={photo.description}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm">{photo.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
