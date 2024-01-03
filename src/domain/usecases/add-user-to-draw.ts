import { Draw, DrawNotFoundError, Either, User, UserAlreadyInDrawEventError } from '@/domain';

export interface AddUserToDrawProps {
  drawId: string;
  user: User;
}

export type AddUserToDrawPossibleErrors = DrawNotFoundError | UserAlreadyInDrawEventError;

export interface IAddUserToDraw {
  execute: (props: AddUserToDrawProps) => Promise<Either<AddUserToDrawPossibleErrors, Draw>>;
}
