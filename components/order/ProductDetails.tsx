import { OrderItem } from '@/src/types'
import { formatCurrency } from '@/src/utils'
import { MinusIcon, PlusIcon, XCircleIcon } from '@heroicons/react/16/solid'
import { useStore } from '@/src/store/store'
import { useMemo } from 'react'

interface ProductDetailsProps {
    item: OrderItem
}

const MIN_ITEMS = 1
const MAX_ITEMS = 10

const ProductDetails = ({ item }: ProductDetailsProps) => {

    const increaseQuantity = useStore((state) => state.increaseQuantity)
    const decreaseQuantity = useStore((state) => state.decreaseQuantity)
    const removeItem = useStore((state) => state.removeItemFromCart)

    const disableDecreaseButton = useMemo(() => item.quantity === MIN_ITEMS, [item.quantity])
    const disableIncreaseButton = useMemo(() => item.quantity === MAX_ITEMS, [item.quantity])

    return (
        <li className="shadow space-y-1 p-4 bg-white  border-t border-gray-200 ">
            <div className="space-y-4">
                <div className="flex justify-between items-start">
                    <p className="text-xl font-bold">{item.name} </p>

                    <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                    >
                        <XCircleIcon className="text-red-600 h-8 w-8" />
                    </button>
                </div>
                <p className="text-2xl text-amber-500 font-black">
                    {formatCurrency(item.price)}
                </p>
                <div className="flex gap-5 px-10 py-2 bg-gray-100 w-fit rounded-lg">
                    <button
                        type="button"
                        disabled={disableDecreaseButton}
                        onClick={() => decreaseQuantity(item.id)}
                    >
                        <MinusIcon className={`size-6 ${disableDecreaseButton ? 'opacity-30' : null}`} />
                    </button>

                    <p className="text-lg font-black ">
                        {item.quantity}
                    </p>

                    <button
                        type="button"
                        disabled={disableIncreaseButton}
                        onClick={() => increaseQuantity(item.id)}
                    >
                        <PlusIcon className={`size-6 ${disableIncreaseButton ? 'opacity-30' : null}`} />
                    </button>
                </div>
                <p className="text-xl font-black text-gray-700">
                    Subtotal: {''}
                    <span className="font-normal">
                        {formatCurrency(item.subTotal)}
                    </span>
                </p>
            </div>
        </li>
    )
}

export default ProductDetails