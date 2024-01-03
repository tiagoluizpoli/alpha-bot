import { Draw, Either, UnknownError } from '@/domain';

export interface IDrawReository {
  create: (draw: Draw) => Promise<Either<UnknownError, Draw>>;
}
