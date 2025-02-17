import Image from 'next/image'
import React from 'react'

const Logo = () => {
    return (
        <div className='flex justify-center mt-5'>
            <div className="relative size-40">
                <Image
                    fill
                    priority
                    alt='Logotipo SatisFod'
                    src='/logo.svg'
                />
            </div>
        </div>
    )
}

export default Logo