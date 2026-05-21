import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const unauthorizedResponse = () =>
  new NextResponse('Auth requerida', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Admin Panel", charset="UTF-8"',
    },
  })

export const middleware = (request: NextRequest) => {
  if (!request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  const adminUser = process.env.ADMIN_BASIC_USER
  const adminPassword = process.env.ADMIN_BASIC_PASSWORD

  // Permite desarrollo local sin credenciales definidas.
  if (!adminUser || !adminPassword) {
    return NextResponse.next()
  }

  const authorization = request.headers.get('authorization')
  if (!authorization?.startsWith('Basic ')) {
    return unauthorizedResponse()
  }

  const encodedCredentials = authorization.split(' ')[1] ?? ''
  const decodedCredentials = atob(encodedCredentials)
  const separatorIndex = decodedCredentials.indexOf(':')
  const user = decodedCredentials.slice(0, separatorIndex)
  const password = decodedCredentials.slice(separatorIndex + 1)

  if (user !== adminUser || password !== adminPassword) {
    return unauthorizedResponse()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
