import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { authConfig } from './auth.config'
import { z } from 'zod'
import { getStringFromBuffer } from './lib/utils'
import { getUser } from './app/login/actions'

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        // Parse and validate incoming credentials using Zod
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6)
          })
          .safeParse(credentials)

        // Check if parsing was successful
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data
          // Retrieve user data from the database
          const user = await getUser(email)

          // If user exists, perform password verification
          if (user) {
            const encoder = new TextEncoder()
            const saltedPassword = encoder.encode(password + user.salt)
            const hashedPasswordBuffer = await crypto.subtle.digest(
              'SHA-256',
              saltedPassword
            )
            const hashedPassword = getStringFromBuffer(hashedPasswordBuffer)

            // Compare hashed passwords
            if (hashedPassword === user.password) {
              return user // Return user data if password matches
            }
          }
        }

        // Return null if credentials are invalid or user does not exist
        return null
      }
    })
  ]
})
