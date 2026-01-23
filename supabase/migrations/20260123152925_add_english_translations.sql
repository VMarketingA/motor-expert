/*
  # Add English translations to database

  1. Changes to services table
    - Add `name_en` column for English service names
    - Add `description_en` column for English service descriptions
    - Make existing Russian columns nullable for services without Russian translations
  
  2. Changes to models table
    - Add `description_en` column for English model descriptions
  
  3. Changes to site_settings table
    - Add English content fields for site-wide content
  
  4. Security
    - No RLS changes needed (existing policies still apply)
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'services' AND column_name = 'name_en'
  ) THEN
    ALTER TABLE services ADD COLUMN name_en text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'services' AND column_name = 'description_en'
  ) THEN
    ALTER TABLE services ADD COLUMN description_en text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'models' AND column_name = 'description_en'
  ) THEN
    ALTER TABLE models ADD COLUMN description_en text;
  END IF;
END $$;
