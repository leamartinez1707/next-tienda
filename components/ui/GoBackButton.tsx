'use client'
import { useRouter } from 'next/navigation'

const GoBackButton = () => {
    const router = useRouter()

    return (
        <button
            className="bg-amber-400 hover:bg-amber-500 duration-200 transition-colors w-full lg:w-auto text-center py-3 px-10 font-semibold cursor-pointer"
            onClick={() => router.back()}
        >
            Volver
        </button>
    )
}

export default GoBackButton