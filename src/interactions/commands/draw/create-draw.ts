import { ApplicationCommandType } from 'discord.js';

import { Command } from '@/interactions/components';
import { makeCreateDraw } from '@/main/factories';
import { Team, User, Users } from '@/domain';

export default new Command({
  name: 'create-draw',
  description: 'Cria um novo sorteio de usuários',
  type: ApplicationCommandType.ChatInput,

  run: async ({ interaction }) => {
    if (!interaction.isChatInputCommand()) return;

    const { username, displayName, id } = interaction.user;

    const createDraw = makeCreateDraw();

    const drawResult = await createDraw.execute({
      teams: [
        Team.create({
          name: 'Japorongas',
          users: Users.create(),
        }),
        Team.create({
          name: 'Minhocudos',
          users: Users.create(),
        }),
      ],
      createdBy: User.create(
        {
          userName: username,
          displayName,
          joinedAt: new Date(),
        },
        id,
      ),
      users: [],
    });

    if (drawResult.isLeft()) {
      await interaction.reply({ content: drawResult.value.message });
      return;
    }

    const draw = drawResult.value;

    await interaction.reply({ content: draw.teams.map((team) => team.name).join('\n') });
  },
});
