import { DrawTeams } from '@/application';
import { IDrawTeams } from '@/domain';
import { JsonFileDrawRepository } from '@/infrastructure';
import { env } from '@/main/config';

export const makeDrawTeams = (): IDrawTeams => {
  const fileName = env.fileName;
  const repositories = new JsonFileDrawRepository(fileName);
  return new DrawTeams(repositories);
};
