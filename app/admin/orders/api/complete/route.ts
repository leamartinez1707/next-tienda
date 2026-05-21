import { prisma } from "@/src/lib/prisma"
import { OrderIdSchema } from "@/src/schema"
import { completeDemoOrder } from "@/src/demo/demo-store"
import { withTimeout } from "@/src/lib/with-timeout"
import { isDemoFallbackEnabled } from "@/src/lib/demo-fallback"

export const dynamic = 'force-dynamic'

export const POST = async (request: Request) => {
  const payload = await request.json().catch(() => null)
  const result = OrderIdSchema.safeParse(payload)

  if (!result.success) {
    return Response.json({ success: false, errors: result.error.issues }, { status: 400 })
  }

  try {
    await withTimeout(prisma.order.update({
      where: {
        id: result.data.orderId
      },
      data: {
        status: true,
        orderReadyAt: new Date(Date.now())
      }
    }))

    return Response.json({ success: true })
  } catch (error) {
    if (isDemoFallbackEnabled) {
      const updated = completeDemoOrder(result.data.orderId)
      if (!updated) {
        return Response.json({ success: false, errors: [{ message: 'No se pudo completar la orden' }] }, { status: 404 })
      }

      return Response.json({ success: true, demo: true })
    }

    console.error('Error completing order', error)
    return Response.json({ success: false, errors: [{ message: 'No se pudo completar la orden' }] }, { status: 500 })
  }
}
