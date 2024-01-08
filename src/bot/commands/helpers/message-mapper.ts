import { Draw } from '@/domain';

const messageNames = ['display-draw-state'] as const;
type MessageNames = (typeof messageNames)[number];

export const messageMapper: Record<MessageNames, (props: any) => string | string> = {
  'display-draw-state': (draw: Draw): string => {
    return `teams: ${draw.teams.map((team) => team.name).join(', ')} \n users: ${draw.users
      .getItems()
      .map((user) => user.userName)
      .join(', ')}`;
  },
};
