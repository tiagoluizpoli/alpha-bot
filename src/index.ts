import { ExtendedClient } from './structs/extendedClient';

export * from 'colors';

const client = new ExtendedClient();

void client.start();

export { client };
