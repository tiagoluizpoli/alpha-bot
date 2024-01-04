import {
  CreateDrawProps,
  Draw,
  Either,
  ICreateDraw,
  left,
  right,
  UnknownError,
  Users,
} from '@/domain';
import { ICreateDrawReository } from '@/application';

export class CreateDraw implements ICreateDraw {
  constructor(private readonly createdrawRepository: ICreateDrawReository) {}

  execute = async ({
    teams,
    users,
    createdBy,
  }: CreateDrawProps): Promise<Either<UnknownError, Draw>> => {
    const draw = Draw.create({
      users: Users.create(users),
      teams,
      createdBy,
    });

    const createdDrawResult = await this.createdrawRepository.create(draw);

    if (createdDrawResult.isLeft()) {
      return left(createdDrawResult.value);
    }

    return right(createdDrawResult.value);
  };
}
