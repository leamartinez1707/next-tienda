import { create } from 'zustand'
import { OrderItem } from '../types'
import { Product } from '@prisma/client'


interface Store {
    order: OrderItem[]
    totalOrder: number
    addToCart: (product: Product) => void
    increaseQuantity: (id: Product['id']) => void
    decreaseQuantity: (id: Product['id']) => void
    removeItemFromCart: (id: Product['id']) => void
    cleanOrder: () => void
}

export const useStore = create<Store>((set, get) => ({

    order: [],
    totalOrder: 0,
    addToCart: (product) => {

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { categoryId, image, ...data } = product

        let order: OrderItem[]

        if (get().order.find(item => item.id === product.id)) {

            order = get().order.map(item => item.id === product.id ? {
                ...item,
                quantity: item.quantity + 1,
                subTotal: item.price * (item.quantity + 1)
            } : item)
        } else {

            order = [...get().order, {
                ...data,
                quantity: 1,
                subTotal: 1 * product.price,
            }]

        }

        set(() => ({
            order
        }))
    },

    increaseQuantity: (id) => {
        set((state) => ({
            order: state.order.map(item => item.id === id ? {
                ...item,
                quantity: item.quantity + 1,
                subTotal: item.price * (item.quantity + 1)
            } : item)
        }))
    },
    decreaseQuantity: (id) => {

        // Diferente forma de hacerlo. Si la lógica es muy grande conviene hacerlo antes del set
        const order = get().order.map(item => item.id === id ? {
            ...item,
            quantity: item.quantity - 1,
            subTotal: item.price * (item.quantity - 1)
        } : item)

        set(() => ({
            order
        }))
    },
    removeItemFromCart: (id) => {
        set(() => ({
            order: get().order.filter(item => item.id !== id)
        }))
    },
    cleanOrder: () => {
        set(() => ({
            order: [],
        }))
    }

}))