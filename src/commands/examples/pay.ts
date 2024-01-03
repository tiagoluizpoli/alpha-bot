import { ApplicationCommandOptionType, ApplicationCommandType, GuildMember } from 'discord.js';

import { Command } from '@/structs/types/command';

export default new Command({
  name: 'pagar',
  description: 'Envia moedas a um membro',
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'valor',
      description: 'Quantidade de moedas que deseja enviar',
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
    {
      name: 'membro',
      description: 'Membro que receberá as moedas',
      type: ApplicationCommandOptionType.User,
      required: true,
    },
  ],
  run: async ({ interaction, options }) => {
    if (!interaction.isChatInputCommand()) return;
    const member = interaction.member as GuildMember;

    const amount = options.getNumber('valor', true);
    const mention = options.getMember('membro') as GuildMember;

    const content = `${member.user.username} enviou ${amount} moedas para ${mention.user.username}`;

    await interaction.reply({ content });
  },
});
