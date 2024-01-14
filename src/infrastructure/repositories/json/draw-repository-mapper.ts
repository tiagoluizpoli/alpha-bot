import { Draw, Team, User, Users } from '@/domain';

interface BaseModel {
  id: string;
}

export interface UserModel extends BaseModel {
  userName: string;
  displayName: string;
  joinedAt: Date;
}

export interface TeamModel extends BaseModel {
  name: string;
  users: UserModel[];
}

export interface DrawModel extends BaseModel {
  teams: TeamModel[];
  users: UserModel[];
  createdAt: Date;
  createdBy: UserModel;
}

export const mapUserEntityToModel = (user: User): UserModel => {
  if (!user.joinedAt) {
    throw new Error('joinedAt must not be undefined');
  }
  return {
    id: user.id,
    userName: user.userName,
    displayName: user.displayName,
    joinedAt: user.joinedAt,
  };
};

export const mapUserModelToEntity = ({ id, userName, displayName, joinedAt }: UserModel): User => {
  return User.create({ userName, displayName, joinedAt }, id);
};

export const mapTeamEntityToModel = ({ id, name, users }: Team): TeamModel => {
  return {
    id,
    name,
    users: users.getItems().map((user) => mapUserEntityToModel(user)),
  };
};

export const mapTeamModelToEntity = ({ id, name, users }: TeamModel): Team => {
  return Team.create(
    { name, users: Users.create(users.map((user) => mapUserModelToEntity(user))) },
    id,
  );
};

export const mapDrawEntityToModel = ({
  id,
  teams,
  users,
  createdBy,
  createdAt,
}: Draw): DrawModel => {
  if (!createdAt) {
    throw new Error('createdAt must not be undefined');
  }
  return {
    id,
    users: users.getItems().map((user) => mapUserEntityToModel(user)),
    teams: teams.map((team) => mapTeamEntityToModel(team)),
    createdBy: mapUserEntityToModel(createdBy),
    createdAt,
  };
};

export const mapDrawModelToEntity = ({
  id,
  teams,
  users,
  createdBy,
  createdAt,
}: DrawModel): Draw => {
  return Draw.create(
    {
      teams: teams.map((team) => mapTeamModelToEntity(team)),
      users: Users.create(users.map((user) => mapUserModelToEntity(user))),
      createdBy: mapUserModelToEntity(createdBy),
      createdAt,
    },
    id,
  );
};
