import { ClientEvents } from 'discord.js';

import { Event, EventType, ExtendedClient, IEventBuilder } from '@/bot';

export class ComponentEventBuilder implements IEventBuilder {
  build = (client: ExtendedClient): EventType<keyof ClientEvents> => {
    return Object.assign(
      new Event({
        name: 'interactionCreate',
        once: false,
        run: (interaction) => {
          if (interaction.isModalSubmit()) {
            client.modals.get(interaction.customId)?.(interaction);
          }

          if (interaction.isButton()) {
            client.buttons.get(interaction.customId)?.(interaction);
          }

          if (interaction.isStringSelectMenu()) {
            client.selects.get(interaction.customId)?.(interaction);
          }
        },
      }),
    );
  };
}
