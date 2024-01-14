import { v4 as uuid } from 'uuid';

export interface EntityProps<T> {
  id?: string;
  props: T;
}

export abstract class Entity<T> {
  protected readonly _id: string;
  protected readonly props: T;

  constructor({ props, id }: EntityProps<T>) {
    this.props = props;
    this._id = id ?? uuid();
  }

  get id(): string {
    return this._id;
  }

  public equals(object?: Entity<T>): boolean {
    if (object === null || object === undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!(object instanceof Entity)) {
      return false;
    }

    return this._id === object._id;
  }
}
