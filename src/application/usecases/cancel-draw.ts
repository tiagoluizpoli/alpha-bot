import { IGetDrawByIdReository, IRemoveDrawReository } from '@/application';
import {
  CancelDrawPossibleErrors,
  CancelDrawProps,
  DrawNotFoundError,
  Either,
  ICancelDraw,
  left,
  right,
} from '@/domain';

export class CancelDraw implements ICancelDraw {
  constructor(
    private readonly getDrawByIdRepository: IGetDrawByIdReository,
    private readonly removeDrawRepository: IRemoveDrawReository,
  ) {}

  execute = async ({
    drawId,
  }: CancelDrawProps): Promise<Either<CancelDrawPossibleErrors, void>> => {
    const drawResult = await this.getDrawByIdRepository.execute(drawId);
    if (drawResult.isLeft()) {
      return left(drawResult.value);
    }

    const draw = drawResult.value;
    if (!draw) {
      return left(new DrawNotFoundError());
    }

    const removeDrawResult = await this.removeDrawRepository.execute(drawId);

    if (removeDrawResult.isLeft()) {
      return left(removeDrawResult.value);
    }

    return right(undefined);
  };
}
