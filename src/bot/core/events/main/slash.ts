import { ClientEvents, CommandInteractionOptionResolver } from 'discord.js';

import { Event, EventType, ExtendedClient, IEventBuilder } from '@/bot';

export class SlashEventBuilder implements IEventBuilder {
  constructor(private readonly client: ExtendedClient) {}

  build = (): EventType<keyof ClientEvents> => {
    return Object.assign(
      new Event({
        name: 'interactionCreate',
        run: (interaction) => {
          if (!interaction.isCommand()) return;

          const command = this.client.commands.get(interaction.commandName);
          if (!command) return;

          const options = interaction.options as CommandInteractionOptionResolver;

          command.run({
            client: this.client,
            interaction,
            options,
          });
        },
      }),
    );
  };
}
