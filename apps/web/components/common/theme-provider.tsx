'use client'

import { ThemeProviderProps } from 'next-themes/dist/types'
import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { FC } from 'react'

/**
 * Render the the provider
 * to allow switch between theme
 *
 * @returns {React.FC}
 */
const ThemeProvider: FC<ThemeProviderProps> = ({ children, ...props }) => {
  return <NextThemeProvider {...props}>{children}</NextThemeProvider>
}

export { ThemeProvider }
