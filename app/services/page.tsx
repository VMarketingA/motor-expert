import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Database } from '@/types/database.types';

type Service = Database['public']['Tables']['services']['Row'];

async function getServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('category', { ascending: true });

  if (error) {
    console.error('Error fetching services:', error);
    return [];
  }

  return data || [];
}

export default async function ServicesPage() {
  const services = await getServices();
  const maintenanceServices = services.filter(s => s.category === 'maintenance');
  const engineServices = services.filter(s => s.category === 'engine');
  const suspensionServices = services.filter(s => s.category === 'suspension');

  return (
    <div className="container py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Наши услуги</h1>
        <p className="text-xl text-muted-foreground">
          Полный спектр услуг по обслуживанию и ремонту BMW
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-4">
          <TabsTrigger value="all">Все</TabsTrigger>
          <TabsTrigger value="maintenance">ТО</TabsTrigger>
          <TabsTrigger value="engine">Двигатель</TabsTrigger>
          <TabsTrigger value="suspension">Подвеска</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card key={service.id}>
                <CardHeader>
                  <CardTitle>{service.name_ru}</CardTitle>
                  <CardDescription>{service.description_ru}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-blue-600">
                    от {service.price_from.toLocaleString('ru-RU')} ₽
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="maintenance" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {maintenanceServices.map((service) => (
              <Card key={service.id}>
                <CardHeader>
                  <CardTitle>{service.name_ru}</CardTitle>
                  <CardDescription>{service.description_ru}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-blue-600">
                    от {service.price_from.toLocaleString('ru-RU')} ₽
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="engine" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {engineServices.map((service) => (
              <Card key={service.id}>
                <CardHeader>
                  <CardTitle>{service.name_ru}</CardTitle>
                  <CardDescription>{service.description_ru}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-blue-600">
                    от {service.price_from.toLocaleString('ru-RU')} ₽
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="suspension" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suspensionServices.map((service) => (
              <Card key={service.id}>
                <CardHeader>
                  <CardTitle>{service.name_ru}</CardTitle>
                  <CardDescription>{service.description_ru}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-blue-600">
                    от {service.price_from.toLocaleString('ru-RU')} ₽
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
