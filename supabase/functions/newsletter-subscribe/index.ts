// supabase/functions/newsletter-subscribe/index.ts

import { createClient } from '@supabase/supabase-js';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json',
};

export async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(200).set(corsHeaders).send('');
  }

  try {
    const { email } = req.body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).set(corsHeaders).json({ error: 'Invalid email format' });
    }

    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const verificationToken = crypto.randomUUID();

    const { data: existingSubscriber } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .eq('email', email)
      .single();

    let isNewSubscriber = false;

    if (existingSubscriber) {
      if (existingSubscriber.subscription_status && existingSubscriber.verified) {
        return res.status(200).set(corsHeaders).json({ message: 'Email already subscribed' });
      } else {
        const { error } = await supabase
          .from('newsletter_subscribers')
          .update({
            subscription_status: true,
            verification_token: verificationToken,
            verified: false,
          })
          .eq('email', email);

        if (error) throw error;
      }
    } else {
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

    const timestamp = new Date().toLocaleString('en-ZA', {
      timeZone: 'Africa/Johannesburg',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const adminParams = {
      to_email: 'admin@hapogroup.co.za',
      subscriber_email: email,
      subscription_type: isNewSubscriber ? 'New Subscription' : 'Reactivated Subscription',
      timestamp,
      verification_status: 'Pending Verification',
      admin_dashboard_url: `${req.headers.origin || 'https://hapogroup.co.za'}/blog`,
    };

    await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: 'service_8tnpp8e',
        template_id: 'template_gph0dwl',
        user_id: 'Txq4l3HisplFnFjK8',
        template_params: adminParams,
      }),
    });

    const verificationUrl = `${req.headers.origin || 'https://hapogroup.co.za'}/verify-email?token=${verificationToken}`;

    const subscriberParams = {
      email,
      name: email.split('@')[0],
      title: 'Please verify your email subscription - Hapo Group',
      message: `Thank you for subscribing to the Hapo Group newsletter!\n\nClick the link below to verify:\n\n${verificationUrl}`,
      time: timestamp,
    };

    await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: 'service_8tnpp8e',
        template_id: 'template_yh0vylp',
        user_id: 'Txq4l3HisplFnFjK8',
        template_params: subscriberParams,
      }),
    });

    return res.status(200).set(corsHeaders).json({
      message: 'Subscription successful. Please check your email to verify.',
      verification_token: verificationToken, // Optional: remove in production
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).set(corsHeaders).json({ error: 'Internal Server Error' });
  }
}
