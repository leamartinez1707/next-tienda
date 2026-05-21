'use client'
import { useRouter } from 'next/navigation'

const GoBackButton = () => {
    const router = useRouter()

    return (
        <button
            type="button"
            className="bg-amber-400 hover:bg-amber-500 active:scale-[0.99] duration-200 transition-all w-full lg:w-auto text-center py-3 px-10 font-semibold cursor-pointer rounded-md"
            onClick={() => router.back()}
        >
            Volver
        </button>
    )
}

export default GoBackButton