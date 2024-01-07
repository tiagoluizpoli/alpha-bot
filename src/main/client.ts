import { env } from './config';
import { makeDrawCommands } from './factories/commands/create-draw-factory';
import { makeEvents } from './factories/event-factories/event-factory';

import { ExtendedClient } from '@/bot/core/';

export const createClient = (): ExtendedClient => {
  const client = new ExtendedClient(env.botToken);
  void client.start(makeDrawCommands(), makeEvents(client));
  return client;
};
