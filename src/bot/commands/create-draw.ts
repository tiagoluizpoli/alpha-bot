import {
  ActionRowBuilder,
  ApplicationCommandOptionType,
  ApplicationCommandType,
  ButtonBuilder,
  ButtonInteraction,
  CacheType,
  Collection,
} from 'discord.js';

import { Command, CommandType, ICommandBuilder } from '../core';

import { messageMapper } from './helpers/message-mapper';
import { mapUserDicordToEntity } from './helpers/draw-mappers';
import { joinButton, leaveButton } from './buttons/buttons';

import { IAddUserToDraw, ICreateDraw } from '@/domain';

export class CreateDrawCommand implements ICommandBuilder {
  constructor(
    private readonly createDraw: ICreateDraw,
    private readonly addUserToDraw: IAddUserToDraw,
  ) {}

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
          try {
            if (!interaction.isChatInputCommand()) return;

            const teams = options.getString('teams', true);
            const splittedTeams = teams.trim().split(',');

            if (splittedTeams.length < 2) {
              await interaction.reply({ content: 'The minimum amount of teams is 2' });
              return;
            }

            const { user, channelId } = interaction;

            const drawResult = await this.createDraw.execute({
              id: channelId,
              teams: splittedTeams,
              createdBy: mapUserDicordToEntity(user),
            });

            if (drawResult.isLeft()) {
              await interaction.reply({ content: drawResult.value.message });
              return;
            }

            const draw = drawResult.value;

            const joinRow = new ActionRowBuilder<ButtonBuilder>({
              components: [joinButton, leaveButton],
            });

            await interaction.reply({
              content: messageMapper['display-draw-state'](draw),
              components: [joinRow],
            });
          } catch (error) {
            console.error(error);
          }
        },
        buttons: new Collection([
          ['join-button', this.joinButton],
          ['leave-button', (buttonInteraction) => {}],
        ]),
      }),
    );
  };

  private readonly joinButton = async (
    buttonInteraction: ButtonInteraction<CacheType>,
  ): Promise<any> => {
    try {
      const { user, channelId } = buttonInteraction;

      const drawResult = await this.addUserToDraw.execute({
        drawId: channelId,
        user: mapUserDicordToEntity(user),
      });

      if (drawResult.isLeft()) {
        await buttonInteraction.reply({
          ephemeral: true,
          content: drawResult.value.message,
        });
        return;
      }
      const joinRow = new ActionRowBuilder<ButtonBuilder>({
        components: [joinButton, leaveButton],
      });
      const draw = drawResult.value;
      await buttonInteraction.update({
        content: messageMapper['display-draw-state'](draw),
        components: [joinRow],
      });
    } catch (error) {
      console.error(error);
    }
  };
}
