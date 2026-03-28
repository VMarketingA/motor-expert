/*
  # Create blog posts table

  ## Overview
  This migration creates a blog system for automotive content focused on BMW repair and maintenance topics.

  ## 1. New Tables
  
  ### `blog_posts`
  Main table for storing blog articles with bilingual support (Russian and English).
  
  **Columns:**
  - `id` (uuid, primary key) - Unique identifier for each blog post
  - `slug` (text, unique, not null) - URL-friendly identifier for routing (e.g., "engine-oil-consumption")
  - `title_ru` (text, not null) - Russian title of the blog post
  - `title_en` (text, nullable) - English title of the blog post
  - `subtitle_ru` (text, nullable) - Russian subtitle/description
  - `subtitle_en` (text, nullable) - English subtitle/description
  - `content_ru` (text, not null) - Full Russian blog post content
  - `content_en` (text, nullable) - Full English blog post content
  - `cta_ru` (text, not null) - Russian call-to-action text
  - `cta_en` (text, nullable) - English call-to-action text
  - `image_url` (text, not null) - URL to the blog post image
  - `category` (text, not null) - Category/topic of the post (e.g., "engine", "suspension", "electronics")
  - `published_at` (timestamptz, default now()) - Publication timestamp
  - `created_at` (timestamptz, default now()) - Record creation timestamp
  - `updated_at` (timestamptz, default now()) - Record update timestamp

  ## 2. Security
  
  ### Row Level Security (RLS)
  - RLS is enabled on the `blog_posts` table
  - Public read access is granted for all published blog posts
  - This allows anyone to view blog content without authentication
  
  ### Policies
  - **"Anyone can read published blog posts"** - SELECT policy allowing public access to all blog posts

  ## 3. Important Notes
  - All blog posts are publicly accessible (no authentication required)
  - Slugs must be unique to ensure proper routing
  - Images should be hosted externally (real automotive images, not stock photos)
  - Content uses Russian as primary language with optional English translations
  - Uses Problem-Agitate-Solution (PAS) copywriting formula for engaging content
*/

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title_ru text NOT NULL,
  title_en text,
  subtitle_ru text,
  subtitle_en text,
  content_ru text NOT NULL,
  content_en text,
  cta_ru text NOT NULL,
  cta_en text,
  image_url text NOT NULL,
  category text NOT NULL,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Anyone can read published blog posts"
  ON blog_posts
  FOR SELECT
  TO anon, authenticated
  USING (true);