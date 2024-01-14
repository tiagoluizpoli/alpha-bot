import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  ButtonInteraction,
  CacheType,
  Collection,
  GuildMember,
  PermissionsBitField,
} from 'discord.js';

import { Command, CommandProps, CommandType, ICommandBuilder } from '../../core';

import { embededMapper } from './helpers/embeded-mapper';
import { mapUserDicordToEntity } from './helpers/draw-mappers';
import { buttonsRow, drawRow } from './buttons/buttons';

import {
  IAddUserToDraw,
  ICancelDraw,
  ICreateDraw,
  IDrawTeams,
  IRemoveUserFromDraw,
} from '@/domain';
import { config } from '@/main/config';

export class CreateDrawCommand implements ICommandBuilder {
  constructor(
    private readonly createDraw: ICreateDraw,
    private readonly addUserToDraw: IAddUserToDraw,
    private readonly removeUserFromDraw: IRemoveUserFromDraw,
    private readonly cancelDraw: ICancelDraw,
    private readonly drawTeams: IDrawTeams,
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
          ['draw-teams-button', this.drawTeamsButton],
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
        components: [buttonsRow],
        embeds: [embededMapper['display-draw-state'](draw)],
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

      const drawRowConditional = draw.users.getItems().length > 1 ? [drawRow] : [];
      await buttonInteraction.update({
        components: [buttonsRow, ...drawRowConditional],
        embeds: [embededMapper['display-draw-state'](draw)],
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

      const drawRowConditional = draw.users.getItems().length > 1 ? [drawRow] : [];

      await buttonInteraction.update({
        components: [buttonsRow, ...drawRowConditional],
        embeds: [embededMapper['display-draw-state'](draw)],
      });
    } catch (error) {
      console.error(error);
    }
  };

  private readonly cancelDrawButton = async (
    buttonInteraction: ButtonInteraction<CacheType>,
  ): Promise<void> => {
    const { channelId, user, member } = buttonInteraction;

    const isAdmin = (member as GuildMember)?.permissions.has(
      PermissionsBitField.Flags.Administrator,
    );

    const cancelDrawResult = await this.cancelDraw.execute({
      drawId: channelId,
      isAdmin,
      user: mapUserDicordToEntity(user),
    });

    if (cancelDrawResult.isLeft()) {
      await buttonInteraction.reply({
        ephemeral: true,
        content: cancelDrawResult.value.message,
      });
      return;
    }

    await buttonInteraction.message.delete();
    await buttonInteraction.reply({
      ephemeral: true,
      content: 'draw canceled',
    });

    setTimeout(async () => {
      await buttonInteraction.deleteReply();
    }, config.patterns.draw.ephemeralReplayDelay * 1000);
  };

  private readonly drawTeamsButton = async (
    buttonInteraction: ButtonInteraction<CacheType>,
  ): Promise<void> => {
    try {
      const { channelId, member, user } = buttonInteraction;

      const isAdmin = (member as GuildMember)?.permissions.has(
        PermissionsBitField.Flags.Administrator,
      );
      const drawTeamsResult = await this.drawTeams.execute({
        drawId: channelId,
        isAdmin,
        user: mapUserDicordToEntity(user),
      });

      if (drawTeamsResult.isLeft()) {
        await buttonInteraction.reply({
          ephemeral: true,
          content: drawTeamsResult.value.message,
        });
        return;
      }

      const draw = drawTeamsResult.value;

      await buttonInteraction.update({
        components: [],
        embeds: [embededMapper['display-draw-state'](draw)],
      });
    } catch (error) {
      console.error(error);
    }
  };
}
