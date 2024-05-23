import { ClerkProvider } from '@clerk/nextjs'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { Roboto_Flex } from 'next/font/google'
import Footer from '../components/footer'
import NavBar from '../components/nav-bar'
import './globals.css'

const inter = Roboto_Flex({ subsets: ['latin'] })

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <ClerkProvider publishableKey='pk_test_c3RhYmxlLXdvcm0tNzkuY2xlcmsuYWNjb3VudHMuZGV2JA'>
        <body className={`${inter.className} antialiased`}>
          <div className='h-screen'>
            <NavBar />
            <div className='mx-auto min-h-[75vh] max-w-[1920px]'>{children}</div>
            <Footer />
          </div>
          <SpeedInsights />
          <Analytics />
        </body>
      </ClerkProvider>
    </html>
  )
}
