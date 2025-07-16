import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';
import { corsHeaders } from '../_shared/cors';

interface UnsubscribeRequest {
  email?: string;
  token?: string;
}

const handler: Handler = async (event, context) => {
  // Handle CORS preflight
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
    const { email, token }: UnsubscribeRequest = JSON.parse(event.body || '{}');

    if (!email && !token) {
      return {
        statusCode: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Email or token required' }),
      };
    }

    const supabaseUrl = process.env.SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .update({ subscription_status: false })
      .match(token ? { verification_token: token } : { email })
      .select('email')
      .single();

    if (error || !data) {
      return {
        statusCode: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Subscriber not found' }),
      };
    }

    return {
      statusCode: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Successfully unsubscribed from newsletter',
        email: data.email,
      }),
    };

  } catch (err) {
    console.error('Unsubscribe error:', err);
    return {
      statusCode: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};

export { handler };
