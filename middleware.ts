import NextAuth from 'next-auth'
import { authConfig } from './auth.config'

// Apply NextAuth middleware with the provided configuration
export default NextAuth(authConfig).auth

// Define the route matcher configuration
export const config = {
  // Exclude certain routes from NextAuth processing
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
}
