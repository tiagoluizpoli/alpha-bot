import { ClientEvents } from 'discord.js';

export interface EventType<Key extends keyof ClientEvents> {
  name: Key;
  once?: boolean;
  run: (...args: ClientEvents[Key]) => any;
}

export class Event<Key extends keyof ClientEvents> {
  constructor(options: EventType<Key>) {
    Object.assign(this, options);
  }
}
