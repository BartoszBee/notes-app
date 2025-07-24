// app/api/notes/route.ts
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  const stmt = db.prepare("SELECT * FROM notes ORDER BY createdAt DESC");
  const notes = stmt.all();
  return NextResponse.json(notes);
}

export async function POST(req: Request) {
  const { title, content } = await req.json();
  const createdAt = new Date().toISOString();

  const stmt = db.prepare(
    "INSERT INTO notes (title, content, createdAt) VALUES (?, ?, ?)"
  );
  const info = stmt.run(title, content, createdAt);

  return NextResponse.json({
    id: info.lastInsertRowid,
    title,
    content,
    createdAt,
  });
}
