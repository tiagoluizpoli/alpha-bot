import { RemoveUserFromDraw } from '@/application';
import { IRemoveUserFromDraw } from '@/domain';
import { JsonFileDrawRepository } from '@/infrastructure';
import { env } from '@/main/config';

export const makeRemoveUserFromDraw = (): IRemoveUserFromDraw => {
  const fileName = env.fileName;
  const repositories = new JsonFileDrawRepository(fileName);
  return new RemoveUserFromDraw(repositories);
};
