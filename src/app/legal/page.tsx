import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal & Privacy",
};

export default function LegalPage() {
  return (
    <div className="flex flex-col min-h-screen pt-24 pb-20 relative z-10 w-full">
      <div className="max-w-[800px] mx-auto px-6 w-full">

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Legal & Privacy</h1>
        <p className="text-zinc-400 text-[16px] mb-12">
          Last updated: August 2026. These documents outline the terms of membership and how we handle your data in accordance with our Association's Statute.
        </p>

        <div className="space-y-16">

          {/* Terms & Conditions Section */}
          <section id="terms" className="scroll-mt-32">
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">Terms and Conditions of Membership</h2>

            <div className="space-y-6 text-zinc-400 text-[15px] leading-relaxed">
              <div>
                <h3 className="text-white font-semibold mb-2">1. Nature of the Association</h3>
                <p>
                  Polimi Data Scientists (PMDS) is a student-led association officially recognized by Politecnico di Milano.
                  By paying the membership fee, you are formally registering as an associate member of PMDS and agree to abide by our official Statute (Statuto).
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">2. Membership Fee & Validity</h3>
                <p>
                  The membership fee is an annual associative contribution. It is valid strictly for the academic year in which it is purchased.
                  Due to the nature of associative fees, the payment is <strong>strictly non-refundable</strong> once processed.
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">3. Eligibility</h3>
                <p>
                  As per Art. 3 of our Statute, membership is exclusively reserved for actively enrolled students (BSc, MSc, PhD) at Politecnico di Milano who are <strong>at least 18 years of age</strong>. 
                  If you purchase a membership but do not meet these requirements, your membership will be voided without refund.
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">4. Gadgets & Merchandise (Premium Tier)</h3>
                <p>
                  Physical items included in the Premium membership tier must be collected in person on the Politecnico di Milano campus during designated association events or pick-up days. We do not offer shipping.
                </p>
              </div>
            </div>
          </section>

          {/* Privacy Policy Section */}
          <section id="privacy" className="scroll-mt-32">
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">Privacy Policy</h2>

            <div className="space-y-6 text-zinc-400 text-[15px] leading-relaxed">
              <div>
                <h3 className="text-white font-semibold mb-2">1. Data Collection</h3>
                <p>
                  We collect minimal personal information necessary to manage our associative register. This includes your Name, Surname, institutional Email Address (@mail.polimi.it or @polimi.it), and university ID (Codice Persona).
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">2. Use of Data</h3>
                <p>
                  Your data is used exclusively to:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Verify your eligibility as a PoliMi student.</li>
                  <li>Maintain the official register of association members.</li>
                  <li>Send you communications regarding association activities, assemblies, and events.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">3. Payment Processing</h3>
                <p>
                  All payments are securely processed by <strong>Stripe</strong>. PMDS does not collect, store, or have access to your credit card information or banking details. Please refer to Stripe's Privacy Policy for details on how your payment data is handled.
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">4. Data Sharing</h3>
                <p>
                  We will never sell, rent, or share your personal data with third-party companies, sponsors, or marketing agencies. Your data remains strictly within the association's internal management tools.
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
