import { createClient } from '@supabase/supabase-js'

// Use environment variables or fallback to empty strings to avoid runtime errors
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create client only if both URL and key are provided
const supabaseClient = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Export a wrapped version of supabase that safely handles missing credentials
export const supabase = {
  from: (table: string) => {
    if (!supabaseClient) {
      console.warn('Supabase client is not initialized. Using fallback data.');
      return {
        select: () => ({
          eq: () => ({
            single: async () => ({ data: null, error: new Error('Supabase not configured') })
          }),
          order: () => ({
            range: () => ({})
          })
        }),
        insert: () => ({
          select: async () => ({ data: null, error: new Error('Supabase not configured') })
        }),
        update: () => ({
          eq: async () => ({ data: null, error: new Error('Supabase not configured') })
        }),
        delete: () => ({
          eq: async () => ({ data: null, error: new Error('Supabase not configured') })
        })
      };
    }
    return supabaseClient.from(table);
  },
  auth: {
    signInWithPassword: async (credentials: any) => {
      if (!supabaseClient) {
        return { data: null, error: new Error('Supabase not configured') };
      }
      return supabaseClient.auth.signInWithPassword(credentials);
    },
    signOut: async () => {
      if (!supabaseClient) {
        return { error: new Error('Supabase not configured') };
      }
      return supabaseClient.auth.signOut();
    },
    getSession: async () => {
      if (!supabaseClient) {
        return { data: { session: null }, error: new Error('Supabase not configured') };
      }
      return supabaseClient.auth.getSession();
    }
  }
} 