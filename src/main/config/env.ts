import { config } from 'dotenv';

config();

export const env = {
  botToken: process.env.BOT_TOKEN,
  fileName: process.env.FILE_NAME ?? 'db.json',
};
