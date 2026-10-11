import { getTeams } from '@/shared/lib/notion';
import { Metadata } from 'next';
import { FaEnvelope } from 'react-icons/fa';
import MemberCard from './_components/MemberCard';

export const metadata: Metadata = {
  title: 'Members',
};

export default async function MembersPage() {
  const teams = await getTeams();

  return (
    <div className="relative z-10 mx-auto mb-24 flex min-h-[calc(100vh-200px)] w-full max-w-[1100px] flex-col px-6 pt-20">
      {/* Header */}
      <div className="mt-10 mb-16">
        <h1 className="text-6xl leading-snug font-bold text-foreground">
          Members
        </h1>
        <p className="mt-4 max-w-[600px] text-base leading-relaxed text-muted">
          Meet the minds behind Polimi Data Scientists.
        </p>
      </div>

      {/* Teams Container */}
      <div className="flex flex-col gap-16">
        {teams.map((team, teamIndex) => (
          <div key={team.id} className="flex flex-col">
            <div className="mb-8 flex flex-col justify-between gap-4 border-b pb-4 md:flex-row md:items-end">
              <h2 className="text-3xl font-bold text-foreground">
                {team.name}
              </h2>
              {team.email && (
                <a
                  href={`mailto:${team.email}`}
                  className="flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-secondary"
                >
                  <FaEnvelope /> {team.email}
                </a>
              )}
            </div>

            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-6 md:grid-cols-5 lg:grid-cols-6">
              {team.members.map((member, index) => (
                <MemberCard
                  key={`${team.id}-${member.id}-${index}`}
                  member={member}
                  priority={teamIndex === 0 && index < 6}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
