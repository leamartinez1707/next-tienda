import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ADMIN_LOGIN_PATH = '/admin/login'
const ADMIN_DEFAULT_PATH = '/admin/products'
const ADMIN_COOKIE_NAME = 'admin_session'

const createSessionToken = (user: string, password: string) => btoa(`${user}:${password}`)

export const middleware = (request: NextRequest) => {
  if (!request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  const adminUser = process.env.ADMIN_BASIC_USER
  const adminPassword = process.env.ADMIN_BASIC_PASSWORD
  const demoUser = process.env.ADMIN_DEMO_USER
  const demoPassword = process.env.ADMIN_DEMO_PASSWORD

  // Permite desarrollo local sin credenciales definidas.
  if ((!adminUser || !adminPassword) && (!demoUser || !demoPassword)) {
    return NextResponse.next()
  }

  const allowedTokens = [
    adminUser && adminPassword ? createSessionToken(adminUser, adminPassword) : null,
    demoUser && demoPassword ? createSessionToken(demoUser, demoPassword) : null,
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

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
