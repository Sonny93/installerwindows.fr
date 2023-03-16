import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { LowSync } from 'lowdb';
import { JSONFileSync } from 'lowdb/node';

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = new JSONFileSync<DbType>(join(__dirname, '../db', 'guides.json'));

const db = new LowSync(file);
db.read();

export { db };
