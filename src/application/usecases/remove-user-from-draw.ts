import {
  Draw,
  DrawCreatorCannotBeRemovedError,
  DrawNotFoundError,
  Either,
  IRemoveUserFromDraw,
  left,
  RemoveUserFromDrawPossibleErrors,
  RemoveUserFromDrawProps,
  RemoveUserFromDrawRepositories,
  right,
  UserNotFoundInDrawEventError,
} from '@/domain';

export class RemoveUserFromDraw implements IRemoveUserFromDraw {
  constructor(private readonly repositories: RemoveUserFromDrawRepositories) {}

  execute = async ({
    drawId,
    user,
  }: RemoveUserFromDrawProps): Promise<Either<RemoveUserFromDrawPossibleErrors, Draw>> => {
    const drawResult = await this.repositories.getById(drawId);

    if (drawResult.isLeft()) {
      return left(drawResult.value);
    }

    const draw = drawResult.value;

    if (!draw) {
      return left(new DrawNotFoundError());
    }

    if (user.userName === draw.createdBy.userName) {
      return left(new DrawCreatorCannotBeRemovedError());
    }

    draw.users.remove(user);

    if (draw.users.getRemovedItems().length === 0) {
      return left(new UserNotFoundInDrawEventError());
    }

    const updateDrawResult = await this.repositories.update(draw);
    if (updateDrawResult.isLeft()) {
      return left(updateDrawResult.value);
    }

    return right(updateDrawResult.value);
  };
}
