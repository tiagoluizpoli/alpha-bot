import { IGetDrawByIdReository, IRemoveDrawReository, IUpdateDrawReository } from '@/application';
import {
  Draw,
  DrawNotFoundError,
  Either,
  InvalidTeamCountError,
  User,
  UserNotDrawCreatorOrAdminError,
} from '@/domain';

export interface DrawTeamsProps {
  drawId: string;
  isAdmin: boolean;
  user: User;
}
export type DrawTeamsPossibleErrors =
  | DrawNotFoundError
  | InvalidTeamCountError
  | UserNotDrawCreatorOrAdminError;
export type DrawTeamsRepositories = IGetDrawByIdReository &
  IUpdateDrawReository &
  IRemoveDrawReository;
export interface IDrawTeams {
  execute: (props: DrawTeamsProps) => Promise<Either<DrawTeamsPossibleErrors, Draw>>;
}
