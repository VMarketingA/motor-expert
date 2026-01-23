/*
  # Make English fields nullable in services table

  1. Changes
    - Make name_en nullable
    - Make description_en nullable
    - This allows adding services without English translations
*/

ALTER TABLE services ALTER COLUMN name_en DROP NOT NULL;
ALTER TABLE services ALTER COLUMN description_en DROP NOT NULL;