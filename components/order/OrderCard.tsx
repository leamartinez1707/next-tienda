import { completeOrder } from '@/actions/complete-order-action'
import { OrderWithProducts } from '@/src/types'
import { formatCurrency } from '@/src/utils'
import OrderCardButton from './OrderCardButton'
import { mutate } from 'swr'
import { orderChannel } from '@/src/utils/orderChannel'


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
            orderChannel.postMessage('update-orders') // Notifica a las demás
        }
    };


    return (
        <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6  lg:mt-0 lg:p-8 space-y-4"
        >
            <p className='text-2xl font-medium text-gray-900'>Cliente: {order.name} </p>
            <p className='text-lg font-medium text-gray-900'>Productos Ordenados: </p>
            <dl className="mt-6 space-y-4">
                {order.orderProducts.map((product) => (
                    <div key={product.id} className="flex items-center gap-2 pt-4 border-t border-gray-200">
                        <dt className='flex items-center text-sm text-gray-600'>
                            <span className='font-black'>({product.quantity}) {''}</span>
                        </dt>
                        <dd className='text-sm font-medium text-gray-900'>{product.product.name}</dd>
                    </div>

                ))}
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="text-base font-medium text-gray-900">Total a Pagar:</dt>
                    <dd className="text-base font-medium text-gray-900">{formatCurrency(order.total)}</dd>
                </div>
            </dl>

            <form
                onSubmit={handleSubmit}
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