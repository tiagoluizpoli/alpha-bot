import { Entity } from '@/domain';

export interface UserProps {
  userName: string;
  displayName: string;
  joinedAt: Date;
}

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: string) {
    super({ props, id });
  }

  get userName(): string {
    return this.props.userName;
  }

  get displayName(): string {
    return this.props.displayName;
  }

  get joinedAt(): Date {
    return this.props.joinedAt;
  }

  public static create = (props: UserProps, id?: string): User => {
    const user = new User(props, id);
    return user;
  };
}
