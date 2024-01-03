import { DrawNotFoundError, Either } from '@/domain';

export interface CancelDrawProps {
  drawId: string;
}
export type CancelDrawPossibleErrors = DrawNotFoundError;
export interface ICancelDraw {
  execute: (props: CancelDrawProps) => Promise<Either<CancelDrawPossibleErrors, void>>;
}
