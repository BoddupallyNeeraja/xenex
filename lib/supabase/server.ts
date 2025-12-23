import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

/**
 * Creates a Supabase client for server-side usage
 * Uses service role key if available, otherwise falls back to anon key
 * 
 * IMPORTANT: Service role key bypasses RLS - only use in trusted server environments
 * 
 * @returns Supabase client instance
 */
export async function createServerSupabaseClient(): Promise<SupabaseClient> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
  }

  // Prefer service role key for server-side (bypasses RLS and schema cache)
  // Fallback to anon key if service role not available
  const apiKey = supabaseServiceKey || supabaseAnonKey

  if (!apiKey) {
    throw new Error('Missing Supabase API key. Set SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY')
  }

  // Create client with server-optimized configuration
  const client = createClient(supabaseUrl, apiKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false
    },
    db: {
      schema: 'public'
    },
    global: {
      headers: {
        'x-client-info': 'xenex-server-api'
      }
    }
  })

  return client
}
