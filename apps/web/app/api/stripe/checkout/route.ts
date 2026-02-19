import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { getStripe, PLANS } from '@/lib/stripe'
import { z } from 'zod'

const schema = z.object({ tier: z.enum(['pro']) })

export async function POST(req: Request): Promise<NextResponse> {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body: unknown = await req.json()
    const { tier } = schema.parse(body)
    const plan = PLANS[tier]
    if (!plan.priceId) return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })

    const stripe = getStripe()
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: plan.priceId, quantity: 1 }],
      success_url: `${process.env.NEXTAUTH_URL}/dashboard?upgraded=true`,
      cancel_url: `${process.env.NEXTAUTH_URL}/pricing`,
      metadata: { userId: session.user.id },
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
