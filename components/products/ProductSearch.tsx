'use client'

import { SearchSchema } from '@/src/schema'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

const ProductSearch = () => {
    const router = useRouter()

    const handleSearch = (formData: FormData) => {
        const data = {
            search: formData.get('search')
        }

        const result = SearchSchema.safeParse(data)
        if (!result.success) {
            result.error.issues.forEach(issue => {
                toast.error(issue.message)
            })
            return
        }
        router.push(`/admin/products/search?search=${result.data.search}`)
    }


    return (
        <form
            action={handleSearch}
            className='flex items-center'>
            <input type="text" placeholder='Buscar producto'
                name='search'
                className='p-2 w-full placeholder-gray-400' />

            <input type="submit"
                value={'Buscar'}
                className='bg-indigo-600 hover:bg-indigo-800 duration-200 transition-colors text-white font-semibold py-2 px-4 uppercase cursor-pointer border border-indigo-800'
            />
        </form>
    )
}

export default ProductSearch