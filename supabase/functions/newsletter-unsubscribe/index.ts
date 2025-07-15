import { corsHeaders } from '../_shared/cors.ts';

interface UnsubscribeRequest {
  email?: string;
  token?: string;
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        {
          status: 405,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const { email, token }: UnsubscribeRequest = await req.json();

    if (!email && !token) {
      return new Response(
        JSON.stringify({ error: 'Email or token required' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const { createClient } = await import('npm:@supabase/supabase-js@2');
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Build query based on provided parameters
    let query = supabase.from('newsletter_subscribers');
    
    if (token) {
      query = query.eq('verification_token', token);
    } else if (email) {
      query = query.eq('email', email);
    }

    // Update subscription status
    const { data, error } = await query
      .update({ subscription_status: false })
      .select('email')
      .single();

    if (error) {
      return new Response(
        JSON.stringify({ error: 'Subscriber not found' }),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({
        message: 'Successfully unsubscribed from newsletter',
        email: data.email,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});