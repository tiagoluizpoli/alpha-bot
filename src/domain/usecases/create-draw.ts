import { Draw, Either, UnknownError, User } from '@/domain';

export interface CreateDrawProps {
  teams: string[];
  createdBy: User;
}
export type CreateDrawPossibleErrors = UnknownError;
export interface ICreateDraw {
  execute: (props: CreateDrawProps) => Promise<Either<CreateDrawPossibleErrors, Draw>>;
}
