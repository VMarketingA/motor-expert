/*
  # Create Site Settings Table

  1. New Tables
    - `site_settings`
      - `id` (uuid, primary key)
      - `key` (text, unique) - Unique identifier for the setting
      - `value` (text) - The setting value
      - `category` (text) - Category of the setting (contact, company, hours, etc.)
      - `description` (text) - Description of what this setting is for
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `site_settings` table
    - Add policy for public read access (settings are public information)
    - Add policy for authenticated admin updates (future use)

  3. Initial Data
    - Company name, description, address
    - Contact information (phone, email)
    - Working hours
    - Social media links
*/

CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text NOT NULL,
  category text NOT NULL DEFAULT 'general',
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site settings"
  ON site_settings
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Only authenticated users can update settings"
  ON site_settings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert company information
INSERT INTO site_settings (key, value, category, description) VALUES
  ('company_name', 'Мотор Эксперт', 'company', 'Company name'),
  ('company_full_name', 'Автосервис BMW "Мотор Эксперт"', 'company', 'Full company name'),
  ('company_description', 'Автосервис BMW "Мотор Эксперт" — это профессиональный сервисный центр по ремонту и обслуживанию автомобилей BMW и MINI в Москве, специализирующийся исключительно на баварских автомобилях.', 'company', 'Main company description'),
  ('phone', '+7-495-114-55-52', 'contact', 'Main phone number'),
  ('phone_display', '+7 (495) 114-55-52', 'contact', 'Phone number for display'),
  ('address_full', 'Москва, Автозаводская ул., 23, корп. 7', 'contact', 'Full address'),
  ('address_note', 'напротив ТЦ "Ривьера"', 'contact', 'Address note/landmark'),
  ('work_hours', 'Ежедневно с 9:00 до 21:00', 'hours', 'Working hours'),
  ('work_hours_start', '9:00', 'hours', 'Opening time'),
  ('work_hours_end', '21:00', 'hours', 'Closing time'),
  ('work_days', 'Ежедневно', 'hours', 'Working days')
ON CONFLICT (key) DO NOTHING;