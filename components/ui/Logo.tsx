import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
    return (
        <Link
            href="/"
            aria-label="Ir al inicio"
            className="relative mx-auto mb-4 block h-20 w-20 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 sm:h-24 sm:w-24"
        >
                <Image
                    fill
                    priority
                    alt="Logotipo FastFood"
                    src="/logo.png"
                    sizes="(max-width: 640px) 80px, 96px"
                    className="object-contain h-20 w-20 sm:h-24 sm:w-24 bg-black rounded-full p-2"
                />
        </Link>
    );
};

export default Logo;