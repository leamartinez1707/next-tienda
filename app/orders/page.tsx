'use client'
import useSWR from 'swr'
import Logo from '@/components/ui/Logo'
import { OrderWithProducts } from '@/src/types'
import LatestOrderItem from '@/components/order/LatestOrderItem'

const OrdersPage = () => {

    const url = '/orders/api'
    const fetcher = () => fetch(url).then(res => res.json()).then(data => data)
    const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
        refreshInterval: 600000,
        revalidateOnFocus: false
    })

    if (isLoading) return <p>Cargando...</p>
    if (error) return <p>Hubo un error</p>
    if (data) return (
        <div>
            <h1 className='text-center mt-20 text-6xl font-semibold'>Ordenes listas</h1>

            <Logo />

            {data.length ? (
                <div className='grid grid-cols-2 mt-10 max-w-5xl mx-auto gap-5'>
                    {data.map(order => (
                        <LatestOrderItem key={order.id} order={order} />
                    ))}
                </div>
            ) : <p className='text-center my-10'>No hay ordenes listas</p>
            }
        </div >
    )
}

export default OrdersPage