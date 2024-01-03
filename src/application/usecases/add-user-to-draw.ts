import {
  AddUserToDrawProps,
  Draw,
  DrawNotFoundError,
  Either,
  IAddUserToDraw,
  left,
  right,
} from '@/domain';
import { IDrawReository } from '@/application';

export class AddUserToDraw implements IAddUserToDraw {
  constructor(private readonly drawRepository: IDrawReository) {}
  execute = async ({
    drawId,
    user,
  }: AddUserToDrawProps): Promise<Either<DrawNotFoundError, Draw>> => {
    const drawResult = await this.drawRepository.getById(drawId);
    if (drawResult.isLeft()) {
      return left(drawResult.value);
    }

    const draw = drawResult.value;

    draw.users?.add(user);

    const updateDrawResult = await this.drawRepository.update(draw);
    if (updateDrawResult.isLeft()) {
      return left(updateDrawResult.value);
    }

    return right(updateDrawResult.value);
  };
}
