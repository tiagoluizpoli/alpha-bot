import { Draw } from '@/domain';

export interface DrawTeamsProps {
  drawId: string;
}

export interface IDrawTeams {
  execute: (props: DrawTeamsProps) => Promise<Draw>;
}
