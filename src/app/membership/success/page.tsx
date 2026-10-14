import Button from '@/shared/components/ui/Button';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaWhatsapp,
} from 'react-icons/fa';
import Stripe from 'stripe';

// Initialize Stripe. Uses a dummy key during build/dev if real one is missing.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_fallback', {
  apiVersion: '2024-06-20' as any,
});

async function SuccessContent({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  if (!session_id) {
    redirect('/membership');
  }

  // --- DEV TESTING BYPASS ---
  // Allow testing the UI without a real Stripe account by using magic session IDs
  if (process.env.NODE_ENV !== 'production') {
    if (session_id === 'test_success') return <SuccessState />;
    if (session_id === 'test_fail') return <ErrorState />;
  }

  try {
    // Attempt to verify the session with Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== 'paid') {
      throw new Error('Payment not completed');
    }

    return <SuccessState />;
  } catch (error) {
    // If the session is invalid, expired, or someone typed a fake ID
    return <ErrorState />;
  }
}

export default function MembershipSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-20">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-accent border-t-transparent"></div>
        </div>
      }
    >
      <SuccessContent searchParams={searchParams} />
    </Suspense>
  );
}

// --- MODULAR UI COMPONENTS ---

import Confetti from '@/shared/components/ui/Confetti';

function SuccessState() {
  // In production, this link is loaded from .env to keep it out of the public repo code!
  const whatsappLink =
    process.env.WHATSAPP_GROUP_LINK || 'https://chat.whatsapp.com/fallback';

  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-6 pt-20">
      {/* Celebration Background Glows */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-accent/20 blur-[120px] md:h-[600px] md:w-[600px]"></div>

      <Confetti />

      <div className="relative z-10 flex w-full max-w-[600px] flex-col items-center rounded-[32px] border border-white/10 bg-surface/80 p-10 text-center shadow-[0_0_80px_rgba(75,111,254,0.15)] backdrop-blur-xl md:p-16">
        {/* Animated Checkmark Background (Checkmark is static) */}
        <div className="relative mb-6">
          <div className="absolute inset-0 animate-pulse rounded-full bg-accent opacity-40 blur-[20px]"></div>
          <FaCheckCircle className="relative z-10 text-7xl text-accent" />
        </div>

        <h1 className="mb-4 bg-gradient-to-r from-foreground to-muted bg-clip-text text-3xl font-extrabold tracking-tight text-transparent md:text-4xl">
          Welcome to the Club!
        </h1>
        <p className="mb-8 text-base leading-relaxed text-muted">
          Your membership payment was successfully processed. We're incredibly
          excited to have you on board as an official member.
        </p>

        <div className="mb-8 w-full rounded-2xl border border-white/10 bg-white/5 p-6 text-left">
          <h3 className="mb-3 font-semibold text-foreground">Next Steps:</h3>
          <ul className="space-y-3 text-sm text-muted">
            <li className="flex gap-2">
              <span className="text-accent">1.</span>
              <span>
                Check your university email for the Stripe payment receipt.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent">2.</span>
              <span>
                Wait for our official approval email. If you applied for the
                Active Member tier, this email will confirm the outcome of the
                Board's review.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent">3.</span>
              <span>
                Join our members-only WhatsApp group using the button below!
              </span>
            </li>
          </ul>
        </div>

        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full flex-col gap-4 sm:flex-row">
            <Button
              href={whatsappLink}
              size="md"
              fullWidth
              className="flex-1 bg-[#25D366] py-3.5 text-base shadow-[0_0_20px_rgba(37,211,102,0.2)] hover:bg-[#1EBE5D] hover:shadow-[0_0_20px_rgba(37,211,102,0.2)]"
            >
              <FaWhatsapp size={20} /> Join WhatsApp
            </Button>
            <Button
              href="/"
              variant="secondary"
              size="md"
              fullWidth
              className="flex-1 py-3.5 text-base"
            >
              Back to Home
            </Button>
          </div>
          <p className="mt-2 text-xs text-muted italic">
            Note: For security reasons, your request to join the group will be
            manually approved by our admins.
          </p>
        </div>
      </div>
    </div>
  );
}

function ErrorState() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-20">
      <div className="flex w-full max-w-[600px] flex-col items-center rounded-[32px] border border-red-500/20 bg-surface/80 p-10 text-center backdrop-blur-xl">
        <FaExclamationTriangle className="mb-6 text-5xl text-red-500" />
        <h1 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
          Invalid Session
        </h1>
        <p className="mb-8 text-muted">
          We couldn't verify your payment. Please ensure you completed checkout
          or contact us if this is an error.
        </p>
        <Button href="/membership" variant="secondary" size="md">
          Return to Membership
        </Button>
      </div>
    </div>
  );
}
