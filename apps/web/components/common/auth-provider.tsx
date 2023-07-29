'use client'

import { FC, ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'

interface AuthProviderProps {
  children: ReactNode
}

/**
 * ## AuthProvider
 *
 * handle the authorization on the client app
 * by passing the session and the token
 *
 * @returns {FC}
 */
const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>
}

export { AuthProvider }
