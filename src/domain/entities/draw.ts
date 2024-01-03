import { Entity, Team, User, Users } from '@/domain';

export interface DrawProps {
  teams?: Team[];
  users: Users;
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

  public get users(): Users {
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
