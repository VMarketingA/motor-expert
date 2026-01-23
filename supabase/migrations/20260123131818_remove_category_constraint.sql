/*
  # Remove category constraint from services table

  1. Changes
    - Drop the check constraint on category column
    - This allows adding services with any category names
*/

ALTER TABLE services DROP CONSTRAINT IF EXISTS services_category_check;