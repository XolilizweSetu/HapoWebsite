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
    // Make sure the base URL ends without a trailing slash
    this.baseUrl = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, '') + '/functions/v1';
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
      // Try to parse error json for clearer message
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Subscribe function improved
  async subscribe(email: string): Promise<SubscribeResponse> {
    try {
      const response = await this.makeRequest('/newsletter-subscribe', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });

      // Send emails only if EmailJS is loaded in the browser
      if (typeof window !== 'undefined' && (window as any).emailjs) {
        const emailjs = (window as any).emailjs;
        emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'Txq4l3HisplFnFjK8');

        const timestamp = new Date().toLocaleString('en-ZA', {
          timeZone: 'Africa/Johannesburg',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });

        // Send verification email to subscriber if token present
        if (response.verification_token) {
          const verificationUrl = `${window.location.origin}/verify-email?token=${response.verification_token}`;

          const subscriberTemplateParams = {
            email,
            name: email.split('@')[0],
            title: 'Please verify your email subscription - Hapo Group',
            message: `Thank you for subscribing to the Hapo Group newsletter!\n\nPlease click the link below to verify your email address and complete your subscription:\n\n${verificationUrl}\n\nIf you didn't subscribe to our newsletter, please ignore this email.\n\nBest regards,\nThe Hapo Group Team`,
            time: timestamp,
          };

          await emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_8tnpp8e',
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID_SUBSCRIBER || 'template_yh0vylp',
            subscriberTemplateParams
          );
        }

        // Send admin notification email
        const adminTemplateParams = {
          to_email: import.meta.env.VITE_NEWSLETTER_FROM_EMAIL || 'admin@hapogroup.co.za',
          subject: 'New Newsletter Subscription - Admin Notification',
          user_name: 'Admin',
          user_email: import.meta.env.VITE_NEWSLETTER_FROM_EMAIL || 'admin@hapogroup.co.za',
          message: `New newsletter subscription received from: ${email}\n\nSubscription Details:\n- Email: ${email}\n- Status: Pending Verification\n- Timestamp: ${timestamp}\n\nAdmin Dashboard: ${window.location.origin}/blog`,
          subscriber_email: email,
          subscription_type: 'New Newsletter Subscription',
          timestamp,
          verification_status: 'Pending Verification',
          admin_dashboard_url: `${window.location.origin}/blog`,
        };

        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_8tnpp8e',
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID_ADMIN || 'template_gph0dwl',
          adminTemplateParams
        );
      }

      return response;
    } catch (error: any) {
      console.error('Newsletter subscription error:', error);
      throw new Error(error.message || 'Failed to subscribe');
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
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
      throw new Error('Authentication required');
    }

    return this.makeRequest('/newsletter-broadcast', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
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

    return {
      total: data?.length || 0,
      active: data?.filter((s) => s.subscription_status && s.verified).length || 0,
      pending: data?.filter((s) => s.subscription_status && !s.verified).length || 0,
      unsubscribed: data?.filter((s) => !s.subscription_status).length || 0,
    };
  }
}

export const newsletterService = new NewsletterService();
