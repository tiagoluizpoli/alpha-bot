import {
  Draw,
  DrawNotFoundError,
  DrawTeamsProps,
  Either,
  IDrawTeams,
  InvalidTeamCountError,
  left,
  right,
  Team,
  User,
} from '@/domain';
import { IDrawReository } from '@/application';

export class DrawTeams implements IDrawTeams {
  constructor(private readonly drawRepository: IDrawReository) {}
  execute = async ({ drawId }: DrawTeamsProps): Promise<Either<DrawNotFoundError, Draw>> => {
    const drawResult = await this.drawRepository.getById(drawId);
    if (drawResult.isLeft()) {
      return left(drawResult.value);
    }

    const draw = drawResult.value;
    if (!draw) {
      return left(new DrawNotFoundError());
    }

    const users = draw.users.getItems();
    const teamsResult = this.randomTeamDraw(users, draw.teams);
    if (teamsResult.isLeft()) {
      return left(teamsResult.value);
    }

    const teams = teamsResult.value;

    draw.teams = teams;

    return right(draw);
  };

  private readonly randomTeamDraw = (
    users: User[],
    teams: Team[],
  ): Either<InvalidTeamCountError, Team[]> => {
    if (teams.length <= 0 || teams.length > users.length) {
      return left(new InvalidTeamCountError());
    }

    const shuffledUsers = users.sort(() => Math.random() - 0.5);

    shuffledUsers.forEach((user, index) => {
      const teamIndex = index % teams.length;
      teams[teamIndex].users.add(user);
    });

    return right(teams);
  };
}
