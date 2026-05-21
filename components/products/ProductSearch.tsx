'use client'

import { SearchSchema } from '@/src/schema'
import { useRouter } from 'next/navigation'
import { useToastZodErrors } from '@/src/hooks/useToastZodErrors'

const ProductSearch = () => {
    const router = useRouter()
    const { showIssues } = useToastZodErrors()

    const handleSearch = (formData: FormData) => {
        const data = {
            search: formData.get('search')
        }

        const result = SearchSchema.safeParse(data)
        if (!result.success) {
            showIssues(result.error.issues)
            return
        }
        router.push(`/admin/products/search?search=${result.data.search}`)
    }


    return (
        <form
            action={handleSearch}
            className='flex items-center w-full max-w-md'>
            <input
                type="search"
                placeholder='Buscar producto'
                name='search'
                aria-label='Buscar producto'
                minLength={3}
                className='p-2 w-full placeholder-gray-400 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-amber-400' />

            <input type="submit"
                value={'Buscar'}
                className='bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] duration-200 transition-all text-white font-semibold py-2 px-4 uppercase cursor-pointer border border-indigo-800 rounded-r-md'
            />
        </form>
    )
}

export default ProductSearch