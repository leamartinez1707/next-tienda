'use client'

import { useStore } from "@/src/store/store"
import ProductDetails from "./ProductDetails"
import { useMemo } from "react"
import { formatCurrency } from "@/src/utils"
import { handleCreateOrder } from "@/actions/create-order-action"
import { OrderSchema } from "@/src/schema"
import { toast } from "react-toastify"
import { mutate } from "swr"
import { orderChannel } from "@/src/utils/orderChannel"

const OrderSummary = () => {

    const order = useStore(state => state.order)
    const cleanOrder = useStore(state => state.cleanOrder)
    const total = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order])


    const createOrder = async (formData: FormData) => {

        const data = {
            name: formData.get('name'),
            total,
            order
        }

        const result = OrderSchema.safeParse(data)
        if (!result.success) {
            return result.error.issues.forEach((issue) => {
                toast.error(issue.message)
            })
        }

        const response = await handleCreateOrder(data)
        if (response?.errors) {
            response.errors.forEach((issue) => {
                toast.error(issue.message)
            })
        }
        toast.success('Pedido realizado con éxito')
        mutate('/admin/orders/api')
        orderChannel.postMessage('update-orders') // Notifica a las demás

        cleanOrder()
    }

    return (
        <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
            <h1 className="text-4xl font-extrabold">Mi pedido</h1>

            {order.length < 1 ? (
                <p className="text-gray-500">No hay productos en tu pedido</p>) :
                (
                    <ul className="mt-5">
                        {order.map((item) => (
                            <ProductDetails
                                key={item.id}
                                item={item}
                            />
                        ))}

                        <p className="mt-14 text-2xl flex justify-between items-center">Total a pagar: {' '}
                            <span className="font-semibold">{formatCurrency(total)}</span>
                        </p>

                        <form
                            action={createOrder}
                            className="w-full mt-10 space-y-5" >
                            <input type="text" name="name" placeholder="Tu Nombre" className="bg-white border border-gray-100 p-2 w-full" />
                            <input type="submit" className="py-2 rounded uppercase text-white bg-gray-800 hover:bg-gray-950 w-full text-center cursor-pointer" value="Confirmar pedido" />
                        </form>
                    </ul>
                )
            }
        </aside>
    )
}

export default OrderSummary