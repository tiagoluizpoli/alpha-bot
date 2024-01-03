import { Entity } from '../core';

import { User } from './user';

export interface TeamProps {
  name: string;
  users?: User[];
}

export class Team extends Entity<TeamProps> {
  private constructor(props: TeamProps, id?: string) {
    super({ props, id });
  }

  get name(): string {
    return this.props.name;
  }

  get users(): User[] | undefined {
    return this.props.users;
  }

  public static create = (props: TeamProps, id?: string): Team => {
    return new Team(props, id);
  };
}
