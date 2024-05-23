'use server'

import { auth } from '@clerk/nextjs'
import clearCachesByTagServerAction from '../../../../cache/invalidate-cache'
import { PROPERTY_CACHE } from '../../../../cache/keys'
import { directSessionClient } from '../../../../supabase/client-config'

export async function deleteListing(listingId: number) {
  const { userId, getToken } = auth()
  const token = await getToken({ template: 'supabase' })
  //const client = await getServerClient(token)
  const client = await directSessionClient(token!)
  const result = await client.from('realtor_property').delete().eq('id', listingId)
  if (result.error) throw result.error
  clearCachesByTagServerAction(PROPERTY_CACHE)
}
