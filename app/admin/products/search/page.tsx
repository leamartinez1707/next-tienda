import ProductSearch from '@/components/products/ProductSearch';
import ProductTable from '@/components/products/ProductTable';
import Heading from '@/components/ui/Heading'
import { prisma } from '@/src/lib/prisma'

const searchProducts = async (searchTerm: string) => {
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: searchTerm,
                mode: "insensitive"
            }
        },
        include: {
            category: true
        }
    })
    return products;
}

const SearchPage = async ({ searchParams }: { searchParams: { search: string } }) => {

    const products = await searchProducts(searchParams.search)
    return (
        <div>
            <Heading>Resultados de búsqueda: {searchParams.search}</Heading>
            <div className="flex flex-col lg:flex-row lg:justify-end gap-5">
                <ProductSearch />
            </div>
            {products.length ? (
                <ProductTable products={products} />
            ) : <p className='text-center text-lg font-semibold my-4'>No hay resultados</p>}
        </div>
    )
}

export default SearchPage