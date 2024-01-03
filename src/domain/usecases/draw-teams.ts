import { Draw, DrawNotFoundError, Either } from '@/domain';

export interface DrawTeamsProps {
  drawId: string;
}
export type DrawTeamsPossibleErrors = DrawNotFoundError;
export interface IDrawTeams {
  execute: (props: DrawTeamsProps) => Promise<Either<DrawTeamsPossibleErrors, Draw>>;
}
