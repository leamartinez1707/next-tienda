import { categories as seedCategories } from '@/prisma/data/categories'
import { products as seedProducts } from '@/prisma/data/products'

type DemoCategory = (typeof seedCategories)[number]

type DemoProduct = {
  id: string
  name: string
  price: number
  image: string
  categoryId: string
  category: DemoCategory
}

type DemoOrderProduct = {
  id: string
  quantity: number
  product: {
    id: string
    name: string
    price: number
    image: string
    categoryId: string
  }
}

type DemoOrder = {
  id: string
  name: string
  total: number
  date: Date
  status: boolean
  orderReadyAt: Date | null
  orderProducts: DemoOrderProduct[]
}

type DemoState = {
  categories: typeof seedCategories
  products: DemoProduct[]
  pendingOrders: DemoOrder[]
  readyOrders: DemoOrder[]
}

const categoryById = new Map(seedCategories.map((category) => [category.id, category]))

const initialDemoProducts: DemoProduct[] = seedProducts.map((product, index) => ({
  id: `${product.categoryId}-${index}`,
  name: product.name,
  price: product.price,
  image: product.image,
  categoryId: product.categoryId,
  category: categoryById.get(product.categoryId)!,
}))

const initialPendingOrders: DemoOrder[] = [
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

const initialReadyOrders: DemoOrder[] = [
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

const createInitialState = (): DemoState => ({
  categories: seedCategories,
  products: [...initialDemoProducts],
  pendingOrders: [...initialPendingOrders],
  readyOrders: [...initialReadyOrders],
})

declare global {
  var __FASTFOOD_DEMO_STATE__: DemoState | undefined
}

const state = globalThis.__FASTFOOD_DEMO_STATE__ ?? createInitialState()
globalThis.__FASTFOOD_DEMO_STATE__ = state

const createId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`

export const getDemoCategories = () => state.categories

export const getDemoProducts = () => state.products

export const getDemoProductsBySearch = (searchTerm: string) =>
  state.products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

export const getDemoProductById = (id: string) => state.products.find((product) => product.id === id)

export const getDemoProductsByCategory = (slug: string) =>
  state.products.filter((product) => product.category.slug === slug)

export const getDemoPendingOrders = () => state.pendingOrders

export const getDemoReadyOrders = () => state.readyOrders

export const createDemoProduct = (data: { name: string; price: number; categoryId: string; image: string }) => {
  const category = state.categories.find((item) => item.id === data.categoryId)
  if (!category) return null

  const product = {
    id: createId('demo-product'),
    ...data,
    category,
  }

  state.products = [product, ...state.products]
  return product
}

export const updateDemoProduct = (
  id: string,
  data: { name: string; price: number; categoryId: string; image: string },
) => {
  const category = state.categories.find((item) => item.id === data.categoryId)
  if (!category) return null

  const updatedProduct = {
    id,
    ...data,
    category,
  }

  state.products = state.products.map((product) => (product.id === id ? updatedProduct : product))
  return updatedProduct
}

export const createDemoOrder = (data: {
  name: string
  total: number
  order: { id: string; name: string; price: number; quantity: number; subTotal: number }[]
}) => {
  const order = {
    id: createId('demo-order'),
    name: data.name,
    total: data.total,
    date: new Date(),
    status: false,
    orderReadyAt: null,
    orderProducts: data.order.map((item) => ({
      id: createId('demo-order-product'),
      quantity: item.quantity,
      product: {
        id: item.id,
        name: item.name,
        price: item.price,
        image: 'cafe_01',
        categoryId: state.categories[0]?.id ?? '',
      },
    })),
  }

  state.pendingOrders = [order, ...state.pendingOrders]
  return order
}

export const completeDemoOrder = (orderId: string) => {
  const order = state.pendingOrders.find((item) => item.id === orderId)
  if (!order) return null

  const completedOrder = {
    ...order,
    status: true,
    orderReadyAt: new Date(),
  }

  state.pendingOrders = state.pendingOrders.filter((item) => item.id !== orderId)
  state.readyOrders = [completedOrder, ...state.readyOrders]
  return completedOrder
}
