import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';
import { corsHeaders } from '../_shared/cors';

interface VerifyRequest {
  token: string;
}

const handler: Handler = async (event, context) => {
  // Handle CORS preflight request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { token }: VerifyRequest = JSON.parse(event.body || '{}');

    if (!token) {
      return {
        statusCode: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Verification token required' }),
      };
    }

    const supabaseUrl = process.env.SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .update({
        verified: true,
        verification_token: null,
      })
      .match({ verification_token: token })
      .select('email')
      .single();

    if (error || !data) {
      return {
        statusCode: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Invalid or expired verification token' }),
      };
    }

    return {
      statusCode: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Email verified successfully!',
        email: data.email,
      }),
    };

  } catch (err) {
    console.error('Email verification error:', err);
    return {
      statusCode: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};

export { handler };
