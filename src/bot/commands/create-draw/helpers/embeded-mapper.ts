import { APIEmbed, APIEmbedField, Colors, EmbedBuilder, JSONEncodable } from 'discord.js';

import { Draw } from '@/domain';

const messageNames = ['display-draw-state'] as const;
type MessageNames = (typeof messageNames)[number];

export const embededMapper: Record<
  MessageNames,
  (props: any) => APIEmbed | JSONEncodable<APIEmbed>
> = {
  'display-draw-state': (draw: Draw): APIEmbed | JSONEncodable<APIEmbed> => {
    const usersFields: APIEmbedField[] = [
      {
        name: 'Times',
        value: draw.teams.map((team) => team.name).join(', '),
      },
      {
        name: 'Usuários',
        value: draw.users
          .getItems()
          .map((user) => `<@${user.id}>`)
          .join(', '),
      },
    ];

    const sortedTeamsFields = draw.drawnAt
      ? draw.teams.map(
          (team): APIEmbedField => ({
            name: team.name,
            value: team.users
              .getItems()
              .map((user) => user.displayName)
              .join(', '),
          }),
        )
      : undefined;

    return new EmbedBuilder({
      color: Colors.DarkNavy,
      title: 'Sorteio de times',
      fields: sortedTeamsFields ?? usersFields,
      footer: {
        text: `Criado por ${draw.createdBy.displayName}\n${
          sortedTeamsFields ? `Realizado em ${draw.drawnAt?.toLocaleString()}` : ''
        }`,
      },
    });
  },
};
