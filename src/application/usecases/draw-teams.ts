import {
  Draw,
  DrawNotFoundError,
  DrawTeamsProps,
  DrawTeamsRepositories,
  Either,
  IDrawTeams,
  InvalidTeamCountError,
  left,
  right,
  Team,
  User,
  UserNotDrawCreatorOrAdminError,
} from '@/domain';

export class DrawTeams implements IDrawTeams {
  constructor(private readonly repository: DrawTeamsRepositories) {}

  execute = async ({
    drawId,
    isAdmin,
    user,
  }: DrawTeamsProps): Promise<Either<DrawNotFoundError, Draw>> => {
    const drawResult = await this.repository.getById(drawId);
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

    const users = draw.users.getItems();
    const teamsResult = this.randomTeamDraw(users, draw.teams);
    if (teamsResult.isLeft()) {
      return left(teamsResult.value);
    }

    const teams = teamsResult.value;

    draw.endDraw(teams);

    await this.repository.remove(draw.id);

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
