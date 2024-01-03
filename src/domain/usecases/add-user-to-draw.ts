import { Draw, User } from '@/domain';

export interface AddUserToDrawProps {
  drawId: string;
  user: User;
}

export interface IAddUserToDraw {
  execute: (props: AddUserToDrawProps) => Promise<Draw>;
}
