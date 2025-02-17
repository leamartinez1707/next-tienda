'use client'
import { Category } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'


interface Props {
    category: Category
}

const CategoryIcon = ({ category }: Props) => {

    const urlParams = useParams<{ category: string }>()
    return (
        <div className={`flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b hover:bg-yellow-50 duration-150 transition-all ${urlParams.category === category.slug ? 'bg-amber-200 hover:bg-amber-200 shadow' : null} `}>
            <div className='size-16 relative
            '>
                <Image fill src={`/icon_${category.slug}.svg`} alt={category.name} />
            </div>
            <Link
                href={`/order/${category.slug}`}
                className='font-bold'>{category.name}
            </Link>
        </div>
    )
}

export default CategoryIcon