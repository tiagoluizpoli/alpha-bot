import { Draw, Team, User } from '@/domain';

export interface CreateDrawProps {
  teams: Team[];
  users: User[];
}

export interface ICreateDraw {
  execute: (props: CreateDrawProps) => Promise<Draw>;
}
