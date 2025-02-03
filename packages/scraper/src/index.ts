import { getAppliedJobs } from "./google/sheets";
import Database from "./db";
import { bulkCreateJobs } from "./google/import";

async function sheetImport(): Promise<void> {
  const db = new Database();
  await db.sequelize?.sync({ force: true });

  const applied = await getAppliedJobs();
  await bulkCreateJobs(applied);
}

sheetImport();
