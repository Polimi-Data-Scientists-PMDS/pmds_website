import { Metadata } from "next";
import { getTeams } from "@/lib/notion";
import { FaEnvelope } from "react-icons/fa";
import MemberCard from "@/components/MemberCard";

export const metadata: Metadata = {
  title: "Members",
};

export const revalidate = 3600;

export default async function MembersPage() {
  const teams = await getTeams();

  return (
    <div className="flex flex-col min-h-[calc(100vh-200px)] pt-20 relative z-10 w-full max-w-[1100px] mx-auto px-6 mb-24">
      
      {/* Header */}
      <div className="mb-16 mt-10">
        <h1 className="text-[56px] font-[700] text-white leading-snug">Members</h1>
        <p className="text-[16px] text-zinc-400 max-w-[600px] mt-4 leading-relaxed">
          Meet the minds behind Polimi Data Scientists.
        </p>
      </div>

      {/* Teams Container */}
      <div className="flex flex-col gap-16">
        {teams.map((team, teamIndex) => (
          <div key={team.id} className="flex flex-col">
            <div className="mb-8 border-b border-white/10 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <h2 className="text-[32px] font-bold text-white">{team.name}</h2>
              {team.email && (
                <a href={`mailto:${team.email}`} className="text-[#4b6ffe] hover:text-white transition-colors text-[15px] font-medium flex items-center gap-2">
                  <FaEnvelope /> {team.email}
                </a>
              )}
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-6">
              {team.members.map((member, index) => (
                <MemberCard key={`${team.id}-${member.id}-${index}`} member={member} priority={teamIndex === 0 && index < 6} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
