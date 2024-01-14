import { env } from './config';
import { makeCommands } from './factories/commands';
import { makeEvents } from './factories/event-factories/event-factory';

import { ExtendedClient } from '@/bot/core/';

export const createClient = async (): Promise<ExtendedClient> => {
  const client = new ExtendedClient(env.botToken, makeCommands(), makeEvents());
  await client.start();
  return client;
};
