'use client';

import { useEffect, useState } from 'react';
import { useI18n } from '@/lib/i18n';
import { supabase } from '@/lib/supabase';
import { Star } from 'lucide-react';
import Link from 'next/link';

interface Review {
  id: string;
  author_name: string;
  avatar_url: string;
  rating: number;
  text_ru: string;
  text_en: string;
  date: string;
}

export default function Reviews() {
  const { language, t } = useI18n();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Отзывы о ремонте BMW Москва — Мотор Эксперт';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Отзывы клиентов о ремонте и обслуживании BMW в автосервисе Мотор Эксперт Москва. Реальные отзывы о качестве работ, ценах и сервисе. Средняя оценка 5.0 звезд.');
    }

    async function fetchReviews() {
      if (!supabase) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('date', { ascending: false });

      if (data && !error) {
        setReviews(data);
      }
      setLoading(false);
    }

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-xl">{language === 'ru' ? 'Загрузка...' : 'Loading...'}</div>
      </div>
    );
  }

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
      : '5.0';

  return (
    <div className="pt-16">
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-center mb-4 text-4xl lg:text-5xl">Отзывы о ремонте BMW в Москве</h1>
          <p className="text-center max-w-3xl mx-auto mb-8 text-lg">
            Реальные отзывы наших клиентов о ремонте и обслуживании BMW в автосервисе Мотор Эксперт. Оцените качество наших услуг по мнению тех, кто уже доверил нам свой автомобиль.
          </p>

          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-6 h-6 fill-[#003366] text-[#003366]" />
              ))}
              <span className="ml-3 text-xl font-semibold">
                {averageRating} / 5.0 ({reviews.length}{' '}
                {language === 'ru' ? 'отзывов' : 'reviews'})
              </span>
            </div>
          </div>

          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border border-black p-6">
                <div className="flex items-start">
                  <img
                    src={review.avatar_url}
                    alt={`отзыв клиента ${review.author_name} о ремонте BMW Москва`}
                    className="w-16 h-16 object-cover border border-black mr-4"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{review.author_name}</h3>
                      <span className="text-sm">
                        {new Date(review.date).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                    <div className="flex items-center mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= review.rating
                              ? 'fill-[#003366] text-[#003366]'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="leading-relaxed">
                      {language === 'ru' ? review.text_ru : review.text_en}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-semibold mb-4">Хотите оставить свой отзыв?</h2>
            <p className="mb-6">После ремонта вашего BMW мы будем рады получить обратную связь о качестве наших услуг</p>
            <Link
              href="/booking"
              className="inline-block bg-[#003366] text-white px-8 py-4 font-semibold hover:bg-[#004488] transition-colors"
            >
              Записаться на ремонт BMW
            </Link>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Мотор Эксперт',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: averageRating,
              reviewCount: reviews.length,
            },
            review: reviews.map((review) => ({
              '@type': 'Review',
              author: {
                '@type': 'Person',
                name: review.author_name,
              },
              datePublished: review.date,
              reviewRating: {
                '@type': 'Rating',
                ratingValue: review.rating,
              },
              reviewBody: review.text_ru,
            })),
          }),
        }}
      />
    </div>
  );
}
