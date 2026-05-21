'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type AdminRouteProps = {
    link: {
        url: string
        text: string
        blank: boolean
    }
}
const AdminRoute = ({ link }: AdminRouteProps) => {
    const pathname = usePathname()
    const isActive = pathname.startsWith(link.url)
    return (
        <Link
            className={`mt-2 flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 sm:text-base ${isActive
                    ? 'border-amber-300 bg-amber-100 text-slate-900 shadow-sm'
                    : 'border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-amber-200 hover:bg-amber-50'
                }`}
            href={link.url}
            target={link.blank ? '_blank' : '_self'}
            rel={link.blank ? 'noopener noreferrer' : undefined} >
            {link.text}
            <span className={`text-xs uppercase tracking-wide ${isActive ? 'text-amber-800' : 'text-slate-400'}`}>
                {link.blank ? 'Externo' : 'Interno'}
            </span>
        </Link >
    )
}

export default AdminRoute