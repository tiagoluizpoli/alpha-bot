import { ExtendedClient } from '@/interactions/extendedClient';

export * from 'colors';

const client = new ExtendedClient();

void client.start();

export { client };
