'use server'
import { revalidateTag } from 'next/cache'

const clearCachesByTagServerAction = async (tag: string) => {
  try {
    if (tag) {
      revalidateTag(tag)
    }
  } catch (error) {
    console.error('clearCachesByServerAction=> ', error)
  }
}
export default clearCachesByTagServerAction
