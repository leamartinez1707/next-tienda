import { NextResponse } from "next/server"
import { ADMIN_SESSION_COOKIE_NAME } from "@/src/lib/admin-auth"

export const POST = async (request: Request) => {
  const response = NextResponse.redirect(new URL('/admin/login', request.url))

  response.cookies.set({
    name: ADMIN_SESSION_COOKIE_NAME,
    value: '',
    path: '/',
    maxAge: 0,
  })

  return response
}
