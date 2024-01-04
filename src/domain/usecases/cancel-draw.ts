import { IGetDrawByIdReository, IRemoveDrawReository } from '@/application';
import { DrawNotFoundError, Either } from '@/domain';

export interface CancelDrawProps {
  drawId: string;
}
export type CancelDrawPossibleErrors = DrawNotFoundError;
export type CancelDrawRepositories = IGetDrawByIdReository & IRemoveDrawReository;
export interface ICancelDraw {
  execute: (props: CancelDrawProps) => Promise<Either<CancelDrawPossibleErrors, void>>;
}
