// lib/db.ts
import Database from "better-sqlite3";
import { join } from "path";

const db = new Database(join(process.cwd(), "notes.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    createdAt TEXT NOT NULL
  );
`);

export default db;
