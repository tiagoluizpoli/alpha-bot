import { ApplicationCommandOptionType, ApplicationCommandType, GuildMember } from 'discord.js';

import { Command, CommandType, ICommandBuilder } from '@/bot/core';

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

            void channel
              .bulkDelete(messages, true)
              .then(async (cleared) => {
                await interaction.editReply({
                  content: `Foram limpas ${cleared.size} mensagens em ${mention.displayName}`,
                });
              })
              .catch(async (error) => {
                console.error(error);
                await interaction.editReply({
                  content: `Ocorreu um erro ao tentar limpar as mensagens em ${mention.displayName}`,
                });
              });

            return;
          }

          void channel
            .bulkDelete(messages.first(ammount), true)
            .then(async (cleared) => {
              await interaction.editReply({
                content: `Foram limpas ${cleared.size} mensagens em ${channel.name}`,
              });
            })
            .catch(async (error) => {
              console.error(error);
              await interaction.editReply({
                content: `Ocorreu um erro ao tentar limpar as mensagens em ${channel.name}`,
              });
            });
        },
      }),
    );
  };
}
