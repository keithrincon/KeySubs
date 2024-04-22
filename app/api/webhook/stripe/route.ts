import stripe from 'stripe';
import { NextResponse } from 'next/server';
import { createOrder } from '@/lib/actions/order.actions';

export async function POST(request: Request) {
  const body = await request.text();

  const sig = request.headers.get('stripe-signature') as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let team;

  try {
    team = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json({ message: 'Webhook error', error: err });
  }

  // Get the ID and type
  const teamType = team.type;

  // CREATE
  if (teamType === 'checkout.session.completed') {
    const { id, amount_total, metadata } = team.data.object;

    const order = {
      stripeId: id,
      teamId: metadata?.teamId || '',
      buyerId: metadata?.buyerId || '',
      totalAmount: amount_total ? (amount_total / 100).toString() : '0',
      createdAt: new Date(),
    };

    const newOrder = await createOrder(order);
    return NextResponse.json({ message: 'OK', order: newOrder });
  }

  return new Response('', { status: 200 });
}
