'use client'
import useSWR from 'swr'
import Logo from '@/components/ui/Logo'
import { OrderWithProducts } from '@/src/types'
import LatestOrderItem from '@/components/order/LatestOrderItem'
import Loading from '@/components/ui/Loading'
import ErrorState from '@/components/ui/ErrorState'
import EmptyState from '@/components/ui/EmptyState'
import { useOrderChannelSync } from '@/src/hooks/useOrderChannelSync'

const OrdersPage = () => {

    const url = '/orders/api'
    const fetcher = () => fetch(url).then(res => res.json()).then(data => data)
    const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
        revalidateOnFocus: false
    })
    const readyOrders = data?.filter(order => order.status === true) ?? []

    useOrderChannelSync('/orders/api')


    if (isLoading) return <Loading message="Cargando órdenes..." />
    if (error) return <ErrorState message="Hubo un error al cargar las órdenes." />
    if (data) return (
        <main className='min-h-screen bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.2),_transparent_45%),linear-gradient(180deg,_#f8fafc_0%,_#eef2f7_100%)] px-3 py-6 sm:px-6 sm:py-10'>
            <div className='mx-auto max-w-7xl space-y-6 sm:space-y-8'>
                <section className='rounded-3xl border border-white/70 bg-white/90 p-4 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8'>
                    <div className='flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between'>
                        <div className='flex items-center gap-3 sm:gap-4'>
                            <Logo />
                            <div>
                                <p className='text-xs font-semibold uppercase tracking-[0.22em] text-amber-700'>Panel de retiro</p>
                                <h1 className='text-2xl font-black tracking-tight text-slate-950 sm:text-4xl'>Órdenes listas</h1>
                                <p className='mt-1.5 text-sm text-slate-600 sm:mt-2 sm:text-base'>Visualiza en tiempo real los pedidos listos para entregar.</p>
                            </div>
                        </div>

                        <div className='inline-flex items-center gap-2 self-start rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-emerald-700 sm:gap-3 sm:px-4 sm:py-3'>
                            <span className='text-xl font-black sm:text-2xl'>{readyOrders.length}</span>
                            <span className='text-xs font-semibold uppercase tracking-wide sm:text-sm sm:normal-case sm:tracking-normal'>
                                {readyOrders.length === 1 ? 'orden lista' : 'ordenes listas'}
                            </span>
                        </div>
                    </div>
                </section>

                {readyOrders.length ? (
                    <section className='grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3'>
                        {readyOrders.map((order, index) => (
                            <LatestOrderItem key={order.id} order={order} index={index} />
                        ))}
                    </section>
                ) : (
                    <section className='rounded-3xl border border-dashed border-slate-300 bg-white/80 p-6 sm:p-8'>
                        <EmptyState message="No hay órdenes listas por ahora" />
                    </section>
                )}
            </div>
        </main>
    )
}

export default OrdersPage