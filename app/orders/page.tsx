'use client'
import useSWR, { mutate } from 'swr'
import Logo from '@/components/ui/Logo'
import { OrderWithProducts } from '@/src/types'
import LatestOrderItem from '@/components/order/LatestOrderItem'
import { orderChannel } from '@/src/utils/orderChannel'
import { useEffect } from 'react'

const OrdersPage = () => {

    const url = '/orders/api'
    const fetcher = () => fetch(url).then(res => res.json()).then(data => data)
    const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
        revalidateOnFocus: false
    })

    useEffect(() => {
        const onMessage = (msg: MessageEvent) => {
            if (msg.data === 'update-orders') {
                mutate('/orders/api') // Actualiza la lista de órdenes
            }
        };

        orderChannel.addEventListener('message', onMessage)
        // Cleanup cuando el componente se desmonte
        return () => {
            orderChannel.removeEventListener('message', onMessage)
            orderChannel.close() // Cierra el canal al desmontar el componente
        }
    }, [])


    if (isLoading) return <p>Cargando...</p>
    if (error) return <p>Hubo un error</p>
    if (data) return (
        <div className='container mx-auto px-4 min-h-screen'>
            <Logo />
            <h1 className='text-center mt-10 text-6xl font-semibold'>Ordenes para retirar</h1>
            {data.length ? (
                <div className='grid grid-cols-2 mt-10 max-w-5xl mx-auto gap-5'>
                    {data
                        .filter(order => order.status === true)
                        .map(order => (
                            <LatestOrderItem key={order.id} order={order} />
                        ))}
                </div>
            ) : <p className='text-center my-10'>No hay ordenes listas</p>
            }
        </div >
    )
}

export default OrdersPage