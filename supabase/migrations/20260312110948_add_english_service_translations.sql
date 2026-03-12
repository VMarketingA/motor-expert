/*
  # Add English Translations for Services

  1. Updates
    - Add English translations (name_en, description_en) for all existing services
    - Translate service categories from Russian to English
  
  2. Categories Translation Map
    - "Замена основных жидкостей" → "Fluid Replacement"
    - "Замена фильтров" → "Filter Replacement"
    - "Зажигание, привода и топливо" → "Ignition, Drive and Fuel"
    - "Тормозная система" → "Brake System"
    - "Подвеска" → "Suspension"
    - "Рулевой механизм" → "Steering System"
    - "Кондиционер" → "Air Conditioning"
  
  3. Service Translations
    - Comprehensive English names and descriptions for all services
    - Maintains technical accuracy while being user-friendly
*/

-- Update Fluid Replacement services
UPDATE services SET 
  name_en = 'Engine Oil + Oil Filter',
  description_en = 'Engine oil and oil filter replacement',
  category = 'Fluid Replacement'
WHERE name_ru = 'Масло в ДВС + масляный фильтр';

UPDATE services SET 
  name_en = 'Coolant',
  description_en = 'Coolant replacement in the cooling system',
  category = 'Fluid Replacement'
WHERE name_ru = 'Охлаждающая жидкость';

UPDATE services SET 
  name_en = 'ZF Automatic Transmission (service + adaptations)',
  description_en = 'ZF automatic transmission oil change with adaptations',
  category = 'Fluid Replacement'
WHERE name_ru = 'АКПП ZF (работа + адаптации)';

UPDATE services SET 
  name_en = 'Transfer Case (service + adaptations)',
  description_en = 'Transfer case oil change with adaptations',
  category = 'Fluid Replacement'
WHERE name_ru = 'Раздаточная коробка (работа + адаптации)';

UPDATE services SET 
  name_en = 'Front Differential',
  description_en = 'Front differential oil change',
  category = 'Fluid Replacement'
WHERE name_ru = 'Передний редуктор';

UPDATE services SET 
  name_en = 'Rear Differential',
  description_en = 'Rear differential oil change',
  category = 'Fluid Replacement'
WHERE name_ru = 'Задний редуктор';

-- Update Filter Replacement services
UPDATE services SET 
  name_en = 'EGR Recirculation Microfilter',
  description_en = 'Exhaust gas recirculation microfilter replacement',
  category = 'Filter Replacement'
WHERE name_ru = 'Микрофильтр рециркуляции';

UPDATE services SET 
  name_en = 'Air Filter',
  description_en = 'Engine air filter replacement',
  category = 'Filter Replacement'
WHERE name_ru = 'Воздушный фильтр';

UPDATE services SET 
  name_en = 'Cabin Filter',
  description_en = 'Ventilation system cabin filter replacement',
  category = 'Filter Replacement'
WHERE name_ru = 'Салонный фильтр';

UPDATE services SET 
  name_en = 'Fuel Filter',
  description_en = 'Fuel filter replacement',
  category = 'Filter Replacement'
WHERE name_ru = 'Топливный фильтр';

-- Update Ignition, Drive and Fuel services
UPDATE services SET 
  name_en = 'Electronic Systems Error Protocol Request',
  description_en = 'Computer diagnostics of all vehicle electronic systems',
  category = 'Ignition, Drive and Fuel'
WHERE name_ru = 'Запрос протокола ошибок эл. систем';

UPDATE services SET 
  name_en = 'Glow Plugs Replacement',
  description_en = 'Diesel engine glow plugs replacement',
  category = 'Ignition, Drive and Fuel'
WHERE name_ru = 'Свечи накаливания, замена';

UPDATE services SET 
  name_en = 'Accessory Drive Belt + Tensioner',
  description_en = 'Accessory drive belt and tensioner replacement',
  category = 'Ignition, Drive and Fuel'
WHERE name_ru = 'Ремень привода н/а + натяжитель';

UPDATE services SET 
  name_en = 'Cooling System Pump',
  description_en = 'Engine cooling system pump replacement',
  category = 'Ignition, Drive and Fuel'
WHERE name_ru = 'Насос системы охлаждения';

UPDATE services SET 
  name_en = 'Thermostat',
  description_en = 'Cooling system thermostat replacement',
  category = 'Ignition, Drive and Fuel'
WHERE name_ru = 'Термостат';

UPDATE services SET 
  name_en = 'Hidden Features Activation',
  description_en = 'Activation and coding of hidden vehicle features',
  category = 'Ignition, Drive and Fuel'
WHERE name_ru = 'Активация скрытых опций';

UPDATE services SET 
  name_en = 'Intake Manifold + Swirl Flaps + EGR Cooler Cleaning',
  description_en = 'Cleaning of intake manifold, swirl flaps, and EGR system',
  category = 'Ignition, Drive and Fuel'
WHERE name_ru = 'Впускной коллектор + вихревые заслонки + охладитель ОГ системы EGR чистка';

