import { prisma } from "@/src/lib/prisma"

export const dynamic = 'force-dynamic'


export const GET = async () => {
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
}
