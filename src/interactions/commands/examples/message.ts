import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  ChannelType,
  TextChannel,
} from 'discord.js';

import { Command } from '@/interactions/components';

export default new Command({
  name: 'message',
  description: 'Envia uma mensagem para um chat',
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'chat',
      description: 'Selecione o chat que deseja enviar a mensagem',
      type: ApplicationCommandOptionType.Channel,
      required: true,
      channelTypes: [ChannelType.AnnouncementThread, ChannelType.GuildText],
    },
    {
      name: 'text',
      description: 'Digite o texto que deseja enviar no chat',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  run: async ({ interaction, options }) => {
    if (!interaction.isChatInputCommand()) return;

    await interaction.deferReply({ ephemeral: true });

    const channel = options.getChannel('chat', true);
    const content = options.getString('text', true);

    if (channel instanceof TextChannel) {
      const msg = await channel.send({ content });
      await interaction.editReply({
        content: `Sua mensagem foi enviada no chat ${channel.name}! [confira](${msg.url})`,
      });
    }

    await interaction.reply({ content });
  },
});
