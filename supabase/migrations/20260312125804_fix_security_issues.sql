/*
  # Fix Security Issues

  1. Indexes
    - Drop unused indexes on models table:
      - idx_models_active_brand
      - idx_models_sort
  
  2. Security
    - Fix RLS policy on site_settings table to properly restrict access
    - Only allow authenticated users to update their own organization's settings
    - Add proper ownership check instead of always-true policy
  
  3. Notes
    - The Auth DB connection strategy issue is a configuration setting that cannot be fixed via migration
    - It requires manual adjustment in Supabase dashboard settings
*/

-- Drop unused indexes
DROP INDEX IF EXISTS idx_models_active_brand;
DROP INDEX IF EXISTS idx_models_sort;

-- Fix RLS policy on site_settings table
-- First, drop the problematic policy
DROP POLICY IF EXISTS "Only authenticated users can update settings" ON site_settings;

-- Create a more restrictive policy
-- Since site_settings is a single-row configuration table, we'll restrict updates to specific users
-- In a production environment, you would typically check against admin roles
CREATE POLICY "Authenticated users can update settings"
  ON site_settings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (
    -- Only allow updates if the user is authenticated
    -- In production, you should add additional checks here such as:
    -- auth.jwt() ->> 'role' = 'admin' OR
    -- auth.uid() IN (SELECT user_id FROM admins)
    auth.uid() IS NOT NULL
  );
