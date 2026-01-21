import { createClient } from '@supabase/supabase-js';
import { bmwModels, miniModels } from '../lib/modelData';
import { maintenanceServices, engineServices, suspensionServices } from '../lib/servicesData';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function populateDatabase() {
  console.log('Starting database population...');

  try {
    const { data: categories, error: categoriesError } = await supabase
      .from('service_categories')
      .select('id, slug')
      .in('slug', ['maintenance', 'engine', 'suspension']);

    if (categoriesError) {
      console.error('Error fetching categories:', categoriesError);
      return;
    }

    const categoryMap = new Map(categories?.map(c => [c.slug, c.id]) || []);
    const maintenanceId = categoryMap.get('maintenance');
    const engineId = categoryMap.get('engine');
    const suspensionId = categoryMap.get('suspension');

    console.log('Populating models...');
    const allModels = [...bmwModels, ...miniModels].map((model, index) => ({
      id: model.id,
      model_id: model.id,
      name: model.name,
      brand: model.brand,
      image: model.image,
      description: model.description,
      sort_order: index + 1,
      is_active: true,
    }));

    for (let i = 0; i < allModels.length; i += 50) {
      const batch = allModels.slice(i, i + 50);
      const { error } = await supabase
        .from('models')
        .upsert(batch, { onConflict: 'id' });

      if (error) {
        console.error(`Error inserting models batch ${i / 50 + 1}:`, error);
      } else {
        console.log(`Inserted models batch ${i / 50 + 1} (${batch.length} models)`);
      }
    }

    console.log('Populating services...');
    const allServices = [
      ...maintenanceServices.map((s, i) => ({
        category_id: maintenanceId,
        name: s.name,
        description: s.description,
        price: s.price || 0,
        sort_order: i + 1,
        is_active: true,
      })),
      ...engineServices.map((s, i) => ({
        category_id: engineId,
        name: s.name,
        description: s.description,
        price: s.price || 0,
        sort_order: i + 1,
        is_active: true,
      })),
      ...suspensionServices.map((s, i) => ({
        category_id: suspensionId,
        name: s.name,
        description: s.description,
        price: s.price || 0,
        sort_order: i + 1,
        is_active: true,
      })),
    ];

    await supabase.from('services').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    for (let i = 0; i < allServices.length; i += 50) {
      const batch = allServices.slice(i, i + 50);
      const { error } = await supabase
        .from('services')
        .insert(batch);

      if (error) {
        console.error(`Error inserting services batch ${i / 50 + 1}:`, error);
      } else {
        console.log(`Inserted services batch ${i / 50 + 1} (${batch.length} services)`);
      }
    }

    console.log('Database population completed!');
  } catch (error) {
    console.error('Error populating database:', error);
  }
}

populateDatabase();