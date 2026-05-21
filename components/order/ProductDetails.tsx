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
        <li className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                    <p className="line-clamp-2 text-base font-bold text-slate-900">{item.name}</p>

                    <button
                        type="button"
                        aria-label={`Quitar ${item.name} del pedido`}
                        onClick={() => removeItem(item.id)}
                    >
                        <XCircleIcon className="h-6 w-6 text-red-600 transition hover:text-red-700" />
                    </button>
                </div>

                <p className="text-xl font-black text-amber-600">
                    {formatCurrency(item.price)}
                </p>

                <div className="flex w-fit items-center gap-4 rounded-xl bg-slate-100 px-4 py-1.5">
                    <button
                        type="button"
                        disabled={disableDecreaseButton}
                        aria-label={`Reducir cantidad de ${item.name}`}
                        onClick={() => decreaseQuantity(item.id)}
                    >
                        <MinusIcon className={`size-5 ${disableDecreaseButton ? 'opacity-30' : 'transition-transform active:scale-90'}`} />
                    </button>

                    <p className="min-w-5 text-center text-base font-black">
                        {item.quantity}
                    </p>

                    <button
                        type="button"
                        disabled={disableIncreaseButton}
                        aria-label={`Aumentar cantidad de ${item.name}`}
                        onClick={() => increaseQuantity(item.id)}
                    >
                        <PlusIcon className={`size-5 ${disableIncreaseButton ? 'opacity-30' : 'transition-transform active:scale-90'}`} />
                    </button>
                </div>

                <p className="text-sm font-semibold text-slate-700">
                    Subtotal:{' '}
                    <span className="font-bold text-slate-900">
                        {formatCurrency(item.subTotal)}
                    </span>
                </p>
            </div>
        </li>
    )
}

export default ProductDetails