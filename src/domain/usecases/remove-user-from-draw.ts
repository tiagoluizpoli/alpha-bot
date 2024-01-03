import { Draw } from '@/domain';

export interface RemoveUserFromDrawProps {
  drawId: string;
  userId: string;
}

export interface IRemoveUserFromDraw {
  execute: (props: RemoveUserFromDrawProps) => Promise<Draw>;
}
