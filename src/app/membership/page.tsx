'use client';
import { useState } from 'react';
import { FaCheck, FaStar, FaInfoCircle, FaCalendarAlt } from 'react-icons/fa';
import Link from 'next/link';

// Developer toggle for the active enrollment window
const ACTIVE_TRANCHE: 'fall' | 'winter' = 'fall';
const ACADEMIC_YEAR = "2026/2027";

export default function MembershipPage() {
  const [checkoutTier, setCheckoutTier] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const emailLower = email.toLowerCase().trim();
    if (!emailLower.endsWith('@mail.polimi.it') && !emailLower.endsWith('@polimi.it')) {
      setErrorMsg('Please enter a valid @mail.polimi.it or @polimi.it address');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailLower, tier: checkoutTier, tranche: ACTIVE_TRANCHE }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setErrorMsg(data.error || 'Failed to initialize checkout');
        setIsLoading(false);
      }
    } catch (err) {
      setErrorMsg('A network error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setCheckoutTier(null);
    setEmail('');
    setErrorMsg('');
  };

  return (
    <div className="flex flex-col min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[80vw] max-w-[800px] h-[400px] bg-[#4b6ffe]/15 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-[800px] mx-auto px-6 text-center mb-8">
        <h1 className="text-[40px] md:text-[56px] font-[800] text-white tracking-tight leading-[1.1] mb-6">
          Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4b6ffe] to-[#8b9ffe]">Community</span>
        </h1>
        <p className="text-zinc-400 text-[16px] md:text-[18px] max-w-[600px] mx-auto leading-relaxed">
          Unlock exclusive workshops, join real-world data science projects, and connect with industry leaders.
        </p>
      </div>

      {/* Active Tranche Indicator */}
      <div className="flex flex-col items-center mb-16 relative z-10">
        <div className="inline-flex items-center gap-3 bg-[#4b6ffe]/10 border border-[#4b6ffe]/30 text-[#4b6ffe] px-5 py-2.5 rounded-full text-sm font-semibold shadow-[0_0_20px_rgba(75,111,254,0.15)] mb-3">
          <FaCalendarAlt size={16} />
          {ACTIVE_TRANCHE === 'fall'
            ? `Now Enrolling: Fall Tranche (${ACADEMIC_YEAR})`
            : `Now Enrolling: Winter Tranche (${ACADEMIC_YEAR})`
          }
        </div>
        <div className="text-zinc-500 text-[13px] flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-full border border-white/5">
          <FaInfoCircle />
          <span>
            {ACTIVE_TRANCHE === 'fall'
              ? "Fall memberships are valid until September 1st."
              : "Winter memberships are valid until January 1st."
            }
          </span>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative z-10">

        {/* Supporter Standard Tier */}
        <div className="flex flex-col bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 relative overflow-hidden transition-all hover:border-white/20 h-full">
          <div className="mb-6">
            <h3 className="text-white text-[24px] font-bold">Supporter</h3>
            <p className="text-zinc-500 text-[14px] mt-1">Everything you need to get started</p>
          </div>
          <div className="flex items-baseline gap-1 mb-6">
            <span className="text-white text-[32px] font-bold">€6</span>
            <span className="text-zinc-500 text-[14px]">/year</span>
          </div>

          <div className="flex-1">
            <ul className="flex flex-col gap-4 mb-8">
              <li className="flex items-start gap-3 text-[14px] text-zinc-300">
                <FaCheck className="text-[#4b6ffe] mt-1 shrink-0" size={14} />
                <span>Official Associate Status</span>
              </li>
              <li className="flex items-start gap-3 text-[14px] text-zinc-300">
                <FaCheck className="text-[#4b6ffe] mt-1 shrink-0" size={14} />
                <span>Access to member-only Events & Workshops</span>
              </li>
              <li className="flex items-start gap-3 text-[14px] text-zinc-300">
                <FaCheck className="text-[#4b6ffe] mt-1 shrink-0" size={14} />
                <span>Eligibility to join internal Projects</span>
              </li>
              <li className="flex items-start gap-3 text-[14px] text-zinc-500 opacity-70">
                <FaInfoCircle className="mt-1 shrink-0" size={14} />
                <span>No voting rights in the Assembly</span>
              </li>
            </ul>
          </div>

          <button onClick={() => setCheckoutTier('standard')} className="cursor-pointer w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors mt-auto">
            Get Supporter
          </button>
        </div>

        {/* Supporter Premium Tier */}
        <div className="flex flex-col bg-gradient-to-b from-[#151a2d] to-[#0a0a0a] border border-[#4b6ffe]/40 rounded-3xl p-8 relative overflow-hidden transition-all hover:border-[#4b6ffe]/60 shadow-[0_0_40px_rgba(75,111,254,0.1)] md:scale-105 h-full z-10">
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#4b6ffe] to-transparent" />

          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h3 className="text-white text-[24px] font-bold">Premium</h3>
              <span className="bg-[#4b6ffe]/20 text-[#4b6ffe] text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <FaStar size={10} /> Popular
              </span>
            </div>
            <p className="text-zinc-400 text-[14px] mt-1">For true data science enthusiasts</p>
          </div>
          <div className="flex items-baseline gap-1 mb-6">
            <span className="text-white text-[32px] font-bold">€10</span>
            <span className="text-zinc-500 text-[14px]">/year</span>
          </div>

          <div className="flex-1">
            <ul className="flex flex-col gap-4 mb-8">
              <li className="flex items-start gap-3 text-[14px] text-white font-medium">
                <FaCheck className="text-[#4b6ffe] mt-1 shrink-0" size={14} />
                <span>Everything in Supporter</span>
              </li>
              <li className="flex items-start gap-3 text-[14px] text-zinc-300">
                <FaCheck className="text-white mt-1 shrink-0" size={14} />
                <span><strong className="text-white">Complimentary PMDS Gadget</strong> as a welcome gift</span>
              </li>
              <li className="flex items-start gap-3 text-[14px] text-zinc-300">
                <FaCheck className="text-white mt-1 shrink-0" size={14} />
                <span>Priority access to limited-seat Workshops</span>
              </li>
              <li className="flex items-start gap-3 text-[14px] text-zinc-300">
                <FaCheck className="text-white mt-1 shrink-0" size={14} />
                <span>Exclusive networking with Partners</span>
              </li>
            </ul>
          </div>

          <button onClick={() => setCheckoutTier('premium')} className="cursor-pointer w-full py-4 rounded-xl bg-[#4b6ffe] text-white font-semibold hover:bg-[#3f5fdf] transition-colors mt-auto shadow-[0_0_20px_rgba(75,111,254,0.3)] hover:shadow-[0_0_30px_rgba(75,111,254,0.5)]">
            Go Premium
          </button>
        </div>

        {/* Active Tier */}
        <div className="flex flex-col bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 relative overflow-hidden transition-all hover:border-white/20 h-full">
          <div className="mb-6">
            <h3 className="text-white text-[24px] font-bold">Active Member</h3>
            <p className="text-zinc-500 text-[14px] mt-1">For those who want to shape PMDS</p>
          </div>
          <div className="flex items-baseline gap-1 mb-6">
            <span className="text-white text-[32px] font-bold">€10</span>
            <span className="text-zinc-500 text-[14px]">/year</span>
          </div>

          <div className="flex-1">
            <ul className="flex flex-col gap-4 mb-8">
              <li className="flex items-start gap-3 text-[14px] text-white font-medium">
                <FaCheck className="text-[#4b6ffe] mt-1 shrink-0" size={14} />
                <span>Everything in Premium</span>
              </li>
              <li className="flex items-start gap-3 text-[14px] text-zinc-300">
                <FaCheck className="text-white mt-1 shrink-0" size={14} />
                <span>Official <strong className="text-white">Active Status</strong></span>
              </li>
              <li className="flex items-start gap-3 text-[14px] text-zinc-300">
                <FaCheck className="text-white mt-1 shrink-0" size={14} />
                <span><strong className="text-white">Full Voting Rights</strong> in the Assembly</span>
              </li>
              <li className="flex items-start gap-3 text-[14px] text-zinc-300">
                <FaCheck className="text-white mt-1 shrink-0" size={14} />
                <span>Eligibility for Executive Board</span>
              </li>
              <li className="flex items-start gap-3 text-[14px] text-zinc-500 opacity-70">
                <FaInfoCircle className="mt-1 shrink-0" size={14} />
                <span>Subject to Board approval</span>
              </li>
            </ul>
          </div>

          <button onClick={() => setCheckoutTier('active')} className="cursor-pointer w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors mt-auto">
            Apply Now
          </button>
        </div>

      </div>

      {/* FAQ / Info Section */}
      <div className="max-w-[1000px] mx-auto px-6 w-full mt-32 relative z-10">
        <h2 className="text-[28px] font-bold text-white text-center mb-12">Frequently Asked Questions</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
            <h4 className="text-white font-medium text-[16px] mb-2">What is the difference between Premium and Active?</h4>
            <p className="text-zinc-400 text-[14px] leading-relaxed">
              Both have a €10 membership fee and come with a complimentary PMDS gadget as a welcome gift. However, <strong>Premium</strong> is a Supporter tier (no voting rights), while <strong>Active</strong> grants full voting rights in the Assembly and allows you to run for the Board. Active membership requires formal Board approval and participation in meetings.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
            <h4 className="text-white font-medium text-[16px] mb-2">What are the responsibilities of an Active Member?</h4>
            <p className="text-zinc-400 text-[14px] leading-relaxed">
              Active Members must attend the General Assembly (held at least once a year) and participate in bureaucratic duties such as approving the annual budget and deliberating on statutory matters.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
            <h4 className="text-white font-medium text-[16px] mb-2">Do I need to be approved by the Board?</h4>
            <p className="text-zinc-400 text-[14px] leading-relaxed">
              Yes. Supporter requests are routinely approved as long as you meet the basic student eligibility criteria. Active Member requests undergo a thorough review process by the Board. In the unlikely event that your application is rejected, your fee will be fully refunded, or (if you applied for Active) you may be downgraded to a Premium membership.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
            <h4 className="text-white font-medium text-[16px] mb-2">Who can become a member?</h4>
            <p className="text-zinc-400 text-[14px] leading-relaxed">
              Membership is strictly reserved for current <strong className="text-white">BSc, MSc, and PhD students enrolled at Politecnico di Milano</strong>. External professionals cannot officially join the association, but if you'd like to support our initiatives, you can make a <a href="https://donate.stripe.com/aFadR1fD69lpdRV9F64sE00" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/20 hover:text-[#4b6ffe] transition-colors">voluntary donation</a> to help us grow!
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
            <h4 className="text-white font-medium text-[16px] mb-2">How long is the membership valid?</h4>
            <p className="text-zinc-400 text-[14px] leading-relaxed">
              It depends on the active Enrollment Tranche. Fall enrollments are valid until the following September. Winter enrollments are valid until the following January.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
            <h4 className="text-white font-medium text-[16px] mb-2">Are the membership fees refundable?</h4>
            <p className="text-zinc-400 text-[14px] leading-relaxed">
              No. The membership fee is considered an annual associative contribution used entirely to fund PMDS activities and is strictly non-refundable and non-fractionable.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
            <h4 className="text-white font-medium text-[16px] mb-2">When does a membership expire?</h4>
            <p className="text-zinc-400 text-[14px] leading-relaxed">
              Membership is automatically revoked if you fail to renew it at the natural expiration of your tranche, if you lose your PoliMi student status, or in case of disciplinary expulsion.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
            <h4 className="text-white font-medium text-[16px] mb-2">How do I get my welcome gadget?</h4>
            <p className="text-zinc-400 text-[14px] leading-relaxed">
              If you join as a Premium or Active member, you can pick up your complimentary PMDS gadget at any of our in-person events or during our designated pick-up days on campus.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
            <h4 className="text-white font-medium text-[16px] mb-2">Can I switch tiers later?</h4>
            <div className="text-zinc-400 text-[14px] leading-relaxed">
              <ul className="list-disc pl-4 space-y-1">
                <li>Switching between Supporter and Active (in either direction) is <strong>not permitted</strong>.</li>
                <li>Downgrading from Premium to Standard is <strong>not permitted</strong>.</li>
                <li>Upgrading from Standard to Premium <strong>is permitted</strong>. Contact us for further information.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {checkoutTier && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-[0_0_80px_rgba(75,111,254,0.15)] relative">
            <button onClick={closeModal} className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors p-2 text-xl">
              ✕
            </button>
            <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Verify Student Status</h3>
            <p className="text-zinc-400 text-sm mb-6">
              Enter your official PoliMi email to proceed. This ensures only eligible students can join the association.
            </p>
            <form onSubmit={handleCheckout} className="flex flex-col gap-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="mario.rossi@mail.polimi.it"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-[#4b6ffe] transition-colors"
                  required
                />
                {errorMsg && <p className="text-red-400 text-xs mt-2">{errorMsg}</p>}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#4b6ffe] text-white font-semibold py-3 rounded-xl transition-all hover:bg-[#3f5fdf] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span className="animate-pulse">Redirecting to Stripe...</span>
                ) : (
                  'Continue to Payment'
                )}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
