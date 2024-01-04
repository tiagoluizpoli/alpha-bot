import { Either, UnknownError } from '@/domain';

export interface IRemoveDrawReository {
  remove: (drawId: string) => Promise<Either<UnknownError, void>>;
}
