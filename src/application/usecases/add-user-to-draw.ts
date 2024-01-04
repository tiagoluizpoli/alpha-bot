import {
  AddUserToDrawPossibleErrors,
  AddUserToDrawProps,
  Draw,
  DrawNotFoundError,
  Either,
  IAddUserToDraw,
  left,
  right,
  UserAlreadyInDrawEventError,
} from '@/domain';
import { IGetDrawByIdReository, IUpdateDrawReository } from '@/application';

export class AddUserToDraw implements IAddUserToDraw {
  constructor(
    private readonly getDrawByIdRepository: IGetDrawByIdReository,
    private readonly updateDrawRepository: IUpdateDrawReository,
  ) {}

  execute = async ({
    drawId,
    user,
  }: AddUserToDrawProps): Promise<Either<AddUserToDrawPossibleErrors, Draw>> => {
    const drawResult = await this.getDrawByIdRepository.execute(drawId);
    if (drawResult.isLeft()) {
      return left(drawResult.value);
    }

    const draw = drawResult.value;
    if (!draw) {
      return left(new DrawNotFoundError());
    }

    const userAlreadyInDrawEvent = draw.users.exists(user);
    if (userAlreadyInDrawEvent) {
      return left(new UserAlreadyInDrawEventError());
    }

    draw.users.add(user);

    const updateDrawResult = await this.updateDrawRepository.execute(draw);
    if (updateDrawResult.isLeft()) {
      return left(updateDrawResult.value);
    }

    return right(updateDrawResult.value);
  };
}
