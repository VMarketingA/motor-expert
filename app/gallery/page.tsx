import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Database } from '@/types/database.types';

type GalleryPhoto = Database['public']['Tables']['gallery_photos']['Row'];

async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
  const { data, error } = await supabase
    .from('gallery_photos')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching gallery photos:', error);
    return [];
  }

  return data || [];
}

export default async function GalleryPage() {
  const photos = await getGalleryPhotos();
  const enginePhotos = photos.filter(p => p.type === 'engine');
  const suspensionPhotos = photos.filter(p => p.type === 'suspension');
  const generalPhotos = photos.filter(p => p.type === 'general' || p.type === 'before' || p.type === 'after');

  return (
    <div className="container py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Галерея работ</h1>
        <p className="text-xl text-muted-foreground">
          Примеры выполненных работ по ремонту и обслуживанию BMW
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-4">
          <TabsTrigger value="all">Все</TabsTrigger>
          <TabsTrigger value="engine">Двигатель</TabsTrigger>
          <TabsTrigger value="suspension">Подвеска</TabsTrigger>
          <TabsTrigger value="general">Общие</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo) => (
              <div key={photo.id} className="relative aspect-video overflow-hidden rounded-lg shadow-lg group">
                <Image
                  src={photo.image_url}
                  alt={photo.description_ru}
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                  <div>
                    <p className="text-white font-semibold">{photo.model}</p>
                    <p className="text-white/80 text-sm">{photo.description_ru}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="engine" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enginePhotos.map((photo) => (
              <div key={photo.id} className="relative aspect-video overflow-hidden rounded-lg shadow-lg group">
                <Image
                  src={photo.image_url}
                  alt={photo.description_ru}
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                  <div>
                    <p className="text-white font-semibold">{photo.model}</p>
                    <p className="text-white/80 text-sm">{photo.description_ru}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="suspension" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suspensionPhotos.map((photo) => (
              <div key={photo.id} className="relative aspect-video overflow-hidden rounded-lg shadow-lg group">
                <Image
                  src={photo.image_url}
                  alt={photo.description_ru}
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                  <div>
                    <p className="text-white font-semibold">{photo.model}</p>
                    <p className="text-white/80 text-sm">{photo.description_ru}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="general" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {generalPhotos.map((photo) => (
              <div key={photo.id} className="relative aspect-video overflow-hidden rounded-lg shadow-lg group">
                <Image
                  src={photo.image_url}
                  alt={photo.description_ru}
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                  <div>
                    <p className="text-white font-semibold">{photo.model}</p>
                    <p className="text-white/80 text-sm">{photo.description_ru}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
