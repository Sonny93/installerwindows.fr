import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { LowSync } from 'lowdb';
import { JSONFileSync } from 'lowdb/node';

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = new JSONFileSync<DbType>(join(__dirname, '../db', 'db.json'));

const _db = new LowSync(file);
_db.read();

async function getGuides() {
    await _db.read();
    return await _db.data.guides.reverse();
}

async function getAdmins() {
    await _db.read();
    return await _db.data.admin_accounts;
}

export { _db, getGuides, getAdmins };
