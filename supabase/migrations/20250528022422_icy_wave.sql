/*
  # Create documents table

  1. New Tables
    - `documents`
      - `id` (uuid, primary key)
      - `number` (text, not null)
      - `date` (date, not null)
      - `title` (text, not null)
      - `description` (text, not null)
      - `category` (text, not null)
      - `content` (text)
      - `file_url` (text)
      - `created_at` (timestamptz, default now())

  2. Security
    - Enable RLS on `documents` table
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  number text NOT NULL,
  date date NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL CHECK (category IN ('portaria', 'decreto', 'lei-ordinaria', 'lei-complementar')),
  content text,
  file_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
  ON documents
  FOR SELECT
  TO public
  USING (true);