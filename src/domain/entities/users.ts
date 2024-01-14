import { User, UserProps, WatchedList } from '@/domain';

export class Users extends WatchedList<User> {
  compareItems(a: User, b: User): boolean {
    return a.equals(b);
  }

  compareProps(a: User, b: User): boolean {
    const propsToCompare = ['displayName', 'userName', 'joinedAt'] as Array<keyof UserProps>;
    return !propsToCompare.every((prop) => {
      return a[prop] === b[prop];
    });
  }

  private constructor(users: User[]) {
    super(users);
  }

  public static create(users?: User[]): Users {
    return new Users(users ?? []);
  }
}
