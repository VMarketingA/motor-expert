/*
  # Update Services Table Schema

  1. Changes
    - Remove category constraint to allow all service categories
    - Add sort_order column for ordering services
    - Add is_active column to enable/disable services
    - Add slug column for URL-friendly identifiers

  2. New Structure
    - Supports 7 categories instead of just 3
    - Allows flexible ordering and activation control
*/

-- Remove the old category check constraint
ALTER TABLE services DROP CONSTRAINT IF EXISTS services_category_check;

-- Add new columns
ALTER TABLE services 
  ADD COLUMN IF NOT EXISTS sort_order integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS slug text;

-- Create index on category for better query performance
CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);

-- Create index on sort_order for ordering
CREATE INDEX IF NOT EXISTS idx_services_sort_order ON services(sort_order);

-- Create index on is_active for filtering
CREATE INDEX IF NOT EXISTS idx_services_is_active ON services(is_active);
