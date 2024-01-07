import { ClientEvents } from 'discord.js';

import { ExtendedClient } from '@/bot';

export interface EventType<Key extends keyof ClientEvents> {
  name: Key;
  once?: boolean;
  run: (...args: ClientEvents[Key]) => any;
}

export class Event<T extends keyof ClientEvents> {
  constructor(options: EventType<T>) {
    Object.assign(this, options);
  }
}

export interface IEventBuilder {
  build: (client: ExtendedClient) => EventType<keyof ClientEvents>;
}
