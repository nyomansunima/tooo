import { ThemeProvider } from '@components/common/theme-provider'
import './globals.css'
import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import { QueryProvider } from '@components/common/query-provider'
import { AuthProvider } from '@components/common/auth-provider'

const manrope = Manrope({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Grow your business from demand market | Tooo',
  description: 'Sell and buy digital products from the best demand market',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${manrope.className} bg-white text-base leading-relaxed font-semibold text-black dark:bg-black dark:text-neutral-100`}
      >
        <ThemeProvider attribute="class" enableSystem defaultTheme="light">
          <AuthProvider>
            <QueryProvider>{children}</QueryProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
