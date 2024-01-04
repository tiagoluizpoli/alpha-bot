import { Draw, Either, UnknownError } from '@/domain';

export interface IDrawReository {
  create: (draw: Draw) => Promise<Either<UnknownError, Draw>>;
  update: (draw: Draw) => Promise<Either<UnknownError, Draw>>;
  remove: (drawId: string) => Promise<Either<UnknownError, void>>;
  getById: (drawId: string) => Promise<Either<UnknownError, Draw | undefined>>;
}
