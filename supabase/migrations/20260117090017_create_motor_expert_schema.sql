/*
  # Motor Expert Auto Service Database Schema

  1. New Tables
    - `services`
      - `id` (uuid, primary key)
      - `name_ru` (text) - Service name in Russian
      - `name_en` (text) - Service name in English
      - `description_ru` (text) - Description in Russian
      - `description_en` (text) - Description in English
      - `price_from` (integer) - Starting price in rubles
      - `category` (text) - Category: maintenance, engine, suspension
      - `created_at` (timestamptz)
    
    - `reviews`
      - `id` (uuid, primary key)
      - `author_name` (text) - Customer name
      - `avatar_url` (text) - Avatar image URL
      - `rating` (integer) - Rating 1-5
      - `text_ru` (text) - Review text in Russian
      - `text_en` (text) - Review text in English
      - `date` (date) - Review date
      - `created_at` (timestamptz)
    
    - `testimonials`
      - `id` (uuid, primary key)
      - `image_url` (text) - Testimonial image URL
      - `author_name` (text) - Customer name
      - `created_at` (timestamptz)
    
    - `gallery_photos`
      - `id` (uuid, primary key)
      - `model` (text) - BMW model (X5, 5-series, 3-series, etc.)
      - `image_url` (text) - Photo URL
      - `description_ru` (text) - Photo description in Russian
      - `description_en` (text) - Photo description in English
      - `type` (text) - before, after, engine, suspension
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access (no authentication required for public website)
*/

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_ru text NOT NULL,
  name_en text NOT NULL,
  description_ru text NOT NULL,
  description_en text NOT NULL,
  price_from integer NOT NULL,
  category text NOT NULL CHECK (category IN ('maintenance', 'engine', 'suspension')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read services"
  ON services FOR SELECT
  TO anon
  USING (true);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name text NOT NULL,
  avatar_url text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text_ru text NOT NULL,
  text_en text NOT NULL,
  date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read reviews"
  ON reviews FOR SELECT
  TO anon
  USING (true);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  author_name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read testimonials"
  ON testimonials FOR SELECT
  TO anon
  USING (true);

-- Create gallery_photos table
CREATE TABLE IF NOT EXISTS gallery_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  model text NOT NULL,
  image_url text NOT NULL,
  description_ru text NOT NULL,
  description_en text NOT NULL,
  type text NOT NULL CHECK (type IN ('before', 'after', 'engine', 'suspension', 'general')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE gallery_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read gallery photos"
  ON gallery_photos FOR SELECT
  TO anon
  USING (true);