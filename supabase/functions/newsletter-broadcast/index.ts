import { corsHeaders } from '../_shared/cors.ts';

interface BroadcastRequest {
  subject: string;
  content: string;
  html_content?: string;
  sender_name?: string;
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
    // Check authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Authentication required' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        {
          status: 405,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const { subject, content, html_content, sender_name }: BroadcastRequest = await req.json();

    if (!subject || !content) {
      return new Response(
        JSON.stringify({ error: 'Subject and content are required' }),
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

    // Get all verified and active subscribers
    const { data: subscribers, error } = await supabase
      .from('newsletter_subscribers')
      .select('email')
      .eq('subscription_status', true)
      .eq('verified', true);

    if (error) {
      throw error;
    }

    if (!subscribers || subscribers.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No active subscribers found' }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Prepare email data for batch sending
    const emailPromises = subscribers.map(async (subscriber) => {
      const unsubscribeToken = crypto.randomUUID();
      
      // Update subscriber with unsubscribe token
      await supabase
        .from('newsletter_subscribers')
        .update({ verification_token: unsubscribeToken })
        .eq('email', subscriber.email);

      const emailData = {
        to_email: subscriber.email,
        subject: subject,
        content: content,
        html_content: html_content || content,
        sender_name: sender_name || 'Hapo Group',
        unsubscribe_url: `${req.headers.get('origin')}/unsubscribe?token=${unsubscribeToken}`,
        timestamp: new Date().toISOString(),
      };

      // Here you would integrate with EmailJS or your email service
      // For now, we'll simulate the email sending
      return {
        email: subscriber.email,
        status: 'queued',
        data: emailData
      };
    });

    const results = await Promise.all(emailPromises);
    const successCount = results.filter(r => r.status === 'queued').length;

    return new Response(
      JSON.stringify({
        message: 'Newsletter broadcast initiated',
        total_subscribers: subscribers.length,
        emails_queued: successCount,
        results: results.map(r => ({ email: r.email, status: r.status }))
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Newsletter broadcast error:', error);
    
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});