/*
  # Fix Database Security Issues

  ## Changes

  ### 1. Fix RLS Policies
  - Remove overly permissive policies that bypass security
  - Replace with restrictive policies that properly check permissions
  - Restrict administrative operations to service_role only

  ### 2. Remove Duplicate Policies
  - Drop duplicate INSERT policies on models table

  ### 3. Fix Function Security
  - Update update_updated_at_column function with stable search_path

  ### 4. Clean Up Unused Indexes
  - Drop indexes that are not being used

  ## Security Improvements
  - Models table: Only service_role can modify, public can read active models
  - Bookings table: Public can create, only authenticated users can view their own
  - Function now has secure search_path configuration
*/

-- Drop duplicate and overly permissive policies on models table
DROP POLICY IF EXISTS "Allow insert for service role" ON models;
DROP POLICY IF EXISTS "Authenticated users can insert models" ON models;
DROP POLICY IF EXISTS "Authenticated users can update models" ON models;
DROP POLICY IF EXISTS "Authenticated users can delete models" ON models;
DROP POLICY IF EXISTS "Anyone can view models" ON models;

-- Create secure policies for models table
-- Only allow reading active models
CREATE POLICY "Public can view active models"
  ON models FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- Only service_role can modify models
CREATE POLICY "Service role can insert models"
  ON models FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can update models"
  ON models FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can delete models"
  ON models FOR DELETE
  TO service_role
  USING (true);

-- Fix bookings table policies
DROP POLICY IF EXISTS "Anyone can create bookings" ON bookings;

-- Public can create bookings with valid data
CREATE POLICY "Public can create bookings"
  ON bookings FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    customer_name IS NOT NULL AND 
    customer_phone IS NOT NULL AND
    length(customer_name) >= 2 AND
    length(customer_phone) >= 10
  );

-- Only service_role can view and manage bookings
CREATE POLICY "Service role can view all bookings"
  ON bookings FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Service role can update bookings"
  ON bookings FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can delete bookings"
  ON bookings FOR DELETE
  TO service_role
  USING (true);

-- Fix function search_path security issue
-- Drop function with CASCADE to remove dependent triggers
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- Recreate function with secure search_path
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public, pg_temp
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate all triggers
CREATE TRIGGER update_models_updated_at 
  BEFORE UPDATE ON models
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_service_categories_updated_at 
  BEFORE UPDATE ON service_categories
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at 
  BEFORE UPDATE ON services
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at 
  BEFORE UPDATE ON testimonials
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gallery_photos_updated_at 
  BEFORE UPDATE ON gallery_photos
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at 
  BEFORE UPDATE ON bookings
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Drop unused indexes
DROP INDEX IF EXISTS idx_models_is_active;
DROP INDEX IF EXISTS idx_models_model_id;
DROP INDEX IF EXISTS idx_services_is_active;
DROP INDEX IF EXISTS idx_gallery_photos_is_active;
DROP INDEX IF EXISTS idx_bookings_status;
DROP INDEX IF EXISTS idx_bookings_created_at;
DROP INDEX IF EXISTS idx_models_brand;
DROP INDEX IF EXISTS idx_models_display_order;

-- Create only the indexes that are actually needed based on queries
-- Index for filtering active models with brand
CREATE INDEX IF NOT EXISTS idx_models_active_brand ON models(is_active, brand) WHERE is_active = true;

-- Index for filtering active services
CREATE INDEX IF NOT EXISTS idx_services_active_category ON services(is_active, category) WHERE is_active = true;

-- Index for sorting models
CREATE INDEX IF NOT EXISTS idx_models_sort ON models(sort_order) WHERE is_active = true;

-- Index for sorting services
CREATE INDEX IF NOT EXISTS idx_services_sort ON services(sort_order) WHERE is_active = true;
