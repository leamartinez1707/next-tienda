'use client'

import useSWR, { mutate } from "swr"
import OrderCard from '@/components/order/OrderCard'
import Heading from '@/components/ui/Heading'
import { OrderWithProducts } from "@/src/types"
import { orderChannel } from "@/src/utils/orderChannel"
import { useEffect } from "react"

const OrdersPage = () => {

    const url = '/admin/orders/api'
    const fetcher = () => fetch(url).then(res => res.json()).then(data => data)
    const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
        refreshInterval: 600000,
        revalidateOnFocus: false
    })
    useEffect(() => {
        const onMessage = (msg: MessageEvent) => {
            if (msg.data === 'update-orders') {
                mutate('/admin/orders/api');  // Actualiza la data de admin/orders/api cuando se recibe el mensaje
            }
        };

        // Escucha los mensajes en el canal
        orderChannel.addEventListener('message', onMessage);

        // Cleanup: remueve el event listener cuando el componente se desmonte
        return () => {
            orderChannel.removeEventListener('message', onMessage);
            orderChannel.close();
        };
    }, []);  // Solo se ejecuta una vez cuando el componente se monta
    
    if (isLoading) return <p>Cargando...</p>
    if (error) return <p>Hubo un error</p>
    if (data) return (
        <>
            <Heading>Órdenes pendientes</Heading>

            {data.length ? (
                <div className="flex flex-wrap gap-10 items-center">
                    {data.map((order) => (
                        <OrderCard key={order.id} order={order} />
                    ))}
                </div>
            ) : <p className='text-center'>No hay ordenes pendientes</p >}

        </>
    )
}

export default OrdersPage