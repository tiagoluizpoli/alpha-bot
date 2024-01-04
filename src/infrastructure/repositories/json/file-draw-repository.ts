import fs from 'fs';

import { Draw, Either, left, right, UnknownError } from '@/domain';
import {
  ICreateDrawReository,
  IGetDrawByIdReository,
  IRemoveDrawReository,
  IUpdateDrawReository,
} from '@/application';

type Repositories = ICreateDrawReository &
  IUpdateDrawReository &
  IRemoveDrawReository &
  IGetDrawByIdReository;

export class JsonFileDrawRepository implements Repositories {
  constructor(private readonly jsonFile: string) {
    this.createFileIfNotExists();
  }

  private createFileIfNotExists(): void {
    if (!fs.existsSync(this.jsonFile)) {
      fs.writeFileSync(this.jsonFile, '[]');
    }
  }

  private async readData(): Promise<Either<UnknownError, Draw[]>> {
    return await new Promise((resolve, reject) => {
      try {
        const data = fs.readFileSync(this.jsonFile, 'utf-8');

        const drawData = JSON.parse(data) as Draw[];
        console.log(drawData);

        resolve(right(JSON.parse(data) as Draw[]));
      } catch (error) {
        reject(error);
      }
    });
  }

  private async writeData(items: Draw[]): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      try {
        fs.writeFileSync(this.jsonFile, JSON.stringify(items, null, 2));
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  async create(draw: Draw): Promise<Either<UnknownError, Draw>> {
    try {
      const itemsResult = await this.readData();
      if (itemsResult.isLeft()) {
        return left(itemsResult.value);
      }

      const items = itemsResult.value;

      items.push(draw);

      await this.writeData(items);

      return right(draw);
    } catch (error) {
      console.error(error);

      return left(new UnknownError());
    }
  }

  update = async (draw: Draw): Promise<Either<UnknownError, Draw>> => {
    try {
      const itemsResult = await this.readData();
      if (itemsResult.isLeft()) {
        return left(itemsResult.value);
      }

      const items = itemsResult.value;

      const index = items.findIndex((item) => item.id === draw.id);

      if (!index) return left(new UnknownError());

      items[index] = draw;

      return right(items[index]);
    } catch (error) {
      console.error(error);

      return left(new UnknownError());
    }
  };

  remove = async (drawId: string): Promise<Either<UnknownError, void>> => {
    try {
      const itemsResult = await this.readData();
      if (itemsResult.isLeft()) {
        return left(itemsResult.value);
      }

      const items = itemsResult.value;

      const filteredItems = items.filter((item) => item.id !== drawId);
      await this.writeData(filteredItems);

      return right(undefined);
    } catch (error) {
      console.error(error);

      return left(new UnknownError());
    }
  };

  getById = async (drawId: string): Promise<Either<UnknownError, Draw | undefined>> => {
    try {
      const itemsResult = await this.readData();
      if (itemsResult.isLeft()) {
        return left(itemsResult.value);
      }

      const items = itemsResult.value;

      const foundItem = items.find((item) => item.id === drawId);

      return right(foundItem);
    } catch (error) {
      console.error(error);

      return left(new UnknownError());
    }
  };
}
