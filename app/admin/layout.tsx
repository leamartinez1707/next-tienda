import AdminSidebar from "@/components/admin/AdminSidebar";
import Notification from "@/components/ui/Notification";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE_NAME, getAdminRoleFromSession } from "@/src/lib/admin-auth";

export default async function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value
    const adminRole = getAdminRoleFromSession(sessionToken)

    return (
        <>
            <div className="min-h-screen md:flex bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.14),_transparent_35%),linear-gradient(180deg,_#f8fafc_0%,_#eef2f7_100%)]">
                <aside className="border-b border-gray-200 bg-white/95 backdrop-blur md:h-screen md:w-80 md:sticky md:top-0 md:border-b-0 md:border-r">
                    <AdminSidebar />
                </aside>

                <main className="p-3 sm:p-4 md:flex-1 md:h-screen md:overflow-y-scroll md:p-6" role="main">
                    {adminRole === 'readonly' ? (
                        <div className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                            <p className="font-semibold">Modo demo: solo lectura</p>
                            <p className="mt-1">Puedes recorrer el panel, pero no crear, editar ni completar acciones.</p>
                        </div>
                    ) : null}
                    {children}
                </main>
            </div>

            <Notification />
        </>
    )
}