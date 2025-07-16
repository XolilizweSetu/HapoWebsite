import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

interface BroadcastRequest {
  subject: string;
  content: string;
  html_content?: string;
  sender_name?: string;
}

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(200).end();
  }

  try {
    // Check authentication
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { subject, content, html_content, sender_name }: BroadcastRequest = req.body;

    if (!subject || !content) {
      return res.status(400).json({ error: 'Subject and content are required' });
    }

    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: subscribers, error } = await supabase
      .from('newsletter_subscribers')
      .select('email')
      .eq('subscription_status', true)
      .eq('verified', true);

    if (error) throw error;

    if (!subscribers || subscribers.length === 0) {
      return res.status(200).json({ message: 'No active subscribers found' });
    }

    const origin = req.headers.origin || process.env.APP_URL || 'https://yourdomain.com';

    const emailPromises = subscribers.map(async (subscriber) => {
      const unsubscribeToken = crypto.randomUUID();

      await supabase
        .from('newsletter_subscribers')
        .update({ verification_token: unsubscribeToken })
        .eq('email', subscriber.email);

      const emailData = {
        to_email: subscriber.email,
        subject,
        content,
        html_content: html_content || content,
        sender_name: sender_name || 'Hapo Group',
        unsubscribe_url: `${origin}/unsubscribe?token=${unsubscribeToken}`,
        timestamp: new Date().toISOString(),
      };

      // TODO: Integrate with real email service here
      return {
        email: subscriber.email,
        status: 'queued',
        data: emailData,
      };
    });

    const results = await Promise.all(emailPromises);

    return res.status(200).json({
      message: 'Newsletter broadcast initiated',
      total_subscribers: subscribers.length,
      emails_queued: results.length,
      results: results.map((r) => ({ email: r.email, status: r.status })),
    });
  } catch (err) {
    console.error('Newsletter error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
