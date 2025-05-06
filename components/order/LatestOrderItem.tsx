import { OrderWithProducts } from '@/src/types'
import React from 'react'

interface LatestOrderItemProps {
    order: OrderWithProducts
    index: number
}
const LatestOrderItem = ({ order, index }: LatestOrderItemProps) => {
    return (
        <div className='bg-white shadow-md p-5 rounded-md'>
            <div className='flex justify-end'>
                <span className='bg-red-500 text-white font-semibold text-lg px-2 py-1 rounded-full'>{index + 1 < 10 ? `0${index + 1}` : index + 1}</span>

            </div>
            <p className='text-2xl font-semibold text-slate-700'>
                Cliente: {order.name}

            </p>
            <ul
                className='divide-y divide-slate-200 border-t border-gray-200 text-gray-500 text-sm font-medium'
                role='list'
            >
                {order.orderProducts.map(product => (
                    <li
                        key={product.id}
                        className='flex text-lg py-4'
                    >
                        <span className='font-semibold'>
                            ({product.quantity}) {''}
                        </span>
                        <p>{product.product.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default LatestOrderItem