// NOTE: Adjust table/column names per your schema.
// Adds *_enc columns for PII fields and backfills encrypted values.
import { sql } from 'drizzle-orm';
import { enc } from '../../pii/fieldCrypto';

export async function up(db: any) {
  await db.execute(sql`ALTER TABLE users ADD COLUMN email_enc TEXT`);
  await db.execute(sql`ALTER TABLE users ADD COLUMN phone_enc TEXT`);
  const rows = await db.execute(sql`SELECT id, email, phone FROM users`);
  for (const r of rows) {
    if (r.email) await db.execute(sql`UPDATE users SET email_enc = ${enc(r.email)} WHERE id = ${r.id}`);
    if (r.phone) await db.execute(sql`UPDATE users SET phone_enc = ${enc(r.phone)} WHERE id = ${r.id}`);
  }
  // Optional: drop old columns after verifying application and API
  // await db.execute(sql`ALTER TABLE users DROP COLUMN email`);
  // await db.execute(sql`ALTER TABLE users DROP COLUMN phone`);
}

export async function down(db: any) {
  await db.execute(sql`ALTER TABLE users DROP COLUMN email_enc`);
  await db.execute(sql`ALTER TABLE users DROP COLUMN phone_enc`);
}
