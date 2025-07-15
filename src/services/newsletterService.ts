import { supabase } from '../lib/supabase';

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscription_status: boolean;
  verified: boolean;
  created_at: string;
  last_updated: string;
}

export interface SubscribeResponse {
  message: string;
  verification_token?: string;
}

export interface BroadcastRequest {
  subject: string;
  content: string;
  html_content?: string;
  sender_name?: string;
}

class NewsletterService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`;
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  async subscribe(email: string): Promise<SubscribeResponse> {
    try {
      const response = await this.makeRequest('/newsletter-subscribe', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });

      if (typeof window !== 'undefined' && (window as any).emailjs) {
        const emailjs = (window as any).emailjs;
        emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

        const timestamp = new Date().toLocaleString('en-ZA', {
          timeZone: 'Africa/Johannesburg',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });

        // ✅ Send verification email to subscriber
        if (response.verification_token) {
          const verificationUrl = `${window.location.origin}/verify-email?token=${response.verification_token}`;

          const subscriberTemplateParams = {
            email, // matches {{email}} in EmailJS
            name: email.split('@')[0], // matches {{name}}
            title: 'Please verify your email subscription - Hapo Group', // matches {{title}}
            message: `Thank you for subscribing to the Hapo Group newsletter!

Please click the link below to verify your email address and complete your subscription:

${verificationUrl}

If you didn't subscribe to our newsletter, please ignore this email.

Best regards,
The Hapo Group Team`,
            time: timestamp, // matches {{time}}
          };

          await emailjs.send(
            'service_8qqqqsh',
            'template_lb419zc', // ✅ Correct template for subscriber
            subscriberTemplateParams
          );

          console.log('✅ Verification email sent to subscriber:', email);
        }

        // ✅ Send admin notification
        const adminTemplateParams = {
          to_email: 'setu@hapogroup.co.za',
          subject: 'New Newsletter Subscription - Admin Notification',
          user_name: 'Admin',
          user_email: 'setu@hapogroup.co.za',
          message: `New newsletter subscription received from: ${email}

Subscription Details:
- Email: ${email}
- Status: Pending Verification
- Timestamp: ${timestamp}

Admin Dashboard: ${window.location.origin}/blog`,
          subscriber_email: email,
          subscription_type: 'New Newsletter Subscription',
          timestamp,
          verification_status: 'Pending Verification',
          admin_dashboard_url: `${window.location.origin}/blog`,
        };

        await emailjs.send(
          'service_8qqqqsh',
          'template_ppp8h3g', // ✅ Correct template for admin
          adminTemplateParams
        );

        console.log('✅ Admin notification sent for subscriber:', email);
      }

      return response;
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      throw error;
    }
  }

  async unsubscribe(email?: string, token?: string): Promise<{ message: string; email: string }> {
    return this.makeRequest('/newsletter-unsubscribe', {
      method: 'POST',
      body: JSON.stringify({ email, token }),
    });
  }

  async verifyEmail(token: string): Promise<{ message: string; email: string }> {
    return this.makeRequest('/newsletter-verify', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  }

  async sendBroadcast(data: BroadcastRequest): Promise<any> {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      throw new Error('Authentication required');
    }

    return this.makeRequest('/newsletter-broadcast', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
      },
      body: JSON.stringify(data),
    });
  }

  async getSubscribers(): Promise<NewsletterSubscriber[]> {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getSubscriberStats() {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('subscription_status, verified');

    if (error) throw error;

    const stats = {
      total: data?.length || 0,
      active: data?.filter(s => s.subscription_status && s.verified).length || 0,
      pending: data?.filter(s => s.subscription_status && !s.verified).length || 0,
      unsubscribed: data?.filter(s => !s.subscription_status).length || 0,
    };

    return stats;
  }
}

export const newsletterService = new NewsletterService();
