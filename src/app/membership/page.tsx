'use client';
import Button from '@/shared/components/ui/Button';
import Chip from '@/shared/components/ui/Chip';
import { cn } from '@/shared/lib/utils';
import { ReactNode, useState } from 'react';
import { FaCalendarAlt, FaCheck, FaInfoCircle, FaStar } from 'react-icons/fa';

// Developer toggle for the active enrollment window
const ACTIVE_TRANCHE: 'fall' | 'winter' = 'fall';
const ACADEMIC_YEAR = '2026/2027';

const FAQ_QUESTIONS: { question: string; answer: ReactNode }[] = [
  {
    question: 'What is the difference between Premium and Active?',
    answer: (
      <>
        Both have a €11 membership fee and come with a complimentary PMDS gadget
        as a welcome gift. However, <strong>Premium</strong> is a Supporter tier
        (no voting rights), while <strong>Active</strong> grants full voting
        rights in the Assembly and allows you to run for the Board. Active
        membership requires formal Board approval and participation in meetings.
      </>
    ),
  },
  {
    question: 'What are the responsibilities of an Active Member?',
    answer:
      'Active Members must attend the General Assembly (held at least once a year) and participate in bureaucratic duties such as approving the annual budget and deliberating on statutory matters.',
  },
  {
    question: 'Do I need to be approved by the Board?',
    answer:
      'Yes. Supporter requests are routinely approved as long as you meet the basic student eligibility criteria. Active Member requests undergo a thorough review process by the Board. In the unlikely event that your application is rejected, your fee will be fully refunded, or (if you applied for Active) you may be downgraded to a Premium membership.',
  },
  {
    question: 'Who can become a member?',
    answer: (
      <>
        Membership is strictly reserved for current{' '}
        <strong className="text-foreground">
          BSc, MSc, and PhD students enrolled at Politecnico di Milano
        </strong>
        . External professionals cannot officially join the association, but if
        you&apos;d like to support our initiatives, you can make a{' '}
        <a
          href="https://donate.stripe.com/aFadR1fD69lpdRV9F64sE00"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline decoration-white/20 transition-colors hover:text-accent"
        >
          voluntary donation
        </a>{' '}
        to help us grow!
      </>
    ),
  },
  {
    question: 'How long is the membership valid?',
    answer:
      'It depends on the active Enrollment Tranche. Fall enrollments are valid until the following September. Winter enrollments are valid until the following January.',
  },
  {
    question: 'Are the membership fees refundable?',
    answer:
      'No. The membership fee is considered an annual associative contribution used entirely to fund PMDS activities and is strictly non-refundable and non-fractionable.',
  },
  {
    question: 'When does a membership expire?',
    answer:
      'Membership is automatically revoked if you fail to renew it at the natural expiration of your tranche, if you lose your PoliMi student status, or in case of disciplinary expulsion.',
  },
  {
    question: 'How do I get my welcome gadget?',
    answer:
      'If you join as a Premium or Active member, you can pick up your complimentary PMDS gadget at any of our in-person events or during our designated pick-up days on campus.',
  },
  {
    question: 'Can I switch tiers later?',
    answer: (
      <ul className="flex list-disc flex-col gap-1 pl-4">
        <li>
          Switching between Supporter and Active (in either direction) is{' '}
          <strong>not permitted</strong>.
        </li>
        <li>
          Downgrading from Premium to Standard is <strong>not permitted</strong>
          .
        </li>
        <li>
          Upgrading from Standard to Premium <strong>is permitted</strong>.
          Contact us for further information.
        </li>
      </ul>
    ),
  },
];

function FAQCard({
  question,
  answer,
}: {
  question: string;
  answer: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-white/5 bg-background p-6">
      <h4 className="type-title text-foreground">{question}</h4>
      <div className="type-body text-foreground-secondary">{answer}</div>
    </div>
  );
}

