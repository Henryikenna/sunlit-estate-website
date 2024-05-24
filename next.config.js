/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  plugins: [
    require('daisyui'),
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/**',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '3mb',
    },
  },
  env: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: "pk_test_c3RhYmxlLXdvcm0tNzkuY2xlcmsuYWNjb3VudHMuZGV2JA",
    CLERK_SECRET_KEY: "sk_test_YYOrrOxMUJwm3OOIbnKPardsS0gPDylQJMJpnw8O1u",
    NEXT_PUBLIC_SUPABASE_URL: "https://qodpvsrxixyxjqmdliop.supabase.co",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvZHB2c3J4aXh5eGpxbWRsaW9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYyNjEzMzMsImV4cCI6MjAzMTgzNzMzM30.glRvlxKfWOT_asEDsqmxR7hLoVJHOp1fdH5x97CpmSI",
  },
}

module.exports = nextConfig
