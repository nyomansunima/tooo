import { authOptions } from '@lib/config/auth'
import NextAuth from 'next-auth/next'

/**
 * Handle the authentication
 * using the new method in the client then will integrate with
 * backend api
 */
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
