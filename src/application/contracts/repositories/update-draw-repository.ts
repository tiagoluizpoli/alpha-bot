import { Draw, Either, UnknownError } from '@/domain';

export interface IUpdateDrawReository {
  update: (draw: Draw) => Promise<Either<UnknownError, Draw>>;
}
