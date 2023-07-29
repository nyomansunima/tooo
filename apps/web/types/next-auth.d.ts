import NextAuth from 'next-auth/next'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string
    refreshToken: string
  }
}

declare module 'next-auth' {
  interface Session {
    accessToken: string
    refreshToken: string
    user: {
      id: string
      email: string
      username: string
      providers: string[]
      role: string
    }
  }

  interface User {
    accessToken: string
    refreshToken: string
  }
}
