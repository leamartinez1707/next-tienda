'use server'

import { prisma } from "@/src/lib/prisma"
import { OrderSchema } from "@/src/schema"


export const handleCreateOrder = async (data: unknown) => {

    const result = OrderSchema.safeParse(data)
    if (!result.success) {
        return {
            errors: result.error.errors
        }
    }

    try {
        await prisma.order.create({
            data: {
                name: result.data.name,
                total: result.data.total,
                orderProducts: {
                    create: result.data.order.map(product => ({
                        product: {
                            connect: { id: String(product.id) }
                        },
                        quantity: product.quantity
                    }))
                }
            }
        })
    } catch (error) {

        console.log(error)

    }

}