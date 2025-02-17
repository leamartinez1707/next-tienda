import ProductCard from "@/components/products/ProductCard"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"

const getProductsByCategory = async (category: string) => {
    return await prisma.product.findMany({
        where: {
            category: {
                slug: category
            }
        }
    })
}
const CategoryPage = async ({ params }: { params: { category: string } }) => {
    const products = await getProductsByCategory(params.category)
    return (
        <>
            <Heading>Elige y personaliza tu pedido</Heading>
            <div className="flex flex-wrap gap-10 items-center justify-center">
                {products.length > 0 ?
                    products.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))
                    : <h1>No se encontraron productos</h1>
                }
            </div>
        </>
    )
}

export default CategoryPage