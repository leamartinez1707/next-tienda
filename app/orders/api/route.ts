import { prisma } from "@/src/lib/prisma"
import { getDemoReadyOrders } from "@/src/demo/demo-store"

export const dynamic = 'force-dynamic'


export const GET = async () => {
  try {
    const orders = await prisma.order.findMany({
      take: 10,
      where: {
        orderReadyAt: {
          not: null
        }
      },
      orderBy: {
        orderReadyAt: 'desc'
      },
      include: {
        orderProducts: {
          include: {
            product: true
          }
        }
      }
    })
    return Response.json(orders)
  } catch {
    return Response.json(getDemoReadyOrders())
  }
}
