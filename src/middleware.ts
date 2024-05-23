import { clerkMiddleware } from '@clerk/nextjs/server'

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
// export default clerkMiddleware({
//   publicRoutes: ['/', '/buy', '/rent', '/realtors', '/aboutus', '/api/webhook', '/listings/:id/:slug', 'listings/:id', '/search'],
//   ignoredRoutes: ['/_vercel/speed-insights/vitals'],
//   //debug: true,
// })

export default clerkMiddleware({
  publishableKey: "pk_test_c3RhYmxlLXdvcm0tNzkuY2xlcmsuYWNjb3VudHMuZGV2JA"
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
