import { Draw, Either, UnknownError } from '@/domain';

export interface IGetDrawByMessageIdReository {
  getByMessageId: (messageId: string) => Promise<Either<UnknownError, Draw | undefined>>;
}
