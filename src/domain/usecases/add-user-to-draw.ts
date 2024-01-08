import { IGetDrawByMessageIdReository, IUpdateDrawReository } from '@/application';
import { Draw, DrawNotFoundError, Either, User, UserAlreadyInDrawEventError } from '@/domain';

export interface AddUserToDrawProps {
  channelId: string;
  user: User;
}

export type AddUserToDrawPossibleErrors = DrawNotFoundError | UserAlreadyInDrawEventError;
export type AddUserToDrawRepositories = IGetDrawByMessageIdReository & IUpdateDrawReository;

export interface IAddUserToDraw {
  execute: (props: AddUserToDrawProps) => Promise<Either<AddUserToDrawPossibleErrors, Draw>>;
}
