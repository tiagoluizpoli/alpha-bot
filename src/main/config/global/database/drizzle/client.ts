import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';

import { env } from '@/main/config/env';

const databasePath = env.database.url;
const sqlite = new Database(databasePath);

export const db = drizzle(sqlite);
