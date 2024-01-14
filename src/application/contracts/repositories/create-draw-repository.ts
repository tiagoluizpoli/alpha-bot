import { Draw, Either, UnknownError } from '@/domain';

export interface ICreateDrawReository {
  create: (draw: Draw) => Promise<Either<UnknownError, Draw>>;
}
