import { DrawNotFoundError, Either } from '@/domain';
import { IGetDrawByIdReository, IUpdateDrawReository } from '@/application';

export interface SetChannelIdInDrawProps {
  drawId: string;
  channelId: string;
}

export type SetChannelIdInDrawPossibleErrors = DrawNotFoundError;

export type SetChannelIdInDrawRepositories = IGetDrawByIdReository & IUpdateDrawReository;

export interface ISetMessageIdInDraw {
  execute: (
    props: SetChannelIdInDrawProps,
  ) => Promise<Either<SetChannelIdInDrawPossibleErrors, void>>;
}
