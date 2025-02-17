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
            className="text-sm font-medium bg-gray-900 hover:bg-gray-900/80 rounded p-2 text-gray-50 leading-non" >Agregar al carrito
        </button>
    )
}

export default AddToOrderButton