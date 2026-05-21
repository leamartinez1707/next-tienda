'use server';
import { revalidatePath } from "next/cache";
import { prisma } from "@/src/lib/prisma";
import { OrderIdSchema } from "@/src/schema";
import { completeDemoOrder } from "@/src/demo/demo-store";
import { withTimeout } from "@/src/lib/with-timeout";

// Si es una accion hay que definirle que es server

export const completeOrder = async (formData: FormData) => {
    const data = {
        orderId: formData.get('order_id')!
    }

    const result = OrderIdSchema.safeParse(data)
    if (!result.success) {
        return { success: false, errors: result.error.issues }
    }

    try {
        await withTimeout(prisma.order.update({
            where: {
                id: result.data.orderId.toString()
            },
            data: {
                status: true,
                orderReadyAt: new Date(Date.now())
            }
        }))
        revalidatePath('/admin/orders')
        return { success: true }
    } catch {
        const updated = completeDemoOrder(result.data.orderId.toString())
        if (!updated) {
            return { success: false, errors: [{ message: 'No se pudo completar la orden' }] }
        }

        revalidatePath('/admin/orders')
        return { success: true, demo: true }
    }
}