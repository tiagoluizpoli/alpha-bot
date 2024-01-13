import {
  makeAddUserToDraw,
  makeCancelDraw,
  makeCreateDraw,
  makeDrawTeams,
  makeRemoveUserFromDraw,
} from '../usecases';

import { ICommandBuilder } from '@/bot';
import { CreateDrawCommand } from '@/bot/commands/create-draw';

export const makeDrawCommands = (): ICommandBuilder[] => {
  const createDraw = new CreateDrawCommand(
    makeCreateDraw(),
    makeAddUserToDraw(),
    makeRemoveUserFromDraw(),
    makeCancelDraw(),
    makeDrawTeams(),
  );
  return [createDraw];
};
