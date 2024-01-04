import path from 'path';

import { config } from 'dotenv';

config();

export const env = {
  botToken: process.env.BOT_TOKEN,
  database: {
    url: process.env.DB_URL ?? path.join(__dirname, 'sqlite.db'),
  },
};
