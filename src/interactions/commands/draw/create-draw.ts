import { ApplicationCommandOptionType, ApplicationCommandType, Collection } from 'discord.js';

import { joinRow } from './buttons/buttons';

import { Command } from '@/interactions/components';
import { makeCreateDraw } from '@/main/factories';
import { User } from '@/domain';

export default new Command({
  name: 'create-draw',
  description: 'Cria um novo sorteio de usuários',
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'teams',
      description: 'Teams separated by commas ","',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  run: async ({ interaction, options }) => {
    if (!interaction.isChatInputCommand()) return;

    const { username, displayName, id } = interaction.user;

    const createDraw = makeCreateDraw();

    const teams = options.getString('teams', true);
    const splittedTeams = teams.trim().split(',');

    if (splittedTeams.length < 2) {
      await interaction.reply({ content: 'The minimum amount of teams is 2' });
      return;
    }

    const drawResult = await createDraw.execute({
      teams: splittedTeams,
      createdBy: User.create(
        {
          userName: username,
          displayName,
        },
        id,
      ),
    });

    if (drawResult.isLeft()) {
      await interaction.reply({ content: drawResult.value.message });
      return;
    }

    const draw = drawResult.value;

    await interaction.reply({
      content: `teams: ${draw.teams.map((team) => team.name).join(', ')} \n users: ${draw.users
        .getItems()
        .map((user) => user.userName)
        .join(', ')}`,
      components: [joinRow],
    });
  },
  buttons: new Collection([
    [
      'join-button',
      async (buttonInteraction) => {
        const { user } = buttonInteraction;
        await buttonInteraction.update({
          content: `updated ${user.username}`,
          components: [],
        });
      },
    ],
  ]),
});
