import Stripe from 'stripe'

let stripeInstance: Stripe | null = null

export function getStripe(): Stripe {
  if (!stripeInstance) {
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2026-01-28.clover',
    })
  }
  return stripeInstance
}

export const PLANS = {
  free: {
    name: 'Free',
    priceId: null,
    price: 0,
    projects: 3,
    exportsPerMonth: 5,
  },
  pro: {
    name: 'Pro',
    priceId: process.env.STRIPE_PRICE_PRO ?? null,
    price: 1900, // $19.00 in cents
    projects: -1, // unlimited
    exportsPerMonth: -1, // unlimited
  },
} as const
