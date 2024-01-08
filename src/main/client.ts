import { env } from './config';
import { makeDrawCommands } from './factories/commands/create-draw-factory';
import { makeEvents } from './factories/event-factories/event-factory';

import { ExtendedClient } from '@/bot/core/';

export const createClient = async (): Promise<ExtendedClient> => {
  const client = new ExtendedClient(env.botToken, makeDrawCommands(), makeEvents());
  await client.start();
  return client;
};
