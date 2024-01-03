import { IDrawReository } from '@/application';
import {
  Draw,
  DrawNotFoundError,
  Either,
  IRemoveUserFromDraw,
  left,
  RemoveUserFromDrawProps,
  right,
  UserNotFoundInDrawEventError,
} from '@/domain';

export class RemoveUserFromDraw implements IRemoveUserFromDraw {
  constructor(private readonly drawRepository: IDrawReository) {}

  execute = async ({
    drawId,
    user,
  }: RemoveUserFromDrawProps): Promise<Either<DrawNotFoundError, Draw>> => {
    const drawResult = await this.drawRepository.getById(drawId);

    if (drawResult.isLeft()) {
      return left(drawResult.value);
    }

    const draw = drawResult.value;

    draw.users.remove(user);

    if (draw.users.getRemovedItems().length === 0) {
      return left(new UserNotFoundInDrawEventError());
    }

    const updateDrawResult = await this.drawRepository.update(draw);
    if (updateDrawResult.isLeft()) {
      return left(updateDrawResult.value);
    }

    return right(updateDrawResult.value);
  };
}
