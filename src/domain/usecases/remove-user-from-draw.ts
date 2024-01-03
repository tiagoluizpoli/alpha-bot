import { Draw, DrawNotFoundError, Either } from '@/domain';

export interface RemoveUserFromDrawProps {
  drawId: string;
  userId: string;
}
export type RemoveUserFromDrawPossibleErrors = DrawNotFoundError;
export interface IRemoveUserFromDraw {
  execute: (
    props: RemoveUserFromDrawProps,
  ) => Promise<Either<RemoveUserFromDrawPossibleErrors, Draw>>;
}
