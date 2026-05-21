import { categories as seedCategories } from '@/prisma/data/categories'
import { products as seedProducts } from '@/prisma/data/products'

const categoryById = Object.fromEntries(
  seedCategories.map((category) => [category.id, category]),
)

const productByCategoryId = Object.fromEntries(
  seedProducts.map((product, index) => [
    `${product.categoryId}-${index}`,
    {
      id: `${product.categoryId}-${index}`,
      name: product.name,
      price: product.price,
      image: product.image,
      categoryId: product.categoryId,
      category: categoryById[product.categoryId],
    },
  ]),
)

export const demoCategories = seedCategories

export const demoProducts = Object.values(productByCategoryId)

export const demoPendingOrders = [
  {
    id: 'demo-order-pending-1',
    name: 'Cliente Demo',
    total: 109.8,
    date: new Date('2026-05-20T12:00:00.000Z'),
    status: false,
    orderReadyAt: null,
    orderProducts: [
      {
        id: 'demo-order-product-1',
        quantity: 2,
        product: {
          id: '64538f1a2f9b1d8e6f4c8b45-0',
          name: 'Café Caramel con Chocolate',
          price: 59.9,
          image: 'cafe_01',
          categoryId: '64538f1a2f9b1d8e6f4c8b45',
        },
      },
    ],
  },
]

export const demoReadyOrders = [
  {
    id: 'demo-order-ready-1',
    name: 'Laura Gómez',
    total: 119.8,
    date: new Date('2026-05-20T11:15:00.000Z'),
    status: true,
    orderReadyAt: new Date('2026-05-20T11:28:00.000Z'),
    orderProducts: [
      {
        id: 'demo-order-ready-product-1',
        quantity: 1,
        product: {
          id: '64538f1a2f9b1d8e6f4c8b46-6',
          name: 'Hamburguesa Sencilla',
          price: 59.9,
          image: 'hamburguesas_01',
          categoryId: '64538f1a2f9b1d8e6f4c8b46',
        },
      },
      {
        id: 'demo-order-ready-product-2',
        quantity: 1,
        product: {
          id: '64538f1a2f9b1d8e6f4c8b48-5',
          name: 'Paquete de 3 donas de Chocolate',
          price: 39.9,
          image: 'donas_01',
          categoryId: '64538f1a2f9b1d8e6f4c8b48',
        },
      },
    ],
  },
]
