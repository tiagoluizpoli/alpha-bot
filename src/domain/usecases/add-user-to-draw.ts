import { Draw, DrawNotFoundError, Either, User } from '@/domain';

export interface AddUserToDrawProps {
  drawId: string;
  user: User;
}

export type AddUserToDrawPossibleErrors = DrawNotFoundError;

export interface IAddUserToDraw {
  execute: (props: AddUserToDrawProps) => Promise<Either<AddUserToDrawPossibleErrors, Draw>>;
}
