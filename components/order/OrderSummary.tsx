'use client'

import { useStore } from "@/src/store/store"
import ProductDetails from "./ProductDetails"
import { useMemo, useState } from "react"
import { formatCurrency } from "@/src/utils"
import { toast } from "react-toastify"
import { mutate } from "swr"
import { notifyOrderUpdate } from "@/src/hooks/useOrderChannelSync"

const OrderSummary = () => {

    const order = useStore(state => state.order)
    const cleanOrder = useStore(state => state.cleanOrder)
    const total = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order])
    const totalItems = useMemo(() => order.reduce((acc, item) => acc + item.quantity, 0), [order])
    const [isOpen, setIsOpen] = useState(false)


    const createOrder = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const name = String(formData.get('name') ?? '').trim()

        if (name.length < 2) {
            toast.error('Ingresa un nombre valido')
            return
        }

        if (order.length === 0) {
            toast.error('Agrega al menos un producto al pedido')
            return
        }

        const data = {
            name,
            total,
            order
        }

        let response: { success?: boolean; errors?: { message: string }[] }

        try {
            const request = await fetch('/order/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            response = await request.json()
            if (!request.ok) {
                throw new Error('No se pudo crear el pedido')
            }
        } catch {
            toast.error('No se pudo crear el pedido')
            return
        }

        if (response?.errors) {
            response.errors.forEach((issue) => {
                toast.error(issue.message)
            })
            return
        }

        if (!response?.success) {
            toast.error('No se pudo crear el pedido')
            return
        }

        toast.success('Pedido realizado con éxito')
        mutate('/admin/orders/api')
        notifyOrderUpdate()

        cleanOrder()
        setIsOpen(false)
    }

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="fixed bottom-3 right-3 z-40 inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-xl transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 sm:bottom-5 sm:right-4"
                aria-expanded={isOpen}
                aria-controls="order-summary-drawer"
            >
                Mi pedido
                <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">{totalItems}</span>
            </button>

            {isOpen && (
                <>
                    <button
                        type="button"
                        className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-[1px]"
                        aria-label="Cerrar resumen del pedido"
                        onClick={() => setIsOpen(false)}
                    />

                    <aside
                        id="order-summary-drawer"
                        className="fixed right-0 top-0 z-50 flex h-[100dvh] w-full max-w-[26rem] flex-col rounded-tl-3xl border-l border-gray-200 bg-white p-3 shadow-2xl sm:rounded-none sm:p-4"
                        aria-label="Resumen del pedido"
                    >
                        <div className="flex items-center justify-between border-b border-gray-200 pb-2.5">
                            <h1 className="text-xl font-extrabold sm:text-2xl">Mi pedido</h1>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="rounded-md border border-gray-300 px-2.5 py-1 text-xs font-semibold text-gray-700 transition hover:bg-gray-100 sm:px-3 sm:py-1.5 sm:text-sm"
                            >
                                Cerrar
                            </button>
                        </div>

                        {order.length < 1 ? (
                            <div className="flex flex-1 items-center justify-center text-center text-sm text-gray-500">
                                No hay productos en tu pedido
                            </div>
                        ) : (
                            <>
                                <div className="mt-3 flex-1 overflow-y-auto pr-1">
                                    <ul className="space-y-2 pb-3">
                                        {order.map((item) => (
                                            <ProductDetails
                                                key={item.id}
                                                item={item}
                                            />
                                        ))}
                                    </ul>
                                </div>

                                <div className="border-t border-gray-200 pt-3">
                                    <p className="flex items-center justify-between gap-3 text-base sm:text-lg">
                                        <span className="font-medium text-slate-700">Total a pagar</span>
                                        <span className="text-xl font-black text-slate-900">{formatCurrency(total)}</span>
                                    </p>

                                    <form
                                        onSubmit={createOrder}
                                        className="mt-3 w-full space-y-2.5"
                                        noValidate>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Tu Nombre"
                                            aria-label="Nombre del cliente"
                                            className="w-full rounded-md border border-gray-200 bg-white p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                                        />
                                        <input
                                            type="submit"
                                            className="w-full cursor-pointer rounded-md bg-gray-800 py-2.5 text-center text-sm font-semibold uppercase text-white transition-all hover:bg-gray-950 active:scale-[0.99]"
                                            value="Confirmar pedido"
                                        />
                                    </form>
                                </div>
                            </>
                        )}
                    </aside>
                </>
            )}
        </>
    )
}

export default OrderSummary