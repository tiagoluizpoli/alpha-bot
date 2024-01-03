import { ApplicationCommandType } from 'discord.js';

import { Command } from '@/interactions/components';

export default new Command({
  name: 'mencionar',
  type: ApplicationCommandType.Message,

  run: async ({ interaction }) => {
    if (!interaction.isMessageContextMenuCommand()) return;

    const message = interaction.targetMessage;
    await interaction.reply({
      content: `A mensagem diz: ${message.content}`,
    });
  },
});
