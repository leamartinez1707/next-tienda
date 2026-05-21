'use server'

import { prisma } from "@/src/lib/prisma"
import { ProductSchema } from "@/src/schema"
import { revalidatePath } from "next/cache"
import { updateDemoProduct } from "@/src/demo/demo-store"
import { cookies } from "next/headers"
import { ADMIN_SESSION_COOKIE_NAME, canAdminWrite } from "@/src/lib/admin-auth"

export const updateProduct = async (data: unknown, id: string) => {

    const cookieStore = await cookies()
    const sessionToken = cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value
    if (!canAdminWrite(sessionToken)) {
        return {
            errors: [{ message: 'Modo solo lectura: no puedes editar productos.' }]
        }
    }

    const result = ProductSchema.safeParse(data)
    if (!result.success) {
        return {
            errors: result.error.issues
        }
    }
    try {
        await prisma.product.update({
            where: {
                id
            },
            data: result.data
        })
    } catch {
        updateDemoProduct(id, result.data)
    }

    revalidatePath('/admin/products')
    return { success: true }
}