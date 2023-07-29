import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

/**
 * Middleware to maintain the
 * state of the app, include adding the guard
 * for some routes
 */
export default withAuth(function middleware(request) {
  const token = request.nextauth.token
  const pathname = request.nextUrl.pathname

  // secure the login page
  if (pathname.includes('/signin') && token) {
    return NextResponse.redirect(new URL('/shop', request.url))
  }

  return NextResponse.next()
}, {})

export const config = {
  matcher: ['/signin/:path*'],
}
