import { ThemeProvider } from '@components/common/theme-provider'
import './globals.css'
import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import { QueryProvider } from '@components/common/query-provider'

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
        className={`${manrope.className} bg-white text-base leading-relaxed font-semibold text-black`}
      >
        <ThemeProvider attribute="theme" enableSystem defaultTheme="light">
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
