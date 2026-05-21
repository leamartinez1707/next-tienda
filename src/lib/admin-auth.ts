export const ADMIN_SESSION_COOKIE_NAME = 'admin_session'
export const ADMIN_ROLE_HEADER_NAME = 'x-admin-role'

type Credentials = {
  user: string
  password: string
}

export type AdminRole = 'full' | 'readonly' | null

const ADMIN_ROLES: Exclude<AdminRole, null>[] = ['full', 'readonly']

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

export const isAdminRole = (value: string | null | undefined): value is Exclude<AdminRole, null> =>
  Boolean(value) && ADMIN_ROLES.includes(value as Exclude<AdminRole, null>)

export const resolveAdminRole = (
  token: string | undefined,
  roleHint: string | null | undefined,
): AdminRole => {
  if (isAdminRole(roleHint)) return roleHint
  return getAdminRoleFromSession(token)
}

export const canAdminManageProducts = (
  token: string | undefined,
  roleHint?: string | null,
) => resolveAdminRole(token, roleHint) === 'full'

export const canAdminCompleteOrders = (
  token: string | undefined,
  roleHint: string | null | undefined,
) => isAdminRole(resolveAdminRole(token, roleHint))
