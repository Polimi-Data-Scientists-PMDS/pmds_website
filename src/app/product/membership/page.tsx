import { FaCheck, FaStar, FaBolt, FaGraduationCap } from "react-icons/fa";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Become a Member",
};

export default function MembershipPage() {
  return (
    <div className="flex flex-col min-h-screen pt-20 relative z-10 w-full mb-24 overflow-x-hidden">
      
      {/* Background ambient glow - adjusted to avoid clipping */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[80vw] max-w-[800px] h-[400px] bg-[#4b6ffe]/15 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-[1100px] mx-auto px-6 w-full flex flex-col items-center text-center mt-12 mb-20 relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-[13px] font-medium mb-6">
          <FaGraduationCap className="text-[#4b6ffe]" /> 2026/2027 Academic Year
        </div>
        <h1 className="text-[56px] md:text-[72px] font-bold text-white leading-tight tracking-tight max-w-[800px]">
          Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4b6ffe] to-[#a3b8ff]">Movement.</span>
        </h1>
        <p className="text-[18px] text-zinc-400 max-w-[600px] mt-6 leading-relaxed">
          Unlock your potential. Connect with the brightest minds in AI and Data Science, build real projects, and accelerate your career at Politecnico di Milano.
        </p>
      </div>

      <div className="max-w-[1000px] mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Base Tier */}
        <div className="flex flex-col bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 relative overflow-hidden transition-all hover:border-white/20">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-white text-[24px] font-bold">Standard</h3>
              <p className="text-zinc-500 text-[14px] mt-1">Everything you need to get started</p>
            </div>
            <div className="text-right">
              <span className="text-white text-[32px] font-bold">€5</span>
              <span className="text-zinc-500 text-[14px]">/year</span>
            </div>
          </div>

          <div className="flex-1">
            <ul className="flex flex-col gap-4 mt-6 mb-8">
              <li className="flex items-start gap-3 text-[15px] text-zinc-300">
                <FaCheck className="text-[#4b6ffe] mt-1 shrink-0" size={14} />
                <span>Official Associate Status</span>
              </li>
              <li className="flex items-start gap-3 text-[15px] text-zinc-300">
                <FaCheck className="text-[#4b6ffe] mt-1 shrink-0" size={14} />
                <span>Access to member-only Events & Workshops</span>
              </li>
              <li className="flex items-start gap-3 text-[15px] text-zinc-300">
                <FaCheck className="text-[#4b6ffe] mt-1 shrink-0" size={14} />
                <span>Eligibility to join internal Projects</span>
              </li>
              <li className="flex items-start gap-3 text-[15px] text-zinc-300">
                <FaCheck className="text-[#4b6ffe] mt-1 shrink-0" size={14} />
                <span>Voting rights in the Assembly</span>
              </li>
            </ul>
          </div>

          <button className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors mt-auto">
            Get Standard
          </button>
        </div>

        {/* Premium Tier */}
        <div className="flex flex-col bg-gradient-to-b from-[#151a2d] to-[#0a0a0a] border border-[#4b6ffe]/40 rounded-3xl p-8 relative overflow-hidden transition-all hover:border-[#4b6ffe]/60 shadow-[0_0_40px_rgba(75,111,254,0.1)] md:scale-105">
          {/* Shine effect */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#4b6ffe] to-transparent" />
          
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-white text-[24px] font-bold">Premium</h3>
                <span className="bg-[#4b6ffe]/20 text-[#4b6ffe] text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <FaStar size={10} /> Popular
                </span>
              </div>
              <p className="text-zinc-400 text-[14px] mt-1">For the true data science enthusiasts</p>
            </div>
            <div className="text-right">
              <span className="text-white text-[32px] font-bold">€8</span>
              <span className="text-zinc-500 text-[14px]">/year</span>
            </div>
          </div>

          <div className="flex-1">
            <ul className="flex flex-col gap-4 mt-6 mb-8">
              <li className="flex items-start gap-3 text-[15px] text-white font-medium">
                <FaCheck className="text-[#4b6ffe] mt-1 shrink-0" size={14} />
                <span>Everything in Standard</span>
              </li>
              <li className="flex items-start gap-3 text-[15px] text-zinc-300">
                <FaCheck className="text-white mt-1 shrink-0" size={14} />
                <span><strong className="text-white">Exclusive PMDS Gadget</strong> (Hat or T-Shirt)</span>
              </li>
              <li className="flex items-start gap-3 text-[15px] text-zinc-300">
                <FaCheck className="text-white mt-1 shrink-0" size={14} />
                <span>Priority access to limited-seat Workshops</span>
              </li>
              <li className="flex items-start gap-3 text-[15px] text-zinc-300">
                <FaCheck className="text-white mt-1 shrink-0" size={14} />
                <span>Exclusive networking sessions with Partners</span>
              </li>
            </ul>
          </div>

          <button className="w-full py-4 rounded-xl bg-[#4b6ffe] text-white font-semibold hover:bg-[#3f5fdf] transition-colors mt-auto shadow-[0_0_20px_rgba(75,111,254,0.3)] hover:shadow-[0_0_30px_rgba(75,111,254,0.5)]">
            Go Premium
          </button>
        </div>

      </div>
      
      {/* FAQ / Info Section */}
      <div className="max-w-[800px] mx-auto px-6 w-full mt-32">
        <h2 className="text-[28px] font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
            <h4 className="text-white font-medium text-[16px] mb-2">What does it mean to be a member?</h4>
            <p className="text-zinc-400 text-[14px] leading-relaxed">
              Membership gives you exclusive access to hands-on workshops, internal data science projects, and company visits. You stop being a spectator and become an active builder in our community.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
            <h4 className="text-white font-medium text-[16px] mb-2">Do members have decision rights?</h4>
            <p className="text-zinc-400 text-[14px] leading-relaxed">
              Yes! Every official member has full voting rights in the General Assembly. You can vote on the budget, propose new initiatives, and directly shape the future of PMDS.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
            <h4 className="text-white font-medium text-[16px] mb-2">Who can become a member?</h4>
            <p className="text-zinc-400 text-[14px] leading-relaxed">
              Membership is strictly reserved for current <strong className="text-white">BSc, MSc, and PhD students enrolled at Politecnico di Milano</strong>. External students or professionals cannot officially join the association.
            </p>
          </div>
          
          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
            <h4 className="text-white font-medium text-[16px] mb-2">How do I verify my status?</h4>
            <p className="text-zinc-400 text-[14px] leading-relaxed">
              During the registration process, you will be required to sign up using your official institutional email (<em>@mail.polimi.it</em> or <em>@polimi.it</em>). This automatically verifies your eligibility.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
            <h4 className="text-white font-medium text-[16px] mb-2">How do I get my gadget?</h4>
            <p className="text-zinc-400 text-[14px] leading-relaxed">
              If you choose the Premium tier, you can pick up your exclusive PMDS gadget at any of our in-person events or during our designated pick-up days on campus.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
            <h4 className="text-white font-medium text-[16px] mb-2">How long is the membership valid?</h4>
            <p className="text-zinc-400 text-[14px] leading-relaxed">
              The membership is valid for the current academic year and typically expires at the end of the summer session. You will need to renew it each year.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
