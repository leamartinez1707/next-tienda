const demoFallbackFlag = process.env.DEMO_FALLBACK_ENABLED

// Demo fallback is on by default only outside production.
export const isDemoFallbackEnabled =
  demoFallbackFlag === 'true' || (process.env.NODE_ENV !== 'production' && demoFallbackFlag !== 'false')
