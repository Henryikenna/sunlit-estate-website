import { RequestCookies } from '@edge-runtime/cookies'
import { createServerClient } from '@supabase/ssr'
import { SupabaseClient } from '@supabase/supabase-js'
import { headers } from 'next/headers'
import { Database } from '../types/supabase'

export async function getServerClient(token?: string | null): Promise<SupabaseClient<Database>> {
  const serverClient = createServerClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      get(name: string) {
        if (token) return token
        return new RequestCookies(headers()) as any
      },
    },
  })

  return serverClient
}
