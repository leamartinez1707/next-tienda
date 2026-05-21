import Link from "next/link"
import { getDemoAdminCredentials } from "@/src/lib/admin-auth"

const getErrorMessage = (error: string | undefined) => {
  if (error === 'invalid') return 'Credenciales invalidas. Intenta nuevamente.'
  if (error === 'disabled') return 'El acceso admin no esta disponible en este entorno.'
  return null
}

const LoginPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>
}) => {
  const { next, error } = await searchParams
  const safeNext = next?.startsWith('/admin') ? next : '/admin/products'
  const errorMessage = getErrorMessage(error)
  const demoCredentials = getDemoAdminCredentials()

  return (
    <div className="mx-auto flex min-h-[70dvh] w-full max-w-xl items-center justify-center px-3 py-8 sm:px-4">
      <section className="w-full rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Admin</p>
        <h1 className="mt-2 text-2xl font-black text-slate-950">Ingresar al panel</h1>
        <p className="mt-2 text-sm text-slate-600">Login rapido para probar el panel administrativo.</p>

        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-sm text-amber-900">
          <p className="font-semibold">Credenciales de demo (solo lectura)</p>
          <p className="mt-1">Usuario: <span className="font-mono font-semibold">{demoCredentials.user}</span></p>
          <p>Password: <span className="font-mono font-semibold">{demoCredentials.password}</span></p>
        </div>

        {errorMessage ? (
          <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
            {errorMessage}
          </p>
        ) : null}

        <form method="post" action="/api/admin/login" className="mt-5 space-y-3">
          <input type="hidden" name="next" value={safeNext} />

          <div className="space-y-1.5">
            <label htmlFor="username" className="text-sm font-semibold text-slate-700">
              Usuario
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-amber-400 focus:bg-white"
              placeholder="Tu usuario"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="text-sm font-semibold text-slate-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-amber-400 focus:bg-white"
              placeholder="Tu password"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-black"
          >
            Entrar al admin
          </button>
        </form>

        <Link href="/" className="mt-4 inline-flex text-sm font-semibold text-amber-700 hover:text-amber-800">
          Volver al inicio
        </Link>
      </section>
    </div>
  )
}

export default LoginPage
