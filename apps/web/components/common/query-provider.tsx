'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FC, ReactNode, useState } from 'react'

interface QueryProviderProps {
  children?: ReactNode
}

/**
 * Render the query client provider
 * to support the app directory
 *
 * @returns {FC}
 */
const QueryProvider: FC<QueryProviderProps> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export { QueryProvider }
