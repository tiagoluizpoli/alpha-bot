import { ClientEvents } from 'discord.js';

import { Event, EventType, ExtendedClient, IEventBuilder } from '@/bot';

export class ComponentEventBuilder implements IEventBuilder {
  constructor(private readonly client: ExtendedClient) {}

  build = (): EventType<keyof ClientEvents> => {
    return Object.assign(
      new Event({
        name: 'interactionCreate',
        once: false,
        run: (interaction) => {
          if (interaction.isModalSubmit()) {
            this.client.modals.get(interaction.customId)?.(interaction);
          }

          if (interaction.isButton()) {
            this.client.buttons.get(interaction.customId)?.(interaction);
          }

          if (interaction.isStringSelectMenu()) {
            this.client.selects.get(interaction.customId)?.(interaction);
          }
        },
      }),
    );
  };
}
