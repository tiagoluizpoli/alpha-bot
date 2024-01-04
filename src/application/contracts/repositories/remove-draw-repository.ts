import { Either, UnknownError } from '@/domain';

export interface IRemoveDrawReository {
  execute: (drawId: string) => Promise<Either<UnknownError, void>>;
}
