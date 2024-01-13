import { Draw, DrawNotFoundError, Either, InvalidTeamCountError } from '@/domain';

export interface DrawTeamsProps {
  drawId: string;
}
export type DrawTeamsPossibleErrors = DrawNotFoundError | InvalidTeamCountError;
export interface IDrawTeams {
  execute: (props: DrawTeamsProps) => Promise<Either<DrawTeamsPossibleErrors, Draw>>;
}