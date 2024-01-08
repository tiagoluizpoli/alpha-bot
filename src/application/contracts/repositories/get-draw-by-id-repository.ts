import { Draw, Either, UnknownError } from '@/domain';

export interface IGetDrawByIdReository {
  getById: (drawId: string) => Promise<Either<UnknownError, Draw | undefined>>;
}
