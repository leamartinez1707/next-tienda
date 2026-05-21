import { NextResponse } from "next/server"
import {
  ADMIN_SESSION_COOKIE_NAME,
  getDemoAdminCredentials,
  getDemoAdminToken,
  getFullAdminCredentials,
  getFullAdminToken,
} from "@/src/lib/admin-auth"

const ADMIN_DEFAULT_PATH = '/admin/products'

const getInvalidLoginRedirect = (requestUrl: string, safeNext: string) => {
  const invalidUrl = new URL('/admin/login', requestUrl)
  invalidUrl.searchParams.set('error', 'invalid')
  invalidUrl.searchParams.set('next', safeNext)
  return NextResponse.redirect(invalidUrl)
}

export const POST = async (request: Request) => {
  const formData = await request.formData()

  const username = String(formData.get('username') ?? '').trim()
  const password = String(formData.get('password') ?? '')
  const next = String(formData.get('next') ?? ADMIN_DEFAULT_PATH)
  const safeNext = next.startsWith('/admin') ? next : ADMIN_DEFAULT_PATH

  const fullCredentials = getFullAdminCredentials()
  const demoCredentials = getDemoAdminCredentials()
  const fullToken = getFullAdminToken()
  const demoToken = getDemoAdminToken()

  if (!fullCredentials && !demoCredentials) {
    const disabledUrl = new URL('/admin/login', request.url)
    disabledUrl.searchParams.set('error', 'disabled')
    return NextResponse.redirect(disabledUrl)
  }

  const isFullCredentials = fullCredentials
    ? username === fullCredentials.user && password === fullCredentials.password
    : false
  const isDemoCredentials = demoCredentials
    ? username === demoCredentials.user && password === demoCredentials.password
    : false

  if (!isFullCredentials && !isDemoCredentials) {
    return getInvalidLoginRedirect(request.url, safeNext)
  }

  const sessionToken = isFullCredentials ? fullToken : demoToken
  if (!sessionToken) return getInvalidLoginRedirect(request.url, safeNext)

  const response = NextResponse.redirect(new URL(safeNext, request.url))
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE_NAME,
    value: sessionToken,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8,
  })

  return response
}
