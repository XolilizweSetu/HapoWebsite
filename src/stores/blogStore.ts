import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { BlogPost, Category, CreatePostData } from '../lib/supabase';
import toast from 'react-hot-toast';

interface BlogStore {
  posts: BlogPost[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  user: any;
  isAuthenticated: boolean;

  fetchPosts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  createPost: (data: CreatePostData) => Promise<BlogPost | null>;
  updatePost: (id: string, data: Partial<CreatePostData>) => Promise<BlogPost | null>;
  deletePost: (id: string) => Promise<boolean>;
  uploadImage: (file: File) => Promise<string | null>;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useBlogStore = create<BlogStore>((set, get) => ({
  posts: [],
  categories: [],
  loading: false,
  error: null,
  user: null,
  isAuthenticated: false,

  checkAuth: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // If no user is returned, clear any stale session data
        await supabase.auth.signOut();
        set({ user: null, isAuthenticated: false });
      } else {
        set({ user, isAuthenticated: true });
      }
    } catch (error) {
      console.error('Auth check error:', error);
      // Clear any invalid session data on error
      await supabase.auth.signOut();
      set({ user: null, isAuthenticated: false });
    }
  },

  signIn: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      set({ 
        user: data.user, 
        isAuthenticated: true, 
        loading: false 
      });
      
      toast.success('Signed in successfully!');
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to sign in';
      set({ error: message, loading: false });
      toast.error(message);
      return false;
    }
  },

  signUp: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      set({ 
        user: data.user, 
        isAuthenticated: !!data.user, 
        loading: false 
      });
      
      toast.success('Account created successfully!');
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to sign up';
      set({ error: message, loading: false });
      toast.error(message);
      return false;
    }
  },

  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      set({ 
        user: null, 
        isAuthenticated: false 
      });
      
      toast.success('Signed out successfully!');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to sign out';
      toast.error(message);
    }
  },

  fetchPosts: async () => {
    set({ loading: true, error: null });
    try {
      console.log('Attempting to fetch posts from Supabase...');
      
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          category:categories(*)
        `)
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase query error:', error);
        console.error('Error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw error;
      }
      
      console.log('Posts fetched successfully:', data?.length || 0, 'posts');
      set({ posts: data || [], loading: false });
    } catch (error) {
      console.error('Fetch posts error details:', {
        error,
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        type: typeof error,
        name: error instanceof Error ? error.name : undefined
      });
      
      let message = 'Failed to fetch posts';
      
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch')) {
          message = 'Network error: Unable to connect to Supabase. Please check your internet connection and Supabase project status.';
        } else {
          message = error.message;
        }
      }
      
      set({ error: message, loading: false });
      toast.error(message);
    }
  },

  fetchCategories: async () => {
    try {
      console.log('Attempting to fetch categories from Supabase...');
      
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) {
        console.error('Supabase categories query error:', error);
        throw error;
      }
      
      console.log('Categories fetched successfully:', data?.length || 0, 'categories');
      set({ categories: data || [] });
    } catch (error) {
      console.error('Fetch categories error details:', error);
      
      let message = 'Failed to fetch categories';
      
      if (error instanceof Error && error.message.includes('Failed to fetch')) {
        message = 'Network error: Unable to connect to Supabase. Please check your internet connection and Supabase project status.';
      } else if (error instanceof Error) {
        message = error.message;
      }
      
      set({ error: message });
      toast.error(message);
    }
  },

  createPost: async (data: CreatePostData) => {
    const { isAuthenticated } = get();
    
    if (!isAuthenticated) {
      toast.error('You must be signed in to create posts');
      return null;
    }

    set({ loading: true, error: null });
    
    try {
      console.log('Creating post with data:', data);
      
      // Validate required fields
      if (!data.title || !data.excerpt || !data.content) {
        throw new Error('Title, excerpt, and content are required');
      }

      const { data: post, error } = await supabase
        .from('posts')
        .insert([{
          title: data.title,
          excerpt: data.excerpt,
          content: data.content,
          image_url: data.image_url,
          category_id: data.category_id,
          read_time: data.read_time || 5,
          published: data.published !== false
        }])
        .select(`
          *,
          category:categories(*)
        `)
        .single();

      if (error) {
        console.error('Create post error:', error);
        throw error;
      }

      console.log('Post created successfully:', post);

      set(state => ({
        posts: [post, ...state.posts],
        loading: false,
      }));

      return post;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create post';
      console.error('Create post error:', error);
      set({ error: message, loading: false });
      throw error; // Re-throw to handle in component
    }
  },

  updatePost: async (id: string, data: Partial<CreatePostData>) => {
    const { isAuthenticated } = get();
    
    if (!isAuthenticated) {
      toast.error('You must be signed in to update posts');
      return null;
    }

    set({ loading: true, error: null });
    try {
      const { data: post, error } = await supabase
        .from('posts')
        .update(data)
        .eq('id', id)
        .select(`
          *,
          category:categories(*)
        `)
        .single();

      if (error) throw error;

      set(state => ({
        posts: state.posts.map(p => (p.id === id ? post : p)),
        loading: false,
      }));

      toast.success('Post updated successfully!');
      return post;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update post';
      set({ error: message, loading: false });
      toast.error(message);
      return null;
    }
  },

  deletePost: async (id: string) => {
    const { isAuthenticated } = get();
    
    if (!isAuthenticated) {
      toast.error('You must be signed in to delete posts');
      return false;
    }

    set({ loading: true, error: null });
    try {
      const { error } = await supabase.from('posts').delete().eq('id', id);
      if (error) throw error;

      set(state => ({
        posts: state.posts.filter(p => p.id !== id),
        loading: false,
      }));

      toast.success('Post deleted successfully!');
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete post';
      set({ error: message, loading: false });
      toast.error(message);
      return false;
    }
  },

  uploadImage: async (file: File) => {
    const { isAuthenticated } = get();
    
    if (!isAuthenticated) {
      toast.error('You must be signed in to upload images');
      return null;
    }

    try {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('Please select a valid image file');
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('Image size must be less than 5MB');
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `blog-images/${fileName}`;

      console.log('Uploading image:', filePath);

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      console.log('Image uploaded successfully:', data.publicUrl);
      return data.publicUrl;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to upload image';
      console.error('Upload image error:', error);
      toast.error(message);
      return null;
    }
  },
}));