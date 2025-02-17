import Image from 'next/image'
import { Product } from '@prisma/client'
import { formatCurrency, getImagePath } from '@/src/utils'
import AddToOrderButton from '../order/Button'

interface ProductCard {
    product: Product
}
const ProductCard = ({ product }: ProductCard) => {

    const imagePath = getImagePath(product.image)
    return (
        <article className="mx-auto right-0 mt-2 min-w-60">
            <div className="bg-white rounded overflow-hidden shadow-lg">
                <Image
                    width={400}
                    height={500}
                    src={imagePath}
                    alt={product.name}
                    quality={80}
                />
                <div className='flex flex-col items-center justify-center text-center p-4 bg-gray-50 gap-2 shadow-lg '>
                    <p className="pt-2 text-lg font-semibold text-gray-900 capitalize">{product.name}</p>
                    <span className='text-yellow-400 font-bold text-lg'>
                        {formatCurrency(product.price)}
                    </span>
                    <AddToOrderButton product={product} />
                </div>
            </div>
        </article>
    )
}

export default ProductCard