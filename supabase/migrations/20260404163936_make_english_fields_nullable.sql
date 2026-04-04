/*
  # Make English fields nullable in services table

  1. Changes
    - Make name_en nullable (allow NULL values)
    - Make description_en nullable (allow NULL values)

  This allows us to add services without English translations initially.
*/

ALTER TABLE services 
  ALTER COLUMN name_en DROP NOT NULL,
  ALTER COLUMN description_en DROP NOT NULL;
