import { config } from 'dotenv'

config()

export const env = {
  botToken: process.env.BOT_TOKEN,
}
