import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_fallback', {
  apiVersion: '2024-06-20' as any,
});

const PRODUCT_IDS = {
  standard: 'prod_VAblizF9FaE9P5',
  premium: 'prod_VAc7yC9HqMavhj',
  active: 'prod_VAc72DxFyWsQQJ',
};

export async function POST(req: Request) {
  try {
    const { email, tier, tranche } = await req.json();

    if (!email || (!email.endsWith('@mail.polimi.it') && !email.endsWith('@polimi.it'))) {
      return NextResponse.json({ error: 'Invalid PoliMi email address' }, { status: 400 });
    }

    if (!tier || !PRODUCT_IDS[tier as keyof typeof PRODUCT_IDS]) {
      return NextResponse.json({ error: 'Invalid membership tier' }, { status: 400 });
    }

    const productId = PRODUCT_IDS[tier as keyof typeof PRODUCT_IDS];
    
    // DEV BYPASS: If no real stripe key, return a fake url
    if (process.env.NODE_ENV !== 'production' && (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'sk_test_fallback')) {
        return NextResponse.json({ url: '/membership/success?session_id=test_success' });
    }

    const product = await stripe.products.retrieve(productId);
    if (!product.default_price) {
      return NextResponse.json({ error: 'Product has no default price configured in Stripe' }, { status: 400 });
    }
    const priceId = typeof product.default_price === 'string' ? product.default_price : product.default_price.id;

    // Create checkout session
    const origin = req.headers.get('origin') || 'https://www.polimidatascientists.it';
    
    const session = await stripe.checkout.sessions.create({
      customer_email: email, // This locks the email field in Stripe
      metadata: {
        tranche: tranche || 'unknown',
        tier: tier,
      },
      custom_fields: [
        {
          key: 'nome',
          label: { type: 'custom', custom: 'First Name' },
          type: 'text',
          optional: false,
        },
        {
          key: 'cognome',
          label: { type: 'custom', custom: 'Last Name' },
          type: 'text',
          optional: false,
        }
      ],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/membership/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/membership`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
