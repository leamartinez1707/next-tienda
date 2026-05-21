import { completeOrder } from '@/actions/complete-order-action'
import { OrderWithProducts } from '@/src/types'
import { formatCurrency } from '@/src/utils'
import OrderCardButton from './OrderCardButton'
import { mutate } from 'swr'
import { notifyOrderUpdate } from '@/src/hooks/useOrderChannelSync'
import { toast } from 'react-toastify'


interface OrderCardProps {
    order: OrderWithProducts
}

const OrderCard = ({ order }: OrderCardProps) => {

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

        const formData = new FormData(event.currentTarget);
        const response = await completeOrder(formData); // Llamar a la acción del servidor
        if (response?.success) {
            mutate('/admin/orders/api')
            notifyOrderUpdate()
            toast.success('Orden completada')
            return
        }
        toast.error('No se pudo completar la orden')
    };


    return (
        <section
            aria-labelledby="summary-heading"
            className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-6"
        >
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className='text-xs font-semibold uppercase tracking-[0.18em] text-slate-500'>Cliente</p>
                    <p className='mt-1 text-xl font-bold text-slate-900'>{order.name}</p>
                </div>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-800">
                    Pendiente
                </span>
            </div>

            <p className='mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-slate-500'>Productos ordenados</p>
            <dl className="mt-3 space-y-3">
                {order.orderProducts.map((product) => (
                    <div key={product.id} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5">
                        <dd className='text-sm font-medium text-slate-800'>{product.product.name}</dd>
                        <dt className='shrink-0 rounded-full bg-slate-200 px-2.5 py-1 text-xs font-bold text-slate-700'>
                            x{product.quantity}
                        </dt>
                    </div>

                ))}
                <div className="mt-4 flex items-center justify-between rounded-2xl border border-amber-200 bg-amber-50 px-3 py-3">
                    <dt className="text-sm font-semibold uppercase tracking-wide text-amber-800">Total</dt>
                    <dd className="text-lg font-black text-amber-900">{formatCurrency(order.total)}</dd>
                </div>
            </dl>

            <form
                onSubmit={handleSubmit}
                aria-label={`Completar orden de ${order.name}`}
            >
                <input
                    type="text"
                    defaultValue={order.id}
                    className='hidden'
                    name='order_id' />
                <OrderCardButton />
            </form>
        </section>
    )
}

export default OrderCard