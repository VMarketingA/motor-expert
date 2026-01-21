import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import type { Database } from '@/types/database.types';

type Review = Database['public']['Tables']['reviews']['Row'];
type Testimonial = Database['public']['Tables']['testimonials']['Row'];

async function getReviews(): Promise<Review[]> {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }

  return data || [];
}

async function getTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }

  return data || [];
}

export default async function ReviewsPage() {
  const reviews = await getReviews();
  const testimonials = await getTestimonials();

  return (
    <div className="container py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Отзывы клиентов</h1>
        <p className="text-xl text-muted-foreground">
          Что говорят наши клиенты о работе Motor Expert
        </p>
      </div>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Благодарности</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="relative aspect-square overflow-hidden rounded-lg shadow-lg">
              <Image
                src={testimonial.image_url}
                alt={`Благодарность от ${testimonial.author_name}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-8">Отзывы</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={review.avatar_url}
                      alt={review.author_name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{review.author_name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {format(new Date(review.date), 'd MMMM yyyy', { locale: ru })}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{review.text_ru}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
