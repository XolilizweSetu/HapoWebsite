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
    console.log('Subscribing email:', email);
    return this.makeRequest('/newsletter-subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async unsubscribe(email?: string, token?: string): Promise<{ message: string; email: string }> {
    return this.makeRequest('/newsletter-unsubscribe', {
      method: 'POST',
      body: JSON.stringify({ email, token }),
    });
  }

  async verifyEmail(token: string): Promise<{ message: string; email: string }> {
    console.log('Verifying token:', token);
    return this.makeRequest('/newsletter-verify', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  }

  async sendBroadcast(data: BroadcastRequest): Promise<any> {
    // This requires authentication, so we need to get the user's session
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