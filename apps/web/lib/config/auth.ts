import { useApiConnection } from '@lib/utils/api-connection'
import { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

/**
 * ## authOptions
 *
 * Auth configuration option
 * for each provider following with api connection to database
 */
const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_CLIENT_ID!,
      clientSecret: process.env.AUTH_GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider == 'google') {
        const res = await useApiConnection<any>('/auth/google', {
          method: 'POST',
          body: {
            tokenId: account.id_token,
            accessToken: account.access_token,
          },
        })

        user.accessToken = res.accessToken
        user.refreshToken = res.refreshToken
        user.issueAt = res.iat
        user.expiredAt = res.exp
        return true
      }

      if (account?.provider == 'github') {
        const res = await useApiConnection<any>('/auth/github', {
          method: 'POST',
          body: { accessToken: account.access_token },
        })

        user.accessToken = res.accessToken
        user.refreshToken = res.refreshToken
        user.issueAt = res.iat
        user.expiredAt = res.exp
        return true
      }
      return false
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
        token.issueAt = user.issueAt
        token.expiredAt = user.expiredAt
      }

      return token
    },
    session: async ({ session, token }) => {
      // check if the access Token stil valid
      // then refresh it when needed
      if (token.issueAt * 1000 < Date.now()) {
      }

      // get the user info from the access token
      const user = await useApiConnection<any>('/user', {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
      })
      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken
      session.issueAt = token.issueAt
      session.expiredAt = token.expiredAt
      session.user = user

      return session
    },
  },
  pages: {
    signIn: '/signin',
    error: '/signin',
  },
}

export { authOptions }
