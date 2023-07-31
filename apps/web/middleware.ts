import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Middleware to maintain the
 * state of the app, include adding the guard
 * for some routes
 */
export default async function middleware(request: NextRequest) {
  // define the token that we get form teh next auth
  // then use to secure some path and routes
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })
  const pathname = request.nextUrl.pathname

  // secure the login page
  if (pathname.includes('/signin') && token) {
    return NextResponse.redirect(new URL('/shop', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/signin/:path*'],
}
