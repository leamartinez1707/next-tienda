import ProductPagination from "@/components/products/ProductPagination"
import ProductSearch from "@/components/products/ProductSearch"
import ProductTable from "@/components/products/ProductTable"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"
import Link from "next/link"
import { redirect } from 'next/navigation'



const productCount = async () => {
    return await prisma.product.count()
}

const getProducts = async (page: number, pageSize: number) => {
    const skip = (page - 1) * pageSize
    const products = await prisma.product.findMany({
        take: pageSize,
        skip,
        include: {
            category: true
        }
    })
    return products
}

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>

const ProductsPage = async ({ searchParams }: { searchParams: Promise<{ page: string }> }) => {
    const { page } = await searchParams
    const pageIn = +page || 1
    if (pageIn < 0) redirect('/admin/products')
    const pageSize = 10
    const productsData = getProducts(pageIn, pageSize)
    const totalProductsData = productCount()
    const [products, totalProducts] = await Promise.all([productsData, totalProductsData])

    const totalPages = Math.ceil(totalProducts / pageSize)

    if (pageIn > totalPages) redirect('/admin/products')

    return (
        <div>
            <Heading>Administrar productos</Heading>

            <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
                <Link
                    className="bg-amber-400 hover:bg-amber-500 duration-200 transition-colors w-full lg:w-auto text-center py-3 px-10 font-semibold cursor-pointer"
                    href="/admin/products/new">
                    Agregar producto
                </Link>

                <ProductSearch />
            </div>

            <ProductTable products={products} />

            <ProductPagination page={pageIn} totalPages={totalPages} />
        </div>
    )
}

export default ProductsPage 