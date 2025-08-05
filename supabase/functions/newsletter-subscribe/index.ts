import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

app.post('/api/newsletter-subscribe', async (req, res) => {
  const { email } = req.body;

  // Basic validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  const verificationToken = crypto.randomUUID();
  let isNewSubscriber = false;

  // Check if email already exists
  const { data: existingSubscriber } = await supabase
    .from('newsletter_subscribers')
    .select('*')
    .eq('email', email)
    .single();

  if (existingSubscriber) {
    if (existingSubscriber.subscription_status && existingSubscriber.verified) {
      return res.status(200).json({ message: 'Email already subscribed' });
    } else {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .update({
          subscription_status: true,
          verification_token: verificationToken,
          verified: false,
        })
        .eq('email', email);

      if (error) return res.status(500).json({ error: error.message });
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

    if (error) return res.status(500).json({ error: error.message });
    isNewSubscriber = true;
  }

  // Send admin email via EmailJS
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
      admin_dashboard_url: `https://your-site.com/blog`,
    };

    const emailJSResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_TEMPLATE_ID,
        user_id: process.env.EMAILJS_USER_ID,
        template_params: adminNotificationData,
      }),
    });

    if (!emailJSResponse.ok) {
      console.error(await emailJSResponse.text());
    }
  } catch (e) {
    console.error('Failed to send admin email:', e);
  }

  return res.status(200).json({
    message: 'Subscription successful! Please check your email to verify.',
    verification_token: verificationToken, // ⚠️ remove in production
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`✅ Newsletter API running on http://localhost:${PORT}`));