-- Update Brake System services
UPDATE services SET 
  name_en = 'Brake System Diagnostics',
  description_en = 'Electronic brake system error protocol request',
  category = 'Brake System'
WHERE name_ru = 'Диагностика тормозной системы';

UPDATE services SET 
  name_en = 'Front Brake Pads',
  description_en = 'Front brake pads replacement',
  category = 'Brake System'
WHERE name_ru = 'Колодки передние';

UPDATE services SET 
  name_en = 'Rear Brake Pads',
  description_en = 'Rear brake pads replacement',
  category = 'Brake System'
WHERE name_ru = 'Колодки задние';

UPDATE services SET 
  name_en = 'Front Brake Discs',
  description_en = 'Front brake discs replacement',
  category = 'Brake System'
WHERE name_ru = 'Диски передние';

UPDATE services SET 
  name_en = 'Rear Brake Discs',
  description_en = 'Rear brake discs replacement',
  category = 'Brake System'
WHERE name_ru = 'Диски задние';

UPDATE services SET 
  name_en = 'Brake Fluid',
  description_en = 'Brake fluid replacement',
  category = 'Brake System'
WHERE name_ru = 'Тормозная жидкость';

-- Update Suspension services
UPDATE services SET 
  name_en = 'Suspension Diagnostics',
  description_en = 'Suspension electronic systems error protocol request',
  category = 'Suspension'
WHERE name_ru = 'Диагностика подвески';

UPDATE services SET 
  name_en = 'Front Shock Absorber',
  description_en = 'Front shock absorber replacement',
  category = 'Suspension'
WHERE name_ru = 'Стойка передняя';

UPDATE services SET 
  name_en = 'Rear Shock Absorber',
  description_en = 'Rear shock absorber replacement',
  category = 'Suspension'
WHERE name_ru = 'Стойка задняя';

UPDATE services SET 
  name_en = 'Front Lower Control Arm',
  description_en = 'Front lower control arm replacement',
  category = 'Suspension'
WHERE name_ru = 'Рычаг передний нижний';

UPDATE services SET 
  name_en = 'Rear Lower Control Arm',
  description_en = 'Rear lower control arm replacement',
  category = 'Suspension'
WHERE name_ru = 'Рычаг задний нижний';

UPDATE services SET 
  name_en = 'Front Upper Control Arm',
  description_en = 'Front upper control arm replacement',
  category = 'Suspension'
WHERE name_ru = 'Рычаг передний верхний';

UPDATE services SET 
  name_en = 'Rear Upper Control Arm',
  description_en = 'Rear upper control arm replacement',
  category = 'Suspension'
WHERE name_ru = 'Рычаг задний верхний';

UPDATE services SET 
  name_en = 'Front Stabilizer Link',
  description_en = 'Front stabilizer link replacement',
  category = 'Suspension'
WHERE name_ru = 'Стойка стабилизатора передняя';

UPDATE services SET 
  name_en = 'Rear Stabilizer Link',
  description_en = 'Rear stabilizer link replacement',
  category = 'Suspension'
WHERE name_ru = 'Стойка стабилизатора задняя';

-- Update Steering System services
UPDATE services SET 
  name_en = 'Tie Rod End',
  description_en = 'Tie rod end replacement',
  category = 'Steering System'
WHERE name_ru = 'Наконечник рулевой тяги';

UPDATE services SET 
  name_en = 'Steering Rack',
  description_en = 'Steering rack replacement',
  category = 'Steering System'
WHERE name_ru = 'Рулевая рейка';

UPDATE services SET 
  name_en = 'Power Steering Pump',
  description_en = 'Power steering pump replacement',
  category = 'Steering System'
WHERE name_ru = 'Насос ГУР';

-- Update Air Conditioning services
UPDATE services SET 
  name_en = 'A/C System Diagnostics',
  description_en = 'Air conditioning system diagnostics',
  category = 'Air Conditioning'
WHERE name_ru = 'Диагностика системы кондиционирования';

UPDATE services SET 
  name_en = 'A/C Refrigerant Refill',
  description_en = 'Air conditioning refrigerant refill',
  category = 'Air Conditioning'
WHERE name_ru = 'Заправка кондиционера';

UPDATE services SET 
  name_en = 'A/C Compressor',
  description_en = 'Air conditioning compressor replacement',
  category = 'Air Conditioning'
WHERE name_ru = 'Компрессор кондиционера';

-- Update remaining Russian category names to English
UPDATE services SET category = 'Fluid Replacement' WHERE category = 'Замена основных жидкостей';
UPDATE services SET category = 'Filter Replacement' WHERE category = 'Замена фильтров';
UPDATE services SET category = 'Ignition, Drive and Fuel' WHERE category = 'Зажигание, привода и топливо';
UPDATE services SET category = 'Brake System' WHERE category = 'Тормозная система';
UPDATE services SET category = 'Suspension' WHERE category = 'Подвеска';
UPDATE services SET category = 'Steering System' WHERE category = 'Рулевой механизм';
UPDATE services SET category = 'Air Conditioning' WHERE category = 'Кондиционер';
