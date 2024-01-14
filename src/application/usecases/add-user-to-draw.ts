import {
  AddUserToDrawPossibleErrors,
  AddUserToDrawProps,
  AddUserToDrawRepositories,
  Draw,
  DrawNotFoundError,
  Either,
  IAddUserToDraw,
  left,
  right,
  UserAlreadyInDrawEventError,
} from '@/domain';

export class AddUserToDraw implements IAddUserToDraw {
  constructor(private readonly repository: AddUserToDrawRepositories) {}

  execute = async ({
    drawId,
    user,
  }: AddUserToDrawProps): Promise<Either<AddUserToDrawPossibleErrors, Draw>> => {
    const drawResult = await this.repository.getById(drawId);
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

    const updateDrawResult = await this.repository.update(draw);
    if (updateDrawResult.isLeft()) {
      return left(updateDrawResult.value);
    }

    return right(updateDrawResult.value);
  };
}
