import { IGetDrawByIdReository, IUpdateDrawReository } from '@/application';
import {
  Draw,
  DrawNotFoundError,
  Either,
  IRemoveUserFromDraw,
  left,
  RemoveUserFromDrawPossibleErrors,
  RemoveUserFromDrawProps,
  right,
  UserNotFoundInDrawEventError,
} from '@/domain';

export class RemoveUserFromDraw implements IRemoveUserFromDraw {
  constructor(
    private readonly getDrawByIdRepository: IGetDrawByIdReository,
    private readonly updateDrawRepository: IUpdateDrawReository,
  ) {}

  execute = async ({
    drawId,
    user,
  }: RemoveUserFromDrawProps): Promise<Either<RemoveUserFromDrawPossibleErrors, Draw>> => {
    const drawResult = await this.getDrawByIdRepository.execute(drawId);

    if (drawResult.isLeft()) {
      return left(drawResult.value);
    }

    const draw = drawResult.value;

    if (!draw) {
      return left(new DrawNotFoundError());
    }

    draw.users.remove(user);

    if (draw.users.getRemovedItems().length === 0) {
      return left(new UserNotFoundInDrawEventError());
    }

    const updateDrawResult = await this.updateDrawRepository.execute(draw);
    if (updateDrawResult.isLeft()) {
      return left(updateDrawResult.value);
    }

    return right(updateDrawResult.value);
  };
}
