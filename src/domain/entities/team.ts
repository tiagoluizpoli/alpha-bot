import { Entity, Users } from '@/domain';

export interface TeamProps {
  name: string;
  users: Users;
}

export class Team extends Entity<TeamProps> {
  private constructor(props: TeamProps, id?: string) {
    super({ props, id });
  }

  get name(): string {
    return this.props.name;
  }

  get users(): Users {
    return this.props.users;
  }

  public static create = (props: TeamProps, id?: string): Team => {
    return new Team(props, id);
  };
}
