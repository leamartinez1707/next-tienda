import Image from 'next/image'
import React from 'react'

const Logo = () => {
    return (
        <div className='flex justify-center'>
            <div className="relative size-80">
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