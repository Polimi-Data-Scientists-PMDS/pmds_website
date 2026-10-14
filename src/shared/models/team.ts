import type { Member } from './member';

export interface Team {
  id: string;
  name: string;
  email?: string;
  members: Member[];
}
