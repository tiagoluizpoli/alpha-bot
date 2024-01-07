import { ApplicationCommandOptionType, ApplicationCommandType, Collection } from 'discord.js';

import { Command, CommandType, ICommandBuilder } from '../core';

import { joinRow } from './buttons/buttons';

import { ICreateDraw, User } from '@/domain';

export class CreateDrawCommand implements ICommandBuilder {
  constructor(private readonly createDraw: ICreateDraw) {}
  build = (): CommandType => {
    return Object.assign(
      new Command({
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

          const teams = options.getString('teams', true);
          const splittedTeams = teams.trim().split(',');

          if (splittedTeams.length < 2) {
            await interaction.reply({ content: 'The minimum amount of teams is 2' });
            return;
          }

          const drawResult = await this.createDraw.execute({
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
            content: `teams: ${draw.teams
              .map((team) => team.name)
              .join(', ')} \n users: ${draw.users
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
      }),
    );
  };
}
