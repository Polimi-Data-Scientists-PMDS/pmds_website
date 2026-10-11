import type { Member } from './member';

export interface Person {
  name: string;
  avatar?: string;
  linkedinUrl?: string;
  email?: string;
}

/** Resolves related member ids into people, skipping ids with no matching member. */
export function resolvePeople(
  ids: string[],
  membersMap: Map<string, Member>,
): Person[] {
  return ids.flatMap((id) => {
    const member = membersMap.get(id);
    return member
      ? [
          {
            name: member.name,
            avatar: member.imageUrl,
            linkedinUrl: member.linkedinUrl,
            email: member.email,
          },
        ]
      : [];
  });
}
