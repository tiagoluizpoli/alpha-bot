import { ICreateDrawReository, IGetDrawByIdReository } from '@/application';
import { Draw, Either, UnknownError, User } from '@/domain';

export interface CreateDrawProps {
  id: string;
  teams: string[];
  createdBy: User;
}
export type CreateDrawPossibleErrors = UnknownError;
export type CreateDrawRepositories = IGetDrawByIdReository & ICreateDrawReository;

export interface ICreateDraw {
  execute: (props: CreateDrawProps) => Promise<Either<CreateDrawPossibleErrors, Draw>>;
}
