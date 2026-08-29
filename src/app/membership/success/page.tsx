import Link from "next/link";
import { FaCheckCircle, FaWhatsapp, FaExclamationTriangle } from "react-icons/fa";
import Stripe from "stripe";
import { redirect } from "next/navigation";

// Initialize Stripe. Uses a dummy key during build/dev if real one is missing.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_fallback", {
  apiVersion: "2024-06-20" as any,
});

export default async function MembershipSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  if (!session_id) {
    redirect("/membership");
  }

  // --- DEV TESTING BYPASS ---
  // Allow testing the UI without a real Stripe account by using magic session IDs
  if (process.env.NODE_ENV !== "production") {
    if (session_id === "test_success") return <SuccessState />;
    if (session_id === "test_fail") return <ErrorState />;
  }

  try {
    // Attempt to verify the session with Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== "paid") {
      throw new Error("Payment not completed");
    }

    return <SuccessState />;
  } catch (error) {
    // If the session is invalid, expired, or someone typed a fake ID
    return <ErrorState />;
  }
}

// --- MODULAR UI COMPONENTS ---

import Confetti from "@/components/Confetti";

function SuccessState() {
  // In production, this link is loaded from .env to keep it out of the public repo code!
  const whatsappLink = process.env.WHATSAPP_GROUP_LINK || "https://chat.whatsapp.com/fallback";

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 pt-20 relative overflow-hidden">
      
      {/* Celebration Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-[#4b6ffe]/20 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse"></div>
      
      <Confetti />

      <div className="w-full max-w-[600px] bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-[32px] p-10 md:p-16 text-center flex flex-col items-center shadow-[0_0_80px_rgba(75,111,254,0.15)] relative z-10">
        
        {/* Animated Checkmark Background (Checkmark is static) */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-[#4b6ffe] blur-[20px] opacity-40 rounded-full animate-pulse"></div>
          <FaCheckCircle className="text-[#4b6ffe] text-7xl relative z-10" />
        </div>

        <h1 className="text-3xl md:text-4xl font-[800] text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 mb-4 tracking-tight">
          Welcome to the Club!
        </h1>
        <p className="text-zinc-400 text-[16px] leading-relaxed mb-8">
          Your membership payment was successfully processed. We're incredibly excited to have you on board as an official member.
        </p>
        
        <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-left">
          <h3 className="text-white font-semibold mb-3">Next Steps:</h3>
          <ul className="text-zinc-400 text-[14px] space-y-3">
            <li className="flex gap-2">
              <span className="text-[#4b6ffe]">1.</span> 
              <span>Check your university email for the Stripe receipt.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#4b6ffe]">2.</span> 
              <span>Join our members-only WhatsApp group using the link below!</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <a 
            href={whatsappLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold py-3.5 px-6 rounded-full transition-colors shadow-[0_0_20px_rgba(37,211,102,0.2)]"
          >
            <FaWhatsapp size={20} /> Join WhatsApp
          </a>
          <Link 
            href="/"
            className="flex-1 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold py-3.5 px-6 rounded-full transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorState() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 pt-20">
      <div className="w-full max-w-[600px] bg-[#0a0a0a] border border-red-500/20 rounded-[32px] p-10 text-center flex flex-col items-center">
        <FaExclamationTriangle className="text-red-500 text-5xl mb-6" />
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">Invalid Session</h1>
        <p className="text-zinc-400 mb-8">We couldn't verify your payment. Please ensure you completed checkout or contact us if this is an error.</p>
        <Link href="/membership" className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold py-3 px-6 rounded-full transition-colors">
          Return to Membership
        </Link>
      </div>
    </div>
  );
}
