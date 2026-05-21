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
        <article className="group w-full min-w-0 max-w-sm mx-auto">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative overflow-hidden">
                    <Image
                        width={400}
                        height={500}
                        src={imagePath}
                        alt={product.name}
                        quality={80}
                        className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-56"
                    />
                    <div className="absolute left-2.5 top-2.5 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-700 shadow-sm sm:left-3 sm:top-3 sm:text-xs sm:tracking-normal">
                        Listo en minutos
                    </div>
                </div>

                <div className='flex flex-col gap-3 bg-[linear-gradient(180deg,_#ffffff_0%,_#f8fafc_100%)] p-4 sm:p-5'>
                    <p className="line-clamp-2 min-h-[3rem] text-base font-bold leading-snug text-slate-900 capitalize sm:text-lg">{product.name}</p>
                    <div className="flex items-center justify-between gap-2">
                        <span className='text-xl font-black text-amber-600 sm:text-2xl'>
                            {formatCurrency(product.price)}
                        </span>
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-600 sm:px-3 sm:text-xs sm:tracking-normal">
                            Incluye impuestos
                        </span>
                    </div>
                    <AddToOrderButton product={product} />
                </div>
            </div>
        </article>
    )
}

export default ProductCard