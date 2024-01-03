import { Draw, Either, UnknownError } from '@/domain';

export interface IDrawReository {
  create: (draw: Draw) => Promise<Either<UnknownError, Draw>>;
  update: (draw: Draw) => Promise<Either<UnknownError, Draw>>;
  getById: (drawId: string) => Promise<Either<UnknownError, Draw>>;
}
