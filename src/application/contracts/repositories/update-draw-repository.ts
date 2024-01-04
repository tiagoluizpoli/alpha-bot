import { Draw, Either, UnknownError } from '@/domain';

export interface IUpdateDrawReository {
  execute: (draw: Draw) => Promise<Either<UnknownError, Draw>>;
}
