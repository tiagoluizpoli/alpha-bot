import { IDrawReository } from '@/application';
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
  constructor(private readonly drawRepository: IDrawReository) {}

  execute = async ({
    drawId,
  }: CancelDrawProps): Promise<Either<CancelDrawPossibleErrors, void>> => {
    const drawResult = await this.drawRepository.getById(drawId);
    if (drawResult.isLeft()) {
      return left(drawResult.value);
    }

    const draw = drawResult.value;
    if (!draw) {
      return left(new DrawNotFoundError());
    }

    const removeDrawResult = await this.drawRepository.remove(drawId);

    if (removeDrawResult.isLeft()) {
      return left(removeDrawResult.value);
    }

    return right(undefined);
  };
}
