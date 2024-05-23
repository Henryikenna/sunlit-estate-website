import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from './supabase'

type DbResultOk<T> = T extends (...args: any[]) => PromiseLike<{ data: infer U }> ? Exclude<U, null> : never
export type propertiesWithImages = DbResultOk<typeof getSinglePropertyWithImages>

export const getSinglePropertyWithImages = (client: SupabaseClient<Database>, id: number) => {
  return client.from('realtor_property').select(`*, property_images (*), realtors (*)`).eq('id', id).limit(1).single()
}
