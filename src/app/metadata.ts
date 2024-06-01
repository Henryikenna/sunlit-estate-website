'use strict'

// src/app/metadata.ts
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.sunlitcaribbeanestates.com'),
  title: 'Sunlit Caribbean Estates',
  description: 'A ABC Island property listing aggregator',
  openGraph: {
    type: 'website',
    title: 'Sunlit Caribbean Estates',
    siteName: 'Sunlit Caribbean Estates',
    description: 'A ABC Island property listing aggregator',
    url: 'https://www.sunlitcaribbeanestates.com/',
  },
}
