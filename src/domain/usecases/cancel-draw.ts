import { IGetDrawByIdReository, IRemoveDrawReository } from '@/application';
import { DrawNotFoundError, Either, User, UserNotDrawCreatorOrAdminError } from '@/domain';

export interface CancelDrawProps {
  drawId: string;
  isAdmin: boolean;
  user: User;
}
export type CancelDrawPossibleErrors = DrawNotFoundError | UserNotDrawCreatorOrAdminError;
export type CancelDrawRepositories = IGetDrawByIdReository & IRemoveDrawReository;
export interface ICancelDraw {
  execute: (props: CancelDrawProps) => Promise<Either<CancelDrawPossibleErrors, void>>;
}
