import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  ChatInputCommandInteraction,
  Collection,
  GuildMember,
  GuildTextBasedChannel,
  Message,
} from 'discord.js';

import { Command, CommandType, ICommandBuilder } from '@/bot/core';
import { config } from '@/main/config';

export class ClearMessages implements ICommandBuilder {
  build = (): CommandType => {
    return Object.assign(
      new Command({
        name: 'clear-messages',
        description: 'Limpa mensagens de um canal',
        type: ApplicationCommandType.ChatInput,
        options: [
          {
            name: 'quantidade',
            description: 'Quantas mensagens devem ser deletadas',
            type: ApplicationCommandOptionType.Integer,
            required: true,
          },
          {
            name: 'autor',
            description: 'Lempar mensagens de apenas um membro',
            type: ApplicationCommandOptionType.User,
            required: false,
          },
        ],
        run: async ({ interaction, options }) => {
          if (!interaction.isChatInputCommand() || !interaction.inCachedGuild()) return;
          const { channel } = interaction;
          await interaction.deferReply({ ephemeral: true });

          const ammount = Math.min(options.getInteger('quantidade', true), 100);
          const mention = options.getMember('autor') as GuildMember | undefined;

          if (!channel) {
            await interaction.editReply({ content: 'Não é possível limpar as mensagens' });
            return;
          }

          const messages = await channel.messages.fetch();

          if (mention) {
            const messages = channel.messages.cache
              .filter((m) => m.author.id === mention.id)
              .first(ammount);

            if (messages.length < 1) {
              await interaction.editReply({
                content: `Não foi encontrdada nenhuma mensagem recente de ${mention.displayName}`,
              });
              return;
            }

            await this.bulkDelete({
              channel,
              interaction,
              messages,
              content: `Foram limpas [size] mensagens em ${mention.displayName}`,
              errorContent: `Ocorreu um erro ao tentar limpar as mensagens de ${mention.displayName}`,
            });

            return;
          }

          await this.bulkDelete({
            channel,
            interaction,
            messages,
            content: `Foram limpas [size] mensagens em ${channel.name}`,
            errorContent: `Ocorreu um erro ao tentar limpar as mensagens de ${channel.name}`,
          });
        },
      }),
    );
  };

  private readonly bulkDelete = async ({
    interaction,
    channel,
    messages,
    content,
    errorContent,
  }: BulkDelete): Promise<void> => {
    await channel
      .bulkDelete(messages, true)
      .then(async (cleared) => {
        await interaction.editReply({
          content: content.replace('[size]', cleared.size.toString()),
        });
        setTimeout(async () => {
          await interaction.deleteReply();
        }, config.patterns.draw.ephemeralReplayDelay * 1000);
      })
      .catch(async (error) => {
        console.error(error);
        await interaction.editReply({
          content: errorContent,
        });
      });
  };
}

interface BulkDelete {
  interaction: ChatInputCommandInteraction<'cached'>;
  messages: Array<Message<true>> | Collection<string, Message<true>>;
  channel: GuildTextBasedChannel;
  content: string;
  errorContent: string;
}
