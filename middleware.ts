import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ADMIN_ROLE_HEADER_NAME, getDemoAdminToken, getFullAdminToken, isAdminRole } from '@/src/lib/admin-auth'

const ADMIN_LOGIN_PATH = '/admin/login'
const ADMIN_DEFAULT_PATH = '/admin/products'
const ADMIN_COOKIE_NAME = 'admin_session'

export const middleware = (request: NextRequest) => {
  if (!request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  const fullAdminToken = getFullAdminToken()
  const demoAdminToken = getDemoAdminToken()

  // Permite desarrollo local sin credenciales definidas.
  if (!fullAdminToken && !demoAdminToken) {
    return NextResponse.next()
  }

  const allowedTokens = [
    fullAdminToken,
    demoAdminToken,
  ].filter((value): value is string => Boolean(value))

  const currentToken = request.cookies.get(ADMIN_COOKIE_NAME)?.value

  if (request.nextUrl.pathname.startsWith(ADMIN_LOGIN_PATH)) {
    if (currentToken && allowedTokens.includes(currentToken)) {
      return NextResponse.redirect(new URL(ADMIN_DEFAULT_PATH, request.url))
    }

    return NextResponse.next()
  }

  if (!currentToken || !allowedTokens.includes(currentToken)) {
    const loginUrl = new URL(ADMIN_LOGIN_PATH, request.url)
    loginUrl.searchParams.set('next', `${request.nextUrl.pathname}${request.nextUrl.search}`)
    return NextResponse.redirect(loginUrl)
  }

  const requestHeaders = new Headers(request.headers)
  const roleHint = fullAdminToken && currentToken === fullAdminToken
    ? 'full'
    : demoAdminToken && currentToken === demoAdminToken
      ? 'readonly'
      : null

  if (isAdminRole(roleHint)) {
    requestHeaders.set(ADMIN_ROLE_HEADER_NAME, roleHint)
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: ['/admin/:path*'],
}
