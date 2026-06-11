import { neon } from "@neondatabase/serverless";

export const sql = neon(process.env.DATABASE_URL!);

export async function initDb() {
  await sql`
    CREATE TABLE IF NOT EXISTS notes (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      "createdAt" TEXT NOT NULL
    )
  `;
}
