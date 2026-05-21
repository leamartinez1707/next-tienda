'use server'

import { prisma } from "@/src/lib/prisma"
import { ProductSchema } from "@/src/schema"
import { createDemoProduct } from "@/src/demo/demo-store"
import { cookies } from "next/headers"
import { ADMIN_SESSION_COOKIE_NAME, canAdminWrite } from "@/src/lib/admin-auth"

export const createProduct = async (data: unknown) => {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value
    if (!canAdminWrite(sessionToken)) {
        return {
            errors: [{ message: 'Modo solo lectura: no puedes crear productos.' }]
        }
    }

    const result = ProductSchema.safeParse(data)
    if (!result.success) {
        return {
            errors: result.error.issues
        }
    }
    try {
        await prisma.product.create({
            data: result.data
        })
    } catch {
        createDemoProduct(result.data)
    }

    return { success: true }
}