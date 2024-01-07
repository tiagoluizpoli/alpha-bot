import { SetChannelIdInDraw } from '@/application';
import { ISetMessageIdInDraw } from '@/domain';
import { JsonFileDrawRepository } from '@/infrastructure';
import { env } from '@/main/config';

export const makeSetMessageIdInDraw = (): ISetMessageIdInDraw => {
  const fileName = env.fileName;
  const repositories = new JsonFileDrawRepository(fileName);
  return new SetChannelIdInDraw(repositories);
};
