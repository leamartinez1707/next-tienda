import { z } from "zod"


export const OrderSchema = z.object({
    name: z.string().min(3, "Tu nombre es obligatorio"),
    total: z.number().min(1, "No hay productos en tu pedido"),
    order: z.array(z.object({
        id: z.number(),
        name: z.string(),
        price: z.number(),
        quantity: z.number(),
        subTotal: z.number()
    }))
})


export const OrderIdSchema = z.object({
    orderId: z.string().transform((value) => parseInt(value)).refine(value => value > 0, { message: "Hay errores en el ID de la orden" })
})

export const SearchSchema = z.object({
    search: z.string().trim().min(1, "Escribe al menos 3 caracteres para buscar")
})

export const ProductSchema = z.object({
    name: z.string()
        .trim()
        .min(1, { message: 'El nombre del producto no puede ir vacio' }),
    price: z.string()
        .trim()
        .transform((value) => parseFloat(value))
        .refine((value) => value > 0, { message: 'Precio no válido' })
        .or(z.number().min(1, { message: 'La categoría es obligatoria' })),
    categoryId: z.string()
        .trim()
        .refine((value) => !value, { message: 'La categoría es obligatoria' }),
    image: z.string().min(1, "La imagen es obligatoria")
})