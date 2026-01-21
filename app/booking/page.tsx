'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { getAllModels } from '@/lib/modelData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Phone } from 'lucide-react';

const phoneRegex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;

const bookingSchema = z.object({
  model: z.string().min(1, 'Выберите модель автомобиля'),
  problem: z.string().min(10, 'Опишите проблему подробнее (минимум 10 символов)'),
  mileage: z.number().min(0).max(500),
  phone: z.string().regex(phoneRegex, 'Введите корректный номер телефона'),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedModel = searchParams.get('model') || '';
  const [isSubmitting, setIsSubmitting] = useState(false);

  const allModels = getAllModels();

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      model: selectedModel,
      problem: '',
      mileage: 50,
      phone: '',
    },
  });

  const mileage = form.watch('mileage');

  const normalizePhone = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');

    if (cleaned.startsWith('8') && cleaned.length === 11) {
      return `+7${cleaned.slice(1)}`;
    }

    if (cleaned.startsWith('7') && cleaned.length === 11) {
      return `+${cleaned}`;
    }

    if (cleaned.length === 10) {
      return `+7${cleaned}`;
    }

    return `+7${cleaned}`;
  };

  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);

    const normalizedPhone = normalizePhone(data.phone);
    const modelInfo = allModels.find(m => m.id === data.model);

    console.log({
      ...data,
      phone: normalizedPhone,
      modelName: modelInfo?.name,
    });

    setTimeout(() => {
      alert(`Спасибо за заявку! Мы свяжемся с вами по номеру ${normalizedPhone}`);
      setIsSubmitting(false);
      router.push('/');
    }, 1000);
  };

  return (
    <div className="pt-16 min-h-screen">
      <section className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="mb-4">Запись в автосервис</h1>
            <p className="text-lg">
              Заполните форму ниже, и наш специалист свяжется с вами в ближайшее время
            </p>
          </div>

          <div className="border-2 border-black p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        Выберите свою модель авто
                      </FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12 text-base">
                            <SelectValue placeholder="Выберите модель" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[300px]">
                          <div className="px-2 py-1 text-xs font-semibold text-gray-500">BMW</div>
                          {allModels
                            .filter(m => m.brand === 'BMW')
                            .map(model => (
                              <SelectItem key={model.id} value={model.id}>
                                {model.name}
                              </SelectItem>
                            ))}
                          <div className="px-2 py-1 text-xs font-semibold text-gray-500 mt-2">
                            MINI
                          </div>
                          {allModels
                            .filter(m => m.brand === 'MINI')
                            .map(model => (
                              <SelectItem key={model.id} value={model.id}>
                                {model.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="problem"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        Какая у вас проблема? (Или перечислите список выбранных услуг)
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Опишите проблему или услуги, которые вас интересуют..."
                          className="min-h-[120px] text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mileage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        Какой пробег у вашего авто?
                      </FormLabel>
                      <div className="pt-2 pb-4">
                        <div className="flex justify-between items-center mb-6">
                          <span className="text-sm text-gray-600">0 тыс. км</span>
                          <span className="text-2xl font-bold">{mileage} тыс. км</span>
                          <span className="text-sm text-gray-600">500 тыс. км</span>
                        </div>
                        <FormControl>
                          <Slider
                            min={0}
                            max={500}
                            step={5}
                            value={[field.value]}
                            onValueChange={vals => field.onChange(vals[0])}
                            className="w-full"
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        Ваш номер телефона
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600">
                            +7
                          </span>
                          <Input
                            type="tel"
                            placeholder="(999) 123-45-67"
                            className="h-12 text-base pl-12"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 h-14 text-lg bg-[#003366] hover:bg-[#004488] text-white"
                  >
                    {isSubmitting ? 'Отправка...' : 'Записаться в автосервис'}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push('/#contacts')}
                    className="flex-1 h-14 text-lg border-2 border-black hover:bg-gray-50"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Хочу поговорить
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          <div className="mt-8 text-center">
            <Link href="/services" className="text-[#003366] hover:underline font-semibold">
              ← Вернуться к услугам
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
