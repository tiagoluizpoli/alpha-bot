import { CommandInteractionOptionResolver } from 'discord.js';

import { Event } from '../../structs/types/event';

import { client } from '@/src';

export default new Event({
  name: 'interactionCreate',
  run(interaction) {
    if (!interaction.isCommand()) return undefined;

    const command = client.commands.get(interaction.commandName);
    if (!command) return undefined;

    const options = interaction.options as CommandInteractionOptionResolver;

    command.run({
      client,
      interaction,
      options,
    });
  },
});
