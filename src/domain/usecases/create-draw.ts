import { Draw, Either, Team, UnknownError, User } from '@/domain';

export interface CreateDrawProps {
  teams: Team[];
  users: User[];
  createdBy: User;
}
export type CreateDrawPossibleErrors = UnknownError;
export interface ICreateDraw {
  execute: (props: CreateDrawProps) => Promise<Either<CreateDrawPossibleErrors, Draw>>;
}
