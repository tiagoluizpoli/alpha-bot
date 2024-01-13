import {
  CreateDrawProps,
  CreateDrawRepositories,
  Draw,
  DrawAlreadyExistsError,
  Either,
  ICreateDraw,
  left,
  right,
  Team,
  UnknownError,
  Users,
} from '@/domain';

export class CreateDraw implements ICreateDraw {
  constructor(private readonly repository: CreateDrawRepositories) {}

  execute = async ({
    id,
    teams,
    createdBy,
  }: CreateDrawProps): Promise<Either<UnknownError, Draw>> => {
    const drawExists = await this.repository.getById(id);
    if (drawExists.isLeft()) {
      return left(drawExists.value);
    }

    if (drawExists.value) {
      return left(new DrawAlreadyExistsError());
    }

    const draw = Draw.create(
      {
        users: Users.create([createdBy]),
        teams: teams.map((team) =>
          Team.create({
            name: team,
            users: Users.create(),
          }),
        ),
        createdBy,
      },
      id,
    );

    const createdDrawResult = await this.repository.create(draw);

    if (createdDrawResult.isLeft()) {
      return left(createdDrawResult.value);
    }

    return right(createdDrawResult.value);
  };
}
