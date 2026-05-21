import { prisma } from "@/src/lib/prisma"
import { OrderSchema } from "@/src/schema"
import { createDemoOrder } from "@/src/demo/demo-store"
import { withTimeout } from "@/src/lib/with-timeout"
import { isDemoFallbackEnabled } from "@/src/lib/demo-fallback"

export const dynamic = 'force-dynamic'

export const POST = async (request: Request) => {
  const payload = await request.json().catch(() => null)
  const result = OrderSchema.safeParse(payload)

  if (!result.success) {
    return Response.json({ success: false, errors: result.error.errors }, { status: 400 })
  }

  try {
    await withTimeout(prisma.order.create({
      data: {
        name: result.data.name,
        total: result.data.total,
        orderProducts: {
          create: result.data.order.map((product) => ({
            product: {
              connect: { id: String(product.id) }
            },
            quantity: product.quantity
          }))
        }
      }
    }))

    return Response.json({ success: true })
  } catch (error) {
    if (isDemoFallbackEnabled) {
      createDemoOrder(result.data)
      return Response.json({ success: true, demo: true })
    }

    console.error('Error creating order', error)
    return Response.json(
      { success: false, errors: [{ message: 'No se pudo crear el pedido. Intenta de nuevo.' }] },
      { status: 500 },
    )
  }
}
