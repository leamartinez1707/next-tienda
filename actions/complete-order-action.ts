'use server';
import { revalidatePath } from "next/cache";
import { prisma } from "@/src/lib/prisma";
import { OrderIdSchema } from "@/src/schema";

// Si es una accion hay que definirle que es server

export const completeOrder = async (formData: FormData) => {
    console.log(formData.get('order_id'))
    const data = {
        orderId: formData.get('order_id')!
    }

    const result = OrderIdSchema.safeParse(data)
    if (result.success) {
        try {
            await prisma.order.update({
                where: {
                    id: result.data.orderId.toString()
                },
                data: {
                    status: true,
                    orderReadyAt: new Date(Date.now())
                }
            })
            revalidatePath('/admin/orders')
            return { success: true }
        } catch (error) {
            console.error(error)
        }
    }
}