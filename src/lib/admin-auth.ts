export const ADMIN_SESSION_COOKIE_NAME = 'admin_session'

type Credentials = {
  user: string
  password: string
}

export type AdminRole = 'full' | 'readonly' | null

const toToken = (credentials: Credentials) =>
  Buffer.from(`${credentials.user}:${credentials.password}`).toString('base64')

export const getFullAdminCredentials = (): Credentials | null => {
  const user = process.env.ADMIN_BASIC_USER?.trim()
  const password = process.env.ADMIN_BASIC_PASSWORD

  if (!user || !password) return null
  return { user, password }
}

export const getDemoAdminCredentials = (): Credentials | null => {
  const user = process.env.ADMIN_DEMO_USER?.trim()
  const password = process.env.ADMIN_DEMO_PASSWORD

  if (!user || !password) return null
  return { user, password }
}

export const getFullAdminToken = (): string | null => {
  const credentials = getFullAdminCredentials()
  return credentials ? toToken(credentials) : null
}

export const getDemoAdminToken = (): string | null => {
  const credentials = getDemoAdminCredentials()
  return credentials ? toToken(credentials) : null
}

export const getAdminRoleFromSession = (token: string | undefined): AdminRole => {
  if (!token) return null

  const fullToken = getFullAdminToken()
  if (fullToken && token === fullToken) return 'full'

  const demoToken = getDemoAdminToken()
  if (demoToken && token === demoToken) return 'readonly'

  return null
}

export const canAdminWrite = (token: string | undefined) => getAdminRoleFromSession(token) === 'full'
