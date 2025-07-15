import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug environment variables
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key exists:', !!supabaseAnonKey);
console.log('Supabase Anon Key length:', supabaseAnonKey?.length);

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

// Validate URL format
try {
  new URL(supabaseUrl);
} catch (error) {
  throw new Error(`Invalid Supabase URL format: ${supabaseUrl}`);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ✅ Test connection using async/await to avoid PromiseLike<void> error
(async () => {
  try {
    const { error } = await supabase
      .from('posts')
      .select('count', { count: 'exact', head: true });

    if (error) {
      console.error('Supabase connection test failed:', error);
    } else {
      console.log('Supabase connection test successful');
    }
  } catch (err) {
    console.error('Supabase connection test error:', err);
  }
})();

// Database types
interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  created_at: string;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image_url?: string;
  category_id?: string;
  category?: Category;
  read_time: number;
  published: boolean;
  source?: string;
  source_url?: string;
  created_at: string;
  updated_at: string;
}

interface CreatePostData {
  title: string;
  excerpt: string;
  content: string;
  image_url?: string;
  category_id?: string;
  read_time: number;
  published?: boolean;
  source?: string;
  source_url?: string;
}

export type { Category, BlogPost, CreatePostData };
