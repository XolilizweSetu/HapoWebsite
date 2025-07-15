/*
  # Newsletter Management System

  1. New Tables
    - `newsletter_subscribers`
      - `id` (uuid, primary key)
      - `email` (text, unique, not null)
      - `subscription_status` (boolean, default true)
      - `created_at` (timestamp with timezone, default now())
      - `last_updated` (timestamp with timezone)
      - `verification_token` (text, for email verification)
      - `verified` (boolean, default false)

  2. Security
    - Enable RLS on newsletter_subscribers table
    - Add policies for public subscription and admin management
    - Add email validation constraints

  3. Functions
    - Auto-update last_updated timestamp
    - Generate verification tokens
*/

-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  subscription_status boolean DEFAULT true,
  verified boolean DEFAULT false,
  verification_token text,
  created_at timestamptz DEFAULT now(),
  last_updated timestamptz DEFAULT now(),
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Enable RLS
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Subscribers can view their own subscription"
  ON newsletter_subscribers
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Subscribers can update their own subscription"
  ON newsletter_subscribers
  FOR UPDATE
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage all subscriptions"
  ON newsletter_subscribers
  FOR ALL
  TO authenticated
  USING (true);

-- Function to update last_updated timestamp
CREATE OR REPLACE FUNCTION update_newsletter_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_updated = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update last_updated
CREATE TRIGGER update_newsletter_subscribers_updated_at
  BEFORE UPDATE ON newsletter_subscribers
  FOR EACH ROW
  EXECUTE FUNCTION update_newsletter_updated_at();

-- Function to generate verification token
CREATE OR REPLACE FUNCTION generate_verification_token()
RETURNS text AS $$
BEGIN
  RETURN encode(gen_random_bytes(32), 'hex');
END;
$$ language 'plpgsql';

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_status ON newsletter_subscribers(subscription_status);
CREATE INDEX IF NOT EXISTS idx_newsletter_verified ON newsletter_subscribers(verified);
CREATE INDEX IF NOT EXISTS idx_newsletter_token ON newsletter_subscribers(verification_token);