import { User as UserDiscord } from 'discord.js';

import { User } from '@/domain';

export const mapUserDicordToEntity = (user: UserDiscord): User => {
  const { username, displayName, id } = user;
  return User.create(
    {
      userName: username,
      displayName,
    },
    id,
  );
};
