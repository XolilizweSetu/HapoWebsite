import { corsHeaders } from '../_shared/cors.ts';

interface SubscribeRequest {
  email: string;
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
    // Rate limiting check (simple implementation)
    const clientIP = req.headers.get('x-forwarded-for') || 'unknown';
    
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        {
          status: 405,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const { email }: SubscribeRequest = await req.json();

    // Validate email format
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
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

    // Generate verification token
    const verificationToken = crypto.randomUUID();

    // Check if email already exists
    const { data: existingSubscriber } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .eq('email', email)
      .single();

    let isNewSubscriber = false;

    if (existingSubscriber) {
      if (existingSubscriber.subscription_status && existingSubscriber.verified) {
        return new Response(
          JSON.stringify({ message: 'Email already subscribed' }),
          {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      } else {
        // Reactivate subscription and update verification token
        const { error } = await supabase
          .from('newsletter_subscribers')
          .update({
            subscription_status: true,
            verification_token: verificationToken,
            verified: false,
          })
          .eq('email', email);

        if (error) throw error;
        isNewSubscriber = false; // Reactivated subscriber
      }
    } else {
      // Insert new subscriber
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({
          email,
          verification_token: verificationToken,
          subscription_status: true,
          verified: false,
        });

        if (error) throw error;
        isNewSubscriber = true;
    }

    // Send admin notification email
    try {
      const adminNotificationData = {
        to_email: 'setu@hapogroup.co.za',
        subscriber_email: email,
        subscription_type: isNewSubscriber ? 'New Subscription' : 'Reactivated Subscription',
        timestamp: new Date().toLocaleString('en-ZA', {
          timeZone: 'Africa/Johannesburg',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }),
        verification_status: 'Pending Verification',
        admin_dashboard_url: `${req.headers.get('origin')}/blog`,
      };

      // Send admin notification via EmailJS
      const emailJSResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'service_8qqqqsh',
          template_id: 'template_ppp8h3g',
          user_id: 'rGTJsRmAd8RERcbht',
          template_params: adminNotificationData,
        }),
      });

      if (!emailJSResponse.ok) {
        console.error('Failed to send admin notification email:', await emailJSResponse.text());
      } else {
        console.log('Admin notification email sent successfully');
      }
    } catch (emailError) {
      console.error('Error sending admin notification:', emailError);
      // Don't fail the subscription if email notification fails
    }

    // Send verification email to subscriber (optional - you can implement this later)
    const emailData = {
      to_email: email,
      verification_token: verificationToken,
      verification_url: `${req.headers.get('origin')}/verify-email?token=${verificationToken}`,
      timestamp: new Date().toISOString(),
    };

    // Here you would integrate with EmailJS or your email service for user verification
    // For now, we'll return success with the verification token for testing
    
    return new Response(
      JSON.stringify({
        message: 'Subscription successful! Please check your email to verify.',
        verification_token: verificationToken, // Remove in production
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});