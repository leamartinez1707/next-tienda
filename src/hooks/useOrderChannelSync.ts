'use client'

import { useEffect } from 'react'
import { mutate } from 'swr'

const ORDER_CHANNEL_NAME = 'orders'
const UPDATE_EVENT = 'update-orders'
const ORDER_SYNC_STORAGE_KEY = 'orders-sync-event'

export const useOrderChannelSync = (cacheKey: string) => {
  useEffect(() => {
    const syncOrders = () => {
      mutate(cacheKey)
    }

    let channel: BroadcastChannel | null = null

    const onMessage = (msg: MessageEvent) => {
      if (msg.data === UPDATE_EVENT) {
        syncOrders()
      }
    }

    const onStorage = (event: StorageEvent) => {
      if (event.key === ORDER_SYNC_STORAGE_KEY && event.newValue) {
        syncOrders()
      }
    }

    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      channel = new BroadcastChannel(ORDER_CHANNEL_NAME)
      channel.addEventListener('message', onMessage)
    }

    window.addEventListener('storage', onStorage)

    return () => {
      if (channel) {
        channel.removeEventListener('message', onMessage)
        channel.close()
      }
      window.removeEventListener('storage', onStorage)
    }
  }, [cacheKey])
}

export const notifyOrderUpdate = () => {
  if (typeof window === 'undefined') return

  if ('BroadcastChannel' in window) {
    const channel = new BroadcastChannel(ORDER_CHANNEL_NAME)
    channel.postMessage(UPDATE_EVENT)
    channel.close()
  }

  // Fallback cross-tab signal for browsers or contexts where BroadcastChannel is unreliable.
  window.localStorage.setItem(ORDER_SYNC_STORAGE_KEY, `${Date.now()}-${Math.random()}`)
}
