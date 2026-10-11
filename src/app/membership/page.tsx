'use client';
import { useState } from 'react';
import { FaCalendarAlt, FaCheck, FaInfoCircle, FaStar } from 'react-icons/fa';

// Developer toggle for the active enrollment window
const ACTIVE_TRANCHE: 'fall' | 'winter' = 'fall';
const ACADEMIC_YEAR = '2026/2027';

export default function MembershipPage() {
  const [checkoutTier, setCheckoutTier] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const emailLower = email.toLowerCase().trim();
    if (
      !emailLower.endsWith('@mail.polimi.it') &&
      !emailLower.endsWith('@polimi.it')
    ) {
      setErrorMsg('Please enter a valid @mail.polimi.it or @polimi.it address');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailLower,
          tier: checkoutTier,
          tranche: ACTIVE_TRANCHE,
        }),
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
    <div className="relative flex min-h-screen flex-col overflow-hidden pt-32 pb-24">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute top-[10%] left-1/2 -z-10 h-[400px] w-[80vw] max-w-[800px] -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]" />

      <div className="mx-auto mb-8 max-w-[800px] px-6 text-center">
        <h1 className="mb-6 text-4xl leading-[1.1] font-extrabold tracking-tight text-foreground md:text-6xl">
          Join the{' '}
          <span className="bg-gradient-to-r from-accent to-[#8b9ffe] bg-clip-text text-transparent">
            Community
          </span>
        </h1>
        <p className="mx-auto max-w-[600px] text-base leading-relaxed text-muted md:text-lg">
          Unlock exclusive workshops, join real-world data science projects, and
          connect with industry leaders.
        </p>
      </div>

      {/* Active Tranche Indicator */}
      <div className="relative z-10 mb-16 flex flex-col items-center">
        <div className="mb-3 inline-flex items-center gap-3 rounded-full border border-accent/30 bg-accent/10 px-5 py-2.5 text-sm font-semibold text-accent shadow-[0_0_20px_--alpha(var(--color-accent)/15%)]">
          <FaCalendarAlt size={16} />
          {ACTIVE_TRANCHE === 'fall'
            ? `Now Enrolling: Fall Tranche (${ACADEMIC_YEAR})`
            : `Now Enrolling: Winter Tranche (${ACADEMIC_YEAR})`}
        </div>
        <div className="flex items-center gap-1.5 rounded-full border bg-background/20 px-3 py-1 text-xs text-muted">
          <FaInfoCircle />
          <span>
            {ACTIVE_TRANCHE === 'fall'
              ? 'Fall memberships are valid until September 1st.'
              : 'Winter memberships are valid until January 1st.'}
          </span>
        </div>
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-8 px-6 md:grid-cols-3">
        {/* Supporter Standard Tier */}
        <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a]/90 p-8 backdrop-blur-sm transition-all">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-foreground">Supporter</h3>
            <p className="mt-1 text-sm text-muted">
              Everything you need to get started
            </p>
          </div>
          <div className="mb-6 flex items-baseline gap-1">
            <span className="text-3xl font-bold text-foreground">€6</span>
            <span className="text-sm text-muted">/year</span>
          </div>

          <div className="flex-1">
            <ul className="mb-8 flex flex-col gap-4">
              <li className="flex items-start gap-3 text-sm text-muted">
                <FaCheck className="mt-1 shrink-0 text-accent" size={14} />
                <span>Official Associate Status</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted">
                <FaCheck className="mt-1 shrink-0 text-accent" size={14} />
                <span>Access to member-only Events & Workshops</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted">
                <FaCheck className="mt-1 shrink-0 text-accent" size={14} />
                <span>Eligibility to join internal Projects</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted opacity-70">
                <FaInfoCircle className="mt-1 shrink-0" size={14} />
                <span>No voting rights in the Assembly</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => setCheckoutTier('standard')}
            className="mt-auto w-full cursor-pointer rounded-xl border border-white/10 bg-white/5 py-4 font-medium text-foreground transition-colors hover:bg-white/10"
          >
            Get Supporter
          </button>
        </div>

        {/* Supporter Premium Tier */}
        <div className="relative z-10 flex h-full flex-col overflow-hidden rounded-3xl border border-accent/40 bg-gradient-to-b from-surface-accent to-[#0a0a0a]/90 p-8 shadow-[0_0_80px_rgba(75,111,254,0.15)] backdrop-blur-sm transition-all hover:border-accent/60 md:scale-105">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent" />

          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-foreground">Premium</h3>
              <span className="flex items-center gap-1 rounded-full bg-accent/20 px-2 py-0.5 text-xs font-bold tracking-wider text-accent uppercase">
                <FaStar size={10} /> Popular
              </span>
            </div>
            <p className="mt-1 text-sm text-muted">
              For true data science enthusiasts
            </p>
          </div>
          <div className="mb-6 flex items-baseline gap-1">
            <span className="text-3xl font-bold text-foreground">€11</span>
            <span className="text-sm text-muted">/year</span>
          </div>

          <div className="flex-1">
            <ul className="mb-8 flex flex-col gap-4">
              <li className="flex items-start gap-3 text-sm font-medium text-foreground">
                <FaCheck className="mt-1 shrink-0 text-accent" size={14} />
                <span>Everything in Supporter</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted">
                <FaCheck className="mt-1 shrink-0 text-foreground" size={14} />
                <span>
                  <strong className="text-foreground">
                    Complimentary PMDS Gadget
                  </strong>{' '}
                  as a welcome gift
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted">
                <FaCheck className="mt-1 shrink-0 text-foreground" size={14} />
                <span>Priority access to limited-seat Workshops</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted">
                <FaCheck className="mt-1 shrink-0 text-foreground" size={14} />
                <span>Exclusive networking with Partners</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => setCheckoutTier('premium')}
            className="mt-auto w-full cursor-pointer rounded-xl bg-accent py-4 font-semibold text-foreground shadow-[0_0_20px_rgba(75,111,254,0.3)] transition-colors hover:bg-accent-secondary hover:shadow-[0_0_30px_rgba(75,111,254,0.5)]"
          >
            Go Premium
          </button>
        </div>

        {/* Active Tier */}
        <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a]/90 p-8 backdrop-blur-sm transition-all">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-foreground">
              Active Member
            </h3>
            <p className="mt-1 text-sm text-muted">
              For those who want to shape PMDS
            </p>
          </div>
          <div className="mb-6 flex items-baseline gap-1">
            <span className="text-3xl font-bold text-foreground">€11</span>
            <span className="text-sm text-muted">/year</span>
          </div>

          <div className="flex-1">
            <ul className="mb-8 flex flex-col gap-4">
              <li className="flex items-start gap-3 text-sm font-medium text-foreground">
                <FaCheck className="mt-1 shrink-0 text-accent" size={14} />
                <span>Everything in Premium</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted">
                <FaCheck className="mt-1 shrink-0 text-foreground" size={14} />
                <span>
                  Official{' '}
                  <strong className="text-foreground">Active Status</strong>
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted">
                <FaCheck className="mt-1 shrink-0 text-foreground" size={14} />
                <span>
                  <strong className="text-foreground">
                    Full Voting Rights
                  </strong>{' '}
                  in the Assembly
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted">
                <FaCheck className="mt-1 shrink-0 text-foreground" size={14} />
                <span>Eligibility for Executive Board</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted opacity-70">
                <FaInfoCircle className="mt-1 shrink-0" size={14} />
                <span>Subject to Board approval</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => setCheckoutTier('active')}
            className="mt-auto w-full cursor-pointer rounded-xl border border-white/10 bg-white/5 py-4 font-medium text-foreground transition-colors hover:bg-white/10"
          >
            Apply Now
          </button>
        </div>
      </div>

      {/* FAQ / Info Section */}
      <div className="relative z-10 mx-auto mt-32 w-full max-w-[1000px] px-6">
        <h2 className="mb-12 text-center text-3xl font-bold text-foreground">
          Frequently Asked Questions
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
            <h4 className="mb-2 text-base font-medium text-foreground">
              What is the difference between Premium and Active?
            </h4>
            <p className="text-sm leading-relaxed text-muted">
              Both have a €11 membership fee and come with a complimentary PMDS
              gadget as a welcome gift. However, <strong>Premium</strong> is a
              Supporter tier (no voting rights), while <strong>Active</strong>{' '}
              grants full voting rights in the Assembly and allows you to run
              for the Board. Active membership requires formal Board approval
              and participation in meetings.
            </p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
            <h4 className="mb-2 text-base font-medium text-foreground">
              What are the responsibilities of an Active Member?
            </h4>
            <p className="text-sm leading-relaxed text-muted">
              Active Members must attend the General Assembly (held at least
              once a year) and participate in bureaucratic duties such as
              approving the annual budget and deliberating on statutory matters.
            </p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
            <h4 className="mb-2 text-base font-medium text-foreground">
              Do I need to be approved by the Board?
            </h4>
            <p className="text-sm leading-relaxed text-muted">
              Yes. Supporter requests are routinely approved as long as you meet
              the basic student eligibility criteria. Active Member requests
              undergo a thorough review process by the Board. In the unlikely
              event that your application is rejected, your fee will be fully
              refunded, or (if you applied for Active) you may be downgraded to
              a Premium membership.
            </p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
            <h4 className="mb-2 text-base font-medium text-foreground">
              Who can become a member?
            </h4>
            <p className="text-sm leading-relaxed text-muted">
              Membership is strictly reserved for current{' '}
              <strong className="text-foreground">
                BSc, MSc, and PhD students enrolled at Politecnico di Milano
              </strong>
              . External professionals cannot officially join the association,
              but if you'd like to support our initiatives, you can make a{' '}
              <a
                href="https://donate.stripe.com/aFadR1fD69lpdRV9F64sE00"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline decoration-white/20 transition-colors hover:text-accent"
              >
                voluntary donation
              </a>{' '}
              to help us grow!
            </p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
            <h4 className="mb-2 text-base font-medium text-foreground">
              How long is the membership valid?
            </h4>
            <p className="text-sm leading-relaxed text-muted">
              It depends on the active Enrollment Tranche. Fall enrollments are
              valid until the following September. Winter enrollments are valid
              until the following January.
            </p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
            <h4 className="mb-2 text-base font-medium text-foreground">
              Are the membership fees refundable?
            </h4>
            <p className="text-sm leading-relaxed text-muted">
              No. The membership fee is considered an annual associative
              contribution used entirely to fund PMDS activities and is strictly
              non-refundable and non-fractionable.
            </p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
            <h4 className="mb-2 text-base font-medium text-foreground">
              When does a membership expire?
            </h4>
            <p className="text-sm leading-relaxed text-muted">
              Membership is automatically revoked if you fail to renew it at the
              natural expiration of your tranche, if you lose your PoliMi
              student status, or in case of disciplinary expulsion.
            </p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
            <h4 className="mb-2 text-base font-medium text-foreground">
              How do I get my welcome gadget?
            </h4>
            <p className="text-sm leading-relaxed text-muted">
              If you join as a Premium or Active member, you can pick up your
              complimentary PMDS gadget at any of our in-person events or during
              our designated pick-up days on campus.
            </p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
            <h4 className="mb-2 text-base font-medium text-foreground">
              Can I switch tiers later?
            </h4>
            <div className="text-sm leading-relaxed text-muted">
              <ul className="list-disc space-y-1 pl-4">
                <li>
                  Switching between Supporter and Active (in either direction)
                  is <strong>not permitted</strong>.
                </li>
                <li>
                  Downgrading from Premium to Standard is{' '}
                  <strong>not permitted</strong>.
                </li>
                <li>
                  Upgrading from Standard to Premium{' '}
                  <strong>is permitted</strong>. Contact us for further
                  information.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {checkoutTier && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#0a0a0a] p-8 shadow-[0_0_80px_rgba(75,111,254,0.15)]">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 text-xl text-muted transition-colors hover:text-foreground"
            >
              ✕
            </button>
            <h3 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
              Verify Student Status
            </h3>
            <p className="mb-6 text-sm text-muted">
              Enter your official PoliMi email to proceed. This ensures only
              eligible students can join the association.
            </p>
            <form onSubmit={handleCheckout} className="flex flex-col gap-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="mario.rossi@mail.polimi.it"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-foreground placeholder-muted transition-colors focus:border-accent focus:outline-none"
                  required
                />
                {errorMsg && (
                  <p className="mt-2 text-xs text-red-400">{errorMsg}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3 font-semibold text-foreground transition-all hover:bg-accent-secondary disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="animate-pulse">
                    Redirecting to Stripe...
                  </span>
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
