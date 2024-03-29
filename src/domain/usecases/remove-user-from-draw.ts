import { IGetDrawByIdReository, IUpdateDrawReository } from '@/application';
import { Draw, DrawNotFoundError, Either, User, UserNotFoundInDrawEventError } from '@/domain';

export interface RemoveUserFromDrawProps {
  drawId: string;
  user: User;
}
export type RemoveUserFromDrawPossibleErrors = DrawNotFoundError | UserNotFoundInDrawEventError;
export type RemoveUserFromDrawRepositories = IGetDrawByIdReository & IUpdateDrawReository;

export interface IRemoveUserFromDraw {
  execute: (
    props: RemoveUserFromDrawProps,
  ) => Promise<Either<RemoveUserFromDrawPossibleErrors, Draw>>;
}
