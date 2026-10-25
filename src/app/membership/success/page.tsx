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

      <div className="relative z-10 flex w-full max-w-[600px] flex-col items-center gap-8 rounded-[32px] border border-white/10 bg-background-secondary p-10 text-center shadow-[0_0_80px_rgba(75,111,254,0.15)] backdrop-blur-xl md:p-16">
        <div className="flex flex-col items-center gap-6">
          {/* Animated Checkmark Background (Checkmark is static) */}
          <div className="relative">
            <div className="absolute inset-0 animate-pulse rounded-full bg-accent opacity-40 blur-[20px]"></div>
            <FaCheckCircle className="relative z-10 text-7xl text-accent" />
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="bg-gradient-to-r from-foreground to-foreground-secondary bg-clip-text type-heading text-transparent">
              Welcome to the Club!
            </h1>
            <p className="type-body text-foreground-secondary">
              Your membership payment was successfully processed. We're
              incredibly excited to have you on board as an official member.
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 text-left">
          <h3 className="type-title text-foreground">Next Steps:</h3>
          <ul className="flex flex-col gap-3 type-body text-foreground-secondary">
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

        <div className="flex w-full flex-col gap-6">
          <div className="flex w-full flex-col gap-4 sm:flex-row">
            <Button
              href={whatsappLink}
              size="md"
              fullWidth
              className="flex-1 bg-[#25D366] py-3.5 shadow-[0_0_20px_rgba(37,211,102,0.2)] hover:bg-[#1EBE5D] hover:shadow-[0_0_20px_rgba(37,211,102,0.2)]"
            >
              <FaWhatsapp size={20} /> Join WhatsApp
            </Button>
            <Button
              href="/"
              variant="secondary"
              size="md"
              fullWidth
              className="flex-1 py-3.5"
            >
              Back to Home
            </Button>
          </div>
          <p className="type-body text-foreground-secondary italic">
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
      <div className="flex w-full max-w-[600px] flex-col items-center gap-8 rounded-[32px] border border-red-500/20 bg-background-secondary p-10 text-center backdrop-blur-xl">
        <div className="flex flex-col items-center gap-6">
          <FaExclamationTriangle className="text-5xl text-red-500" />
          <div className="flex flex-col gap-4">
            <h1 className="type-heading text-foreground">Invalid Session</h1>
            <p className="type-body text-foreground-secondary">
              We couldn't verify your payment. Please ensure you completed
              checkout or contact us if this is an error.
            </p>
          </div>
        </div>
        <Button href="/membership" variant="secondary" size="md">
          Return to Membership
        </Button>
      </div>
    </div>
  );
}
