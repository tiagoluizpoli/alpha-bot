import { ClearMessages, ICommandBuilder } from '@/bot';

export const makeMessagesCommands = (): ICommandBuilder[] => {
  const clearMessages = new ClearMessages();
  return [clearMessages];
};
