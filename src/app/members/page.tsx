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
    <div className="relative z-10 mx-auto flex min-h-[calc(100vh-200px)] w-full max-w-[1100px] flex-col gap-16 px-6 pt-30">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <h1 className="type-heading text-foreground">Members</h1>
        <p className="max-w-[600px] type-body text-foreground-secondary">
          Meet the minds behind Polimi Data Scientists.
        </p>
      </div>

      {/* Teams Container */}
      <div className="flex flex-col gap-16">
        {teams.map((team, teamIndex) => (
          <div key={team.id} className="flex flex-col gap-8">
            <div className="flex flex-col justify-between gap-4 border-b pb-4 md:flex-row md:items-end">
              <h2 className="type-heading text-foreground">{team.name}</h2>
              {team.email && (
                <a
                  href={`mailto:${team.email}`}
                  className="flex items-center gap-2 type-body text-foreground-secondary transition-colors hover:text-foreground"
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
