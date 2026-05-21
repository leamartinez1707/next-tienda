'use server'

import { prisma } from "@/src/lib/prisma"
import { OrderSchema } from "@/src/schema"
import { createDemoOrder } from "@/src/demo/demo-store"
import { withTimeout } from "@/src/lib/with-timeout"

export const handleCreateOrder = async (data: unknown) => {

    const result = OrderSchema.safeParse(data)
    if (!result.success) {
        return {
            errors: result.error.errors
        }
    }

    try {
        await withTimeout(prisma.order.create({
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
        }))
        return { success: true }
    } catch {
        createDemoOrder(result.data)
        return { success: true, demo: true }
    }

}