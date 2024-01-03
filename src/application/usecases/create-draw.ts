import { CreateDrawProps, Draw, Either, ICreateDraw, left, right, UnknownError } from '@/domain';
import { IDrawReository } from '@/application';

export class CreateDraw implements ICreateDraw {
  constructor(private readonly drawRepository: IDrawReository) {}

  execute = async ({
    teams,
    users,
    createdBy,
  }: CreateDrawProps): Promise<Either<UnknownError, Draw>> => {
    const draw = Draw.create({
      users,
      teams,
      createdBy,
    });

    const createdDrawResult = await this.drawRepository.create(draw);

    if (createdDrawResult.isLeft()) {
      return left(createdDrawResult.value);
    }

    return right(createdDrawResult.value);
  };
}
