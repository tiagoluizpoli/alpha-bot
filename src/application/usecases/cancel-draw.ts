import {
  CancelDrawPossibleErrors,
  CancelDrawProps,
  CancelDrawRepositories,
  DrawNotFoundError,
  Either,
  ICancelDraw,
  left,
  right,
  UserNotDrawCreatorOrAdminError,
} from '@/domain';

export class CancelDraw implements ICancelDraw {
  constructor(private readonly repositories: CancelDrawRepositories) {}

  execute = async ({
    drawId,
    isAdmin,
    user,
  }: CancelDrawProps): Promise<Either<CancelDrawPossibleErrors, void>> => {
    const drawResult = await this.repositories.getById(drawId);
    if (drawResult.isLeft()) {
      return left(drawResult.value);
    }

    const draw = drawResult.value;
    if (!draw) {
      return left(new DrawNotFoundError());
    }

    if (!isAdmin && draw.createdBy.id !== user.id) {
      return left(new UserNotDrawCreatorOrAdminError());
    }

    const removeDrawResult = await this.repositories.remove(drawId);

    if (removeDrawResult.isLeft()) {
      return left(removeDrawResult.value);
    }

    return right(undefined);
  };
}
