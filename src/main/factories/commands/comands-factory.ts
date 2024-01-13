import { makeMessagesCommands } from './clear-messages.factory';
import { makeDrawCommands } from './create-draw-factory';

import { ICommandBuilder } from '@/bot';

export const makeCommands = (): ICommandBuilder[] => {
  const drawCommands = makeDrawCommands();
  const messagesCommands = makeMessagesCommands();
  return [...drawCommands, ...messagesCommands];
};
