import { Draw } from '@/domain';

const messageNames = ['display-draw-state'] as const;
type MessageNames = (typeof messageNames)[number];

export const messageMapper: Record<MessageNames, (props: any) => string | string> = {
  'display-draw-state': (draw: Draw): string => {
    return `teams: \n${draw.teams
      .map(
        (team) =>
          `${team.name}: [ ${team.users
            .getItems()
            .map((user) => user.displayName)
            .join(',')} ]`,
      )
      .join()}\nusers: ${draw.users
      .getItems()
      .map((user) => user.userName)
      .join(', ')}`;
  },
};
