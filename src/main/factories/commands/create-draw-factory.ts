import { makeCreateDraw } from '../usecases';

import { CommandType } from '@/bot';
import { CreateDrawCommand } from '@/bot/commands/create-draw';

export const makeDrawCommands = (): CommandType[] => {
  const createDraw = new CreateDrawCommand(makeCreateDraw());
  return [createDraw.build()];
};
