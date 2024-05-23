// import { createServerClient } from '@supabase/ssr'
// import { Database } from '../types/supabase'

// export const serverClient = createServerClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://qodpvsrxixyxjqmdliop.supabase.co', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvZHB2c3J4aXh5eGpxbWRsaW9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYyNjEzMzMsImV4cCI6MjAzMTgzNzMzM30.glRvlxKfWOT_asEDsqmxR7hLoVJHOp1fdH5x97CpmSI', {
//   cookies: {
//     get(name: string) {
//       //const cookies = new RequestCookies(headers())
//       //console.log(JSON.stringify(cookies.getAll()))
//       return undefined
//     },
//   },
// })


import { createServerClient } from '@supabase/ssr'
import { Database } from '../types/supabase'

export const serverClient = createServerClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://qodpvsrxixyxjqmdliop.supabase.co', 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvZHB2c3J4aXh5eGpxbWRsaW9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYyNjEzMzMsImV4cCI6MjAzMTgzNzMzM30.glRvlxKfWOT_asEDsqmxR7hLoVJHOp1fdH5x97CpmSI',
  {
    cookies: {
      get(name: string) {
        return undefined
      },
    },
  }
)
