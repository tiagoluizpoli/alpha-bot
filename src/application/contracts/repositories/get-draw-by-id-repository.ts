import { Draw, Either, UnknownError } from '@/domain';

export interface IGetDrawByIdReository {
  execute: (drawId: string) => Promise<Either<UnknownError, Draw | undefined>>;
}
