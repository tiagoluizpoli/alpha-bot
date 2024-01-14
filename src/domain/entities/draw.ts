import { Entity, Team, User, Users } from '@/domain';

export interface DrawProps {
  teams: Team[];
  users: Users;
  createdBy: User;
  createdAt?: Date;
  drawnAt?: Date;
}

export class Draw extends Entity<DrawProps> {
  private constructor(props: DrawProps, id?: string) {
    if (!props.createdAt) {
      props.createdAt = new Date();
    }
    super({ props, id });
  }

  public get teams(): Team[] {
    return this.props.teams;
  }

  public get users(): Users {
    return this.props.users;
  }

  public get createdBy(): User {
    return this.props.createdBy;
  }

  public get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  public get drawnAt(): Date | undefined {
    return this.props.drawnAt;
  }

  public static create = (props: DrawProps, id?: string): Draw => {
    return new Draw(props, id);
  };

  public endDraw = (teams: Team[]): void => {
    this.props.teams = teams;
    this.props.drawnAt = new Date();
  };
}
