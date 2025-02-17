import React from 'react'
import { useFormStatus } from 'react-dom'

const OrderCardButton = () => {

    const { pending } = useFormStatus()
    return (
        <button
            disabled={pending}
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
            {pending && <span className="loader">⌛</span>} Marcar Orden Completada
        </button>
    )
}

export default OrderCardButton