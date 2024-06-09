'use client'
import { ClerkProvider } from '@clerk/nextjs'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Roboto_Flex } from 'next/font/google'
import Footer from '../components/footer'
import NavBar from '../components/nav-bar'
import './globals.css'
import { usePathname } from 'next/navigation'
import './metadata' // import the metadata (optional if not used in the file)

const inter = Roboto_Flex({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const route = usePathname()

  return (
    <html lang='en'>
    <link rel="icon" href="/sunbelt-logo-transparent.png" sizes="any" />
      <ClerkProvider publishableKey='pk_test_c3RhYmxlLXdvcm0tNzkuY2xlcmsuYWNjb3VudHMuZGV2JA'>
        <body className={`${inter.className} antialiased`}>
          <div className=''>
            <NavBar doesNavbarHaveBackgroundColor={route === '/buy' || route === '/rent' || route === '/sell' ? true : false} isUserSignedIn={route === '/sell' ? true : false} />
            <div className='mx-auto min-h-[75vh] max-w-[1920px]'>
              {children}
            </div>
            <Footer />
          </div>
          <SpeedInsights />
          <Analytics />
        </body>
      </ClerkProvider>
    </html>
  )
}
