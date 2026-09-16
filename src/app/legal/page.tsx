import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal & Privacy",
  description: "Terms of membership and privacy policy of Associazione Polimi Data Scientists (PMDS).",
};

export default function LegalPage() {
  return (
    <div className="flex flex-col min-h-screen pt-24 pb-20 relative z-10 w-full">
      <div className="max-w-[800px] mx-auto px-6 w-full">

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Legal & Privacy</h1>
        <p className="text-zinc-400 text-[16px] mb-12 leading-relaxed">
          Last updated: September 2026. This page outlines the terms and conditions of association membership, fee policies, and how we handle your personal data in accordance with our Statute, Internal Regulation, and the EU General Data Protection Regulation (GDPR).
        </p>

        {/* Association Details */}
        <div className="mb-12 p-5 rounded-xl bg-[#0a0a0a] border border-white/5 text-sm text-zinc-400 space-y-1">
          <p className="text-white font-semibold">Associazione Polimi Data Scientists (PMDS)</p>
          <p>Student association recognized by Politecnico di Milano</p>
          <p>Codice Fiscale: <span className="text-zinc-300 font-mono">97859030153</span></p>
          <p>Email: <a href="mailto:info@polimidatascientists.it" className="text-[#4b6ffe] hover:underline">info@polimidatascientists.it</a></p>
        </div>

        <div className="space-y-16">

          {/* Terms & Conditions Section */}
          <section id="terms" className="scroll-mt-32">
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">
              Terms and Conditions of Membership
            </h2>

            <div className="space-y-6 text-zinc-400 text-[15px] leading-relaxed">
              <div>
                <h3 className="text-white font-semibold mb-2">1. Nature of the Association & Fee</h3>
                <p>
                  Polimi Data Scientists (PMDS) is an independent, non-profit student association officially recognized by Politecnico di Milano.
                  Any fee paid during registration constitutes an annual associative contribution (<em>quota associativa</em>) dedicated entirely to supporting association activities and operational costs, and does not represent a commercial purchase of goods or services.
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">2. Eligibility</h3>
                <p>
                  Membership is strictly and exclusively reserved for students currently enrolled in a Bachelor of Science (BSc), Master of Science (MSc), or PhD program at Politecnico di Milano who are <strong>at least 18 years of age</strong>.
                </p>
                <p className="mt-2">
                  Registration requires an official university email address (<code className="text-zinc-300">@mail.polimi.it</code> or <code className="text-zinc-300">@polimi.it</code>). External individuals, professionals, and students from other universities cannot register as members. Those wishing to support our initiatives may do so through <a href="https://donate.stripe.com/aFadR1fD69lpdRV9F64sE00" target="_blank" rel="noopener noreferrer" className="text-[#4b6ffe] underline hover:text-white transition-colors">voluntary donations</a>.
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">3. Membership Tiers & Board Approval</h3>
                <p>
                  PMDS offers three membership levels:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1.5">
                  <li>
                    <strong className="text-zinc-200">Standard (€6/year):</strong> Supporter tier granting access to open workshops and general community channels.
                  </li>
                  <li>
                    <strong className="text-zinc-200">Premium (€11/year):</strong> Supporter tier granting access to exclusive activities, priority event registration, and a complimentary welcome gadget.
                  </li>
                  <li>
                    <strong className="text-zinc-200">Active (€11/year):</strong> Includes all Premium benefits plus full voting rights in the General Assembly and eligibility to run for the Executive Board. Active members are required to attend assemblies and participate in associative duties (such as approving the annual financial balance).
                  </li>
                </ul>
                <p className="mt-3">
                  <strong>Board Review:</strong> Active member applications undergo formal review by the Board. In the event that an Active application is not accepted, the applicant will be promptly notified and the membership fee will be <strong>fully refunded</strong> (or converted to Premium upon request).
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">4. Validity Period & Tranches</h3>
                <p>
                  Membership validity depends on the enrollment tranche in which you join:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li><strong>Fall Tranche (September):</strong> Valid until the beginning of September of the following year.</li>
                  <li><strong>Winter Tranche (January):</strong> Valid until the beginning of January of the following year.</li>
                </ul>
                <p className="mt-2">
                  At the end of the validity period, membership naturally expires unless renewed for the subsequent cycle.
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">5. Refund Policy (Non-Refundability)</h3>
                <p>
                  In accordance with Italian associative law, <strong>membership fees are strictly non-refundable and non-fractionable</strong> once processed.
                </p>
                <p className="mt-2">
                  Voluntary withdrawal, graduation, loss of student status, or failure to collect merchandise does not entitle a member to a refund. The only exception is the formal rejection of an Active Member application by the Board.
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">6. Welcome Gadgets & Physical Items</h3>
                <p>
                  Welcome gadgets included in the Premium and Active tiers must be collected <strong>in person on Politecnico di Milano campuses (Leonardo or Bovisa)</strong> during designated association events or pickup days.
                </p>
                <p className="mt-2">
                  PMDS does not provide postal or courier shipping. Uncollected items remain property of the association at the end of the academic year.
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">7. Tier Switching</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Switching between Supporter and Active tiers (in either direction) is not permitted during an active tranche.</li>
                  <li>Downgrading from Premium to Standard is not permitted.</li>
                  <li>Upgrading from Standard to Premium is permitted by paying the fee difference.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Privacy Policy Section */}
          <section id="privacy" className="scroll-mt-32">
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">
              Privacy Policy
            </h2>

            <div className="space-y-6 text-zinc-400 text-[15px] leading-relaxed">
              <div>
                <h3 className="text-white font-semibold mb-2">1. Data Controller</h3>
                <p>
                  The Data Controller is <strong>Associazione Polimi Data Scientists</strong>, Codice Fiscale 97859030153. Contact: <a href="mailto:privacy@polimidatascientists.it" className="text-[#4b6ffe] hover:underline">privacy@polimidatascientists.it</a>.
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">2. Personal Data Collected</h3>
                <p>
                  We collect only the minimal personal data strictly necessary to manage the associative relationship:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>First and last name;</li>
                  <li>Date of birth;</li>
                  <li>Institutional email address (<code className="text-zinc-300">@mail.polimi.it</code> or <code className="text-zinc-300">@polimi.it</code>);</li>
                  <li>Phone number (for operational communications and invitation to official WhatsApp community groups);</li>
                  <li>Membership tier and tranche details.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">3. Purpose and Legal Basis of Processing</h3>
                <p>Personal data is processed exclusively to:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Verify student eligibility at Politecnico di Milano;</li>
                  <li>Maintain the official Register of Members (<em>Libro Soci</em>) in compliance with legal and statutory obligations;</li>
                  <li>Grant access to internal association tools (when applicable);</li>
                  <li>Send notices regarding general assemblies, voting, workshops, and association events.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">4. Payment Processing</h3>
                <p>
                  All payments are processed securely via <strong>Stripe Payments Europe, Ltd.</strong> PMDS never collects, stores, or has access to your credit card details, CVVs, or bank credentials. Payment data is handled directly by Stripe in compliance with PCI-DSS standards. For more details, consult <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#4b6ffe] underline hover:text-white transition-colors">Stripe&apos;s Privacy Policy</a>.
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">5. Data Sharing and Retention</h3>
                <p>
                  We will never sell, lease, or share your personal data with third-party companies, commercial sponsors, or marketing recruiters. Data is accessed only by authorized board members for administrative purposes.
                </p>
                <p className="mt-2">
                  Data is retained for the duration of your membership, and thereafter in the association archives for the period required by Italian fiscal and civil law.
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">6. Your Rights</h3>
                <p>
                  Under the GDPR (Articles 15–22), you have the right to request access to, rectification, or deletion of your personal data, as well as the restriction of processing. To exercise your rights, please email <a href="mailto:privacy@polimidatascientists.it" className="text-[#4b6ffe] hover:underline">privacy@polimidatascientists.it</a>. You also have the right to file a complaint with the Italian Data Protection Authority (<em>Garante Privacy</em>).
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">7. Cookies</h3>
                <p>
                  This website uses exclusively essential technical and session cookies strictly necessary for navigation and payment processing. No profiling, marketing, or third-party tracking cookies are used.
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
