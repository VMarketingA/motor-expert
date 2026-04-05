/*
  # Generate slugs for all services

  1. Changes
    - Creates a function to transliterate Russian text to Latin
    - Generates unique slugs for all existing services based on their Russian names
    - Ensures all services have valid, URL-friendly slugs

  2. Security
    - No security changes needed
*/

-- Function to transliterate Russian to Latin for slugs
CREATE OR REPLACE FUNCTION transliterate_to_slug(input_text text) RETURNS text AS $$
DECLARE
  result text;
BEGIN
  result := lower(input_text);
  
  -- Russian to Latin transliteration
  result := replace(result, 'а', 'a');
  result := replace(result, 'б', 'b');
  result := replace(result, 'в', 'v');
  result := replace(result, 'г', 'g');
  result := replace(result, 'д', 'd');
  result := replace(result, 'е', 'e');
  result := replace(result, 'ё', 'e');
  result := replace(result, 'ж', 'zh');
  result := replace(result, 'з', 'z');
  result := replace(result, 'и', 'i');
  result := replace(result, 'й', 'y');
  result := replace(result, 'к', 'k');
  result := replace(result, 'л', 'l');
  result := replace(result, 'м', 'm');
  result := replace(result, 'н', 'n');
  result := replace(result, 'о', 'o');
  result := replace(result, 'п', 'p');
  result := replace(result, 'р', 'r');
  result := replace(result, 'с', 's');
  result := replace(result, 'т', 't');
  result := replace(result, 'у', 'u');
  result := replace(result, 'ф', 'f');
  result := replace(result, 'х', 'h');
  result := replace(result, 'ц', 'ts');
  result := replace(result, 'ч', 'ch');
  result := replace(result, 'ш', 'sh');
  result := replace(result, 'щ', 'sch');
  result := replace(result, 'ъ', '');
  result := replace(result, 'ы', 'y');
  result := replace(result, 'ь', '');
  result := replace(result, 'э', 'e');
  result := replace(result, 'ю', 'yu');
  result := replace(result, 'я', 'ya');
  
  -- Replace special characters with hyphens
  result := regexp_replace(result, '[^a-z0-9]+', '-', 'g');
  
  -- Remove leading/trailing hyphens
  result := trim(both '-' from result);
  
  RETURN result;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Generate slugs for all services that don't have one
DO $$
DECLARE
  service_record RECORD;
  new_slug text;
  counter integer;
BEGIN
  FOR service_record IN SELECT id, name_ru FROM services WHERE slug IS NULL
  LOOP
    new_slug := transliterate_to_slug(service_record.name_ru);
    counter := 1;
    
    -- Ensure uniqueness
    WHILE EXISTS (SELECT 1 FROM services WHERE slug = new_slug) LOOP
      new_slug := transliterate_to_slug(service_record.name_ru) || '-' || counter;
      counter := counter + 1;
    END LOOP;
    
    UPDATE services SET slug = new_slug WHERE id = service_record.id;
  END LOOP;
END $$;
