import { CancelDraw } from '@/application';
import { ICancelDraw } from '@/domain';
import { JsonFileDrawRepository } from '@/infrastructure';
import { env } from '@/main/config';

export const makeCancelDraw = (): ICancelDraw => {
  const fileName = env.fileName;
  const repositories = new JsonFileDrawRepository(fileName);
  return new CancelDraw(repositories);
};
