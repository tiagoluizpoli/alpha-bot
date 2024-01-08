import { Entity, Team, User, Users } from '@/domain';

export interface DrawProps {
  channelId?: string;
  teams: Team[];
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

  public get channelId(): string | undefined {
    return this.props.channelId;
  }

  public set channelId(messageId: string) {
    this.props.channelId = messageId;
  }

  public get teams(): Team[] {
    return this.props.teams;
  }

  public set teams(teams: Team[]) {
    this.props.teams = teams;
  }

  public get users(): Users {
    return this.props.users;
  }

  public get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  public get createdBy(): User {
    return this.props.createdBy;
  }

  public static create = (props: DrawProps, id?: string): Draw => {
    return new Draw(props, id);
  };
}
