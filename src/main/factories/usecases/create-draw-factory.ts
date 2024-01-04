import { CreateDraw } from '@/application';
import { ICreateDraw } from '@/domain';
import { JsonFileDrawRepository } from '@/infrastructure';
import { env } from '@/main/config';

export const makeCreateDraw = (): ICreateDraw => {
  const fileName = env.fileName;
  const repositories = new JsonFileDrawRepository(fileName);
  return new CreateDraw(repositories);
};
