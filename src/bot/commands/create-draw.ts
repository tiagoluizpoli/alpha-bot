import { ApplicationCommandOptionType, ApplicationCommandType, Collection } from 'discord.js';

import { Command, CommandType, ICommandBuilder } from '../core';

import { joinRow } from './buttons/buttons';
import { messageMapper } from './helpers/message-mapper';

import { Draw, IAddUserToDraw, ICreateDraw, User } from '@/domain';

export class CreateDrawCommand implements ICommandBuilder {
  constructor(
    private readonly createDraw: ICreateDraw,
    private readonly addUserToDraw: IAddUserToDraw,
  ) {}

  build = (): CommandType => {
    let currentDraw: Draw | undefined;
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
          currentDraw = draw;

          await interaction.reply({
            content: messageMapper['display-draw-state'](draw),
            components: [joinRow],
          });
        },
        buttons: new Collection([
          [
            'join-button',
            async (buttonInteraction) => {
              if (!currentDraw) {
                await buttonInteraction.update({
                  content: 'draw not initialized',
                  components: [],
                });
                return;
              }
              const { user } = buttonInteraction;

              const drawResult = await this.addUserToDraw.execute({
                drawId: currentDraw.id,
                user: User.create(
                  {
                    userName: user.username,
                    displayName: user.displayName,
                  },
                  user.id,
                ),
              });

              if (drawResult.isLeft()) {
                await buttonInteraction.reply({
                  ephemeral: true,
                  content: drawResult.value.message,
                });
                return;
              }

              const draw = drawResult.value;
              await buttonInteraction.update({
                content: messageMapper['display-draw-state'](draw),
                components: [joinRow],
              });
            },
          ],
        ]),
      }),
    );
  };
}
