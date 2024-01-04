import { Draw, Either, UnknownError } from '@/domain';

export interface ICreateDrawReository {
  execute: (draw: Draw) => Promise<Either<UnknownError, Draw>>;
}
