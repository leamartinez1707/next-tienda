import { prisma } from '@/src/lib/prisma'
import { notFound } from 'next/navigation'
import Heading from '@/components/ui/Heading'
import EditProductForm from '@/components/products/EditProductForm'
import ProductForm from '@/components/products/ProductForm'
import GoBackButton from '@/components/ui/GoBackButton'

const getProductById = async (id: string) => {
    const product = await prisma.product.findUnique({
        where: {
            id
        }
    })
    return product
}

const EditProduct = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const product = await getProductById(id)
    if (!product) {
        notFound()
    }

    return (
        <div>
            <Heading>Editar producto: {product.name}</Heading>

            <GoBackButton />

            <EditProductForm>
                <ProductForm product={product} />
            </EditProductForm>

        </div>
    )
}

export default EditProduct