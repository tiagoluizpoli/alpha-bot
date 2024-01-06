import {
  CreateDrawProps,
  Draw,
  Either,
  ICreateDraw,
  left,
  right,
  Team,
  UnknownError,
  Users,
} from '@/domain';
import { ICreateDrawReository } from '@/application';

export class CreateDraw implements ICreateDraw {
  constructor(private readonly createdrawRepository: ICreateDrawReository) {}

  execute = async ({ teams, createdBy }: CreateDrawProps): Promise<Either<UnknownError, Draw>> => {
    const draw = Draw.create({
      users: Users.create([createdBy]),
      teams: teams.map((team) =>
        Team.create({
          name: team,
          users: Users.create(),
        }),
      ),
      createdBy,
    });

    const createdDrawResult = await this.createdrawRepository.create(draw);

    if (createdDrawResult.isLeft()) {
      return left(createdDrawResult.value);
    }

    return right(createdDrawResult.value);
  };
}
