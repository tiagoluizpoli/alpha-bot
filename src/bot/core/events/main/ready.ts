import { ClientEvents } from 'discord.js';

import { Event, EventType, ExtendedClient, IEventBuilder } from '@/bot';

export class ReadyEventBuilder implements IEventBuilder {
  build = (client: ExtendedClient): EventType<keyof ClientEvents> => {
    return Object.assign(
      new Event({
        name: 'ready',
        once: true,
        run: () => {
          const { commands, buttons, selects, modals } = client;
          console.log(`Commands loaded ${commands.size}`.cyan);
          console.log(`Buttons loaded ${buttons.size}`.cyan);
          console.log(`Selects loaded ${selects.size}`.cyan);
          console.log(`Modals loaded ${modals.size}`.cyan);
          console.log('✅ Bot online'.green);
        },
      }),
    );
  };
}
