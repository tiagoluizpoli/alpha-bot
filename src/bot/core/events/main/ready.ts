import { ClientEvents } from 'discord.js';

import { Event, EventType, IEventBuilder } from '@/bot';
import { client } from '@/main';

export class ReadyEventBuilder implements IEventBuilder {
  build = (): EventType<keyof ClientEvents> => {
    return Object.assign(
      new Event({
        name: 'interactionCreate',
        once: true,
        run: () => {
          const { commands, buttons, selects, modals } = client;
          console.log('✅ Bot online'.green);
          console.log(`Commands loaded ${commands.size}`.cyan);
          console.log(`Buttons loaded ${buttons.size}`.cyan);
          console.log(`Selects loaded ${selects.size}`.cyan);
          console.log(`Modals loaded ${modals.size}`.cyan);
        },
      }),
    );
  };
}
