// 'use server'

// import { useAuth } from '@clerk/nextjs'
// import clearCachesByTagServerAction from '../../../../cache/invalidate-cache'
// import { PROPERTY_CACHE } from '../../../../cache/keys'
// import { directSessionClient } from '../../../../supabase/client-config'

// export async function deleteListing(listingId: number) {
//   const { userId, getToken } = useAuth()
//   const token = await getToken({ template: 'supabase' })
//   //const client = await getServerClient(token)
//   const client = await directSessionClient(token!)
//   const result = await client.from('realtor_property').delete().eq('id', listingId)
//   if (result.error) throw result.error
//   clearCachesByTagServerAction(PROPERTY_CACHE)
// }


import { useAuth } from '@clerk/nextjs'
import clearCachesByTagServerAction from '../../../../cache/invalidate-cache'
import { PROPERTY_CACHE } from '../../../../cache/keys'
import { directSessionClient } from '../../../../supabase/client-config'

export async function deleteListing(listingId: number) {
  // Move the useAuth hook call to where you have access to the React context
  const { getToken } = useAuth()
  const token = await getToken({ template: 'supabase' })
  //const client = await getServerClient(token)
  const client = await directSessionClient(token!)
  const result = await client.from('realtor_property').delete().eq('id', listingId)
  if (result.error) throw result.error
  clearCachesByTagServerAction(PROPERTY_CACHE)
}
