'use client'
import React from 'react'
import clearCachesByTagServerAction from '../../cache/invalidate-cache'
import { PROPERTY_CACHE } from '../../cache/keys'

type Props = {}

const ClearCacheButton = (props: Props) => {
  function clearCache() {
    clearCachesByTagServerAction(PROPERTY_CACHE)
  }
  return (
    <button type='button' className='button' onClick={clearCache}>
      Clear Cache
    </button>
  )
}

export default ClearCacheButton
