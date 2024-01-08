import { AddUserToDraw } from '@/application';
import { IAddUserToDraw } from '@/domain';
import { JsonFileDrawRepository } from '@/infrastructure';
import { env } from '@/main/config';

export const makeAddUserToDraw = (): IAddUserToDraw => {
  const fileName = env.fileName;
  const repositories = new JsonFileDrawRepository(fileName);
  return new AddUserToDraw(repositories);
};
