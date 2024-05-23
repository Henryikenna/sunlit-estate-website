import { SupabaseClient, SupportedStorage, createClient } from '@supabase/supabase-js'
import { Database } from '../types/supabase'

const options = {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    storage: inMemoryStorageProvider(),
  },
}

export async function directSessionClient(access_token: string) {
  const client = createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    ...options,
    global: { headers: { Authorization: `Bearer ${access_token}` } },
    db: { schema: 'public' },
  })

  return client
}

function inMemoryStorageProvider(): SupportedStorage {
  const items = new Map()
  return {
    getItem: (key: string) => items.get(key),
    setItem: (key: string, value: string) => {
      items.set(key, value)
    },
    removeItem: (key: string) => {
      items.delete(key)
    },
  } as SupportedStorage
}
