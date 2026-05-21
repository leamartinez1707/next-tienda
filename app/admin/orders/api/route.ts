import { prisma } from "@/src/lib/prisma"
import { getDemoPendingOrders } from "@/src/demo/demo-store"
import { withTimeout } from "@/src/lib/with-timeout"

export const dynamic = 'force-dynamic'
export const GET = async () => {
  try {
    const orders = await withTimeout(prisma.order.findMany({
      where: {
        status: false
      },
      include: {
        orderProducts: {
          include: {
            product: true
          }
        }
      }
    }))
    return Response.json(orders)
  } catch {
    return Response.json(getDemoPendingOrders())
  }
}
