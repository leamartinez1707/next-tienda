'use client'
import { getImagePath } from "@/src/utils"
import { CldUploadWidget } from "next-cloudinary"
import Image from "next/image"
import { useState } from "react"
import { TbPhotoPlus } from "react-icons/tb"

interface ImageUploadProps {
    image?: string | undefined
}

const ImageUpload = ({ image }: ImageUploadProps) => {

    const [imageUrl, setImageUrl] = useState('')
    return (
        <CldUploadWidget
            onSuccess={(result, { widget }) => {
                if (result.event === 'success') {
                    widget.close()
                    // @ts-expect-error Cloudinary is not typed
                    setImageUrl(result.info?.secure_url)
                }
            }}
            uploadPreset="tezclw0v"
            options={{
                maxFiles: 1,
            }}
        >
            {({ open }) => (
                <>
                    <div className="space-y-2">
                        <label className="text-slate-800">Imágen del producto</label>
                        <div className="relative cursor-pointer hover:opacity-70 transition border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100 min-h-56"
                            onClick={() => open()}>
                            <TbPhotoPlus
                                size={50}
                            />
                            {!imageUrl && (
                                <p className="text-lg font-semibold">Agregar imágen</p>
                            )}
                            {imageUrl && (
                                <div className="absolute inset-0 size-full">
                                    <Image
                                        src={imageUrl}
                                        alt="Imagen del producto subida por el cliente"
                                        style={{ objectFit: 'contain' }}
                                        fill
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {image && !imageUrl && (
                        <div className="space-y-2">
                            <label>Imagen actual: </label>
                            <div className="relative size-64">
                                <Image
                                    src={getImagePath(image)}
                                    alt="Imagen del producto"
                                    style={{ objectFit: 'contain' }}
                                    fill
                                />
                            </div>
                        </div>
                    )}
                    <input type="hidden"
                        name="image"
                        // Cuando el valor cambia tiene que ser defaultValue y no value
                        defaultValue={imageUrl ? imageUrl : image} />
                </>
            )
            }
        </CldUploadWidget>
    )
}

export default ImageUpload