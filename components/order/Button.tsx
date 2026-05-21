'use client'

import { useStore } from "@/src/store/store"
import { Product } from "@prisma/client"

interface ButtonProps {
    product: Product
}

const AddToOrderButton = ({ product }: ButtonProps) => {

    const addToCart = useStore(state => state.addToCart)


    return (
        <button
            onClick={() => addToCart(product)}
            className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-slate-800 hover:shadow-md active:scale-[0.99]" >Agregar al carrito
        </button>
    )
}

export default AddToOrderButton