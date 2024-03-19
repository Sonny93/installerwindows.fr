import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";
import { findGuideIndexBySlugOrThrow } from "utils/db";

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = new JSONFileSync<DbType>(join(__dirname, '../../db', 'db.json'));

const _db = new LowSync(file, { admin_accounts: [], guides: [] });
_db.read();

async function getGuides() {
  await _db.read();
  return await _db.data.guides.reverse();
}

async function pushGuide(guide: Guide) {
  await _db.data.guides.push(guide);
  await _db.write();
}

async function updateGuide(guideSlug: Guide['slug'], guide: Guide) {
  const guideIndex = await findGuideIndexBySlugOrThrow(guideSlug);

  _db.data.guides[guideIndex] = guide;
  await _db.write();
}

async function deleteGuide(guideSlug: Guide['slug']) {
  const guideIndex = await findGuideIndexBySlugOrThrow(guideSlug);

  _db.data.guides.splice(guideIndex, 1);
  await _db.write();
}

async function getAdmins() {
  await _db.read();
  return await _db.data.admin_accounts;
}

export { _db, deleteGuide, getAdmins, getGuides, pushGuide, updateGuide };