function TierFeature({
  icon,
  className,
  children,
}: {
  icon: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <li className={cn('flex items-start gap-3 type-body', className)}>
      {/* One line tall, so the icon stays aligned with the first text line */}
      <span className="flex h-[1lh] shrink-0 items-center">{icon}</span>
      <span>{children}</span>
    </li>
  );
}

function TierPrice({ price }: { price: string }) {
  return (
    <div className="flex items-baseline gap-1">
      <span className="type-heading text-foreground">{price}</span>
      <span className="type-label text-foreground-secondary">/year</span>
    </div>
  );
}

const checkAccent = <FaCheck className="text-accent" size={14} />;
const checkForeground = <FaCheck className="text-foreground" size={14} />;
const info = <FaInfoCircle size={14} />;

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
    <div className="relative flex min-h-screen flex-col gap-32 overflow-hidden pt-32">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute top-[10%] left-1/2 -z-10 h-[400px] w-[80vw] max-w-[800px] -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]" />

      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-8">
          <div className="mx-auto flex max-w-[800px] flex-col gap-6 px-6 text-center">
            <h1 className="type-heading text-foreground">
              Join the{' '}
              <span className="bg-gradient-to-r from-accent to-[#8b9ffe] bg-clip-text text-transparent">
                Community
              </span>
            </h1>
            <p className="mx-auto max-w-[600px] type-body text-foreground-secondary">
              Unlock exclusive workshops, join real-world data science projects,
              and connect with industry leaders.
            </p>
          </div>

          {/* Active Tranche Indicator */}
          <div className="relative z-10 flex flex-col items-center gap-3">
            <Chip color="highlight" icon={<FaCalendarAlt />}>
              {ACTIVE_TRANCHE === 'fall'
                ? `Now Enrolling: Fall Tranche (${ACADEMIC_YEAR})`
                : `Now Enrolling: Winter Tranche (${ACADEMIC_YEAR})`}
            </Chip>
            <Chip color="muted" icon={<FaInfoCircle />}>
              {ACTIVE_TRANCHE === 'fall'
                ? 'Fall memberships are valid until September 1st.'
                : 'Winter memberships are valid until January 1st.'}
            </Chip>
          </div>
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-8 px-6 md:grid-cols-3">
          {/* Supporter Standard Tier */}
          <div className="relative flex h-full flex-col gap-6 overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a]/90 p-8 backdrop-blur-sm transition-all">
            <div className="flex flex-col gap-1">
              <h3 className="type-title text-foreground">Supporter</h3>
              <p className="type-body text-foreground-secondary">
                Everything you need to get started
              </p>
            </div>
            <TierPrice price="€6" />

            <ul className="flex flex-1 flex-col gap-4 pb-2">
              <TierFeature
                icon={checkAccent}
                className="text-foreground-secondary"
              >
                Official Associate Status
              </TierFeature>
              <TierFeature
                icon={checkAccent}
                className="text-foreground-secondary"
              >
                Access to member-only Events & Workshops
              </TierFeature>
              <TierFeature
                icon={checkAccent}
                className="text-foreground-secondary"
              >
                Eligibility to join internal Projects
              </TierFeature>
              <TierFeature
                icon={info}
                className="text-foreground-secondary opacity-70"
              >
                No voting rights in the Assembly
              </TierFeature>
            </ul>

            <Button
              onClick={() => setCheckoutTier('standard')}
              variant="secondary"
              fullWidth
              className="py-4"
            >
              Get Supporter
            </Button>
          </div>

          {/* Supporter Premium Tier */}
          <div className="relative z-10 flex h-full flex-col gap-6 overflow-hidden rounded-3xl border border-accent/40 bg-gradient-to-b from-accent/15 to-[#0a0a0a]/90 p-8 shadow-[0_0_80px_rgba(75,111,254,0.15)] backdrop-blur-sm transition-all hover:border-accent/60 md:scale-105">
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent" />

            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <h3 className="type-title text-foreground">Premium</h3>
                <Chip color="accent" icon={<FaStar />}>
                  Popular
                </Chip>
              </div>
              <p className="type-body text-foreground-secondary">
                For true data science enthusiasts
              </p>
            </div>
            <TierPrice price="€11" />

            <ul className="flex flex-1 flex-col gap-4 pb-2">
              <TierFeature icon={checkAccent} className="text-foreground">
                Everything in Supporter
              </TierFeature>
              <TierFeature
                icon={checkForeground}
                className="text-foreground-secondary"
              >
                <strong className="text-foreground">
                  Complimentary PMDS Gadget
                </strong>{' '}
                as a welcome gift
              </TierFeature>
              <TierFeature
                icon={checkForeground}
                className="text-foreground-secondary"
              >
                Priority access to limited-seat Workshops
              </TierFeature>
              <TierFeature
                icon={checkForeground}
                className="text-foreground-secondary"
              >
                Exclusive networking with Partners
              </TierFeature>
            </ul>

            <Button
              onClick={() => setCheckoutTier('premium')}
              fullWidth
              className="py-4"
            >
              Go Premium
            </Button>
          </div>

          {/* Active Tier */}
          <div className="relative flex h-full flex-col gap-6 overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a]/90 p-8 backdrop-blur-sm transition-all">
            <div className="flex flex-col gap-1">
              <h3 className="type-title text-foreground">Active Member</h3>
              <p className="type-body text-foreground-secondary">
                For those who want to shape PMDS
              </p>
            </div>
            <TierPrice price="€11" />

            <ul className="flex flex-1 flex-col gap-4 pb-2">
              <TierFeature icon={checkAccent} className="text-foreground">
                Everything in Premium
              </TierFeature>
              <TierFeature
                icon={checkForeground}
                className="text-foreground-secondary"
              >
                Official{' '}
                <strong className="text-foreground">Active Status</strong>
              </TierFeature>
              <TierFeature
                icon={checkForeground}
                className="text-foreground-secondary"
              >
                <strong className="text-foreground">Full Voting Rights</strong>{' '}
                in the Assembly
              </TierFeature>
              <TierFeature
                icon={checkForeground}
                className="text-foreground-secondary"
              >
                Eligibility for Executive Board
              </TierFeature>
              <TierFeature
                icon={info}
                className="text-foreground-secondary opacity-70"
              >
                Subject to Board approval
              </TierFeature>
            </ul>

            <Button
              onClick={() => setCheckoutTier('active')}
              variant="secondary"
              fullWidth
              className="py-4"
            >
              Apply Now
            </Button>
          </div>
        </div>
      </div>

      {/* FAQ / Info Section */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1000px] flex-col gap-12 px-6">
        <h2 className="text-center type-heading text-foreground">
          Frequently Asked Questions
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {FAQ_QUESTIONS.map((faq) => (
            <FAQCard key={faq.question} {...faq} />
          ))}
        </div>
      </div>

      {/* Checkout Modal */}
      {checkoutTier && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div className="relative flex w-full max-w-md flex-col gap-6 rounded-3xl border border-white/10 bg-[#0a0a0a] p-8 shadow-[0_0_80px_rgba(75,111,254,0.15)]">
            <Button
              onClick={closeModal}
              aria-label="Close modal"
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-xl"
            >
              ✕
            </Button>
            <div className="flex flex-col gap-2">
              <h3 className="type-title text-foreground">
                Verify Student Status
              </h3>
              <p className="type-body text-foreground-secondary">
                Enter your official PoliMi email to proceed. This ensures only
                eligible students can join the association.
              </p>
            </div>
            <form onSubmit={handleCheckout} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="mario.rossi@mail.polimi.it"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-foreground placeholder-foreground-secondary transition-colors focus:border-accent focus:outline-none"
                  required
                />
                {errorMsg && (
                  <p className="type-body text-red-400">{errorMsg}</p>
                )}
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                fullWidth
                className="py-3"
              >
                {isLoading ? (
                  <span className="animate-pulse">
                    Redirecting to Stripe...
                  </span>
                ) : (
                  'Continue to Payment'
                )}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
