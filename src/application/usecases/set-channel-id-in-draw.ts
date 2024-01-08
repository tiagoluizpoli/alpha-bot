import {
  DrawNotFoundError,
  Either,
  ISetMessageIdInDraw,
  left,
  right,
  SetChannelIdInDrawPossibleErrors,
  SetChannelIdInDrawProps,
  SetChannelIdInDrawRepositories,
} from '@/domain';

export class SetChannelIdInDraw implements ISetMessageIdInDraw {
  constructor(private readonly repository: SetChannelIdInDrawRepositories) {}

  execute = async ({
    drawId,
    channelId,
  }: SetChannelIdInDrawProps): Promise<Either<SetChannelIdInDrawPossibleErrors, void>> => {
    const drawResult = await this.repository.getById(drawId);
    if (drawResult.isLeft()) {
      return left(drawResult.value);
    }

    const draw = drawResult.value;
    if (!draw) {
      return left(new DrawNotFoundError());
    }

    draw.channelId = channelId;

    const updateDrawResult = await this.repository.update(draw);
    if (updateDrawResult.isLeft()) {
      return left(updateDrawResult.value);
    }

    return right(undefined);
  };
}
