import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  ButtonInteraction,
  CacheType,
  Collection,
} from 'discord.js';

import { Command, CommandProps, CommandType, ICommandBuilder } from '../core';

import { messageMapper } from './helpers/message-mapper';
import { mapUserDicordToEntity } from './helpers/draw-mappers';
import { buttonsRow } from './buttons/buttons';

import { IAddUserToDraw, ICancelDraw, ICreateDraw, IRemoveUserFromDraw } from '@/domain';

export class CreateDrawCommand implements ICommandBuilder {
  constructor(
    private readonly createDraw: ICreateDraw,
    private readonly addUserToDraw: IAddUserToDraw,
    private readonly removeUserFromDraw: IRemoveUserFromDraw,
    private readonly cancelDraw: ICancelDraw,
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
        run: this.run,
        buttons: new Collection([
          ['join-button', this.joinButton],
          ['leave-button', this.leaveButton],
          ['cancel-draw-button', this.cancelDrawButton],
        ]),
      }),
    );
  };

  private readonly run = async ({ interaction, options }: CommandProps): Promise<void> => {
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

      await interaction.reply({
        content: messageMapper['display-draw-state'](draw),
        components: [buttonsRow],
      });
    } catch (error) {
      console.error(error);
    }
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

      const draw = drawResult.value;

      await buttonInteraction.update({
        content: messageMapper['display-draw-state'](draw),
        components: [buttonsRow],
      });
    } catch (error) {
      console.error(error);
    }
  };

  private readonly leaveButton = async (
    buttonInteraction: ButtonInteraction<CacheType>,
  ): Promise<any> => {
    try {
      const { user, channelId } = buttonInteraction;

      const drawResult = await this.removeUserFromDraw.execute({
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

      const draw = drawResult.value;
      await buttonInteraction.update({
        content: messageMapper['display-draw-state'](draw),
        components: [buttonsRow],
      });
    } catch (error) {
      console.error(error);
    }
  };

  private readonly cancelDrawButton = async (
    buttonInteraction: ButtonInteraction<CacheType>,
  ): Promise<void> => {
    const { channelId } = buttonInteraction;

    const cancelDrawResult = await this.cancelDraw.execute({
      drawId: channelId,
    });

    if (cancelDrawResult.isLeft()) {
      await buttonInteraction.reply({
        ephemeral: true,
        content: cancelDrawResult.value.message,
      });
    }

    await buttonInteraction.message.delete();
    await buttonInteraction.reply({
      ephemeral: true,
      content: 'draw canceled',
    });
  };
}
