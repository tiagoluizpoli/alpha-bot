import { Entity } from '../core';

import { Team } from './team';
import { User } from './user';

export interface DrawProps {
  teams?: Team[];
  users?: User[];
  createdAt?: Date;
  createdBy: User;
}

export class Draw extends Entity<DrawProps> {
  private constructor(props: DrawProps, id?: string) {
    if (!props.createdAt) {
      props.createdAt = new Date();
    }
    super({ props, id });
  }

  public get teams(): Team[] | undefined {
    return this.props.teams;
  }

  public get users(): User[] | undefined {
    return this.props.users;
  }

  public get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  public get createdBy(): User | undefined {
    return this.props.createdBy;
  }

  public static create = (props: DrawProps, id?: string): Draw => {
    return new Draw(props, id);
  };
}
