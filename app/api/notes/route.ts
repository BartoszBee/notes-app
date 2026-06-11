import { NextResponse } from "next/server";
import { sql, initDb } from "@/lib/db";

export async function GET() {
  await initDb();
  const notes = await sql`SELECT * FROM notes ORDER BY "createdAt" DESC`;
  return NextResponse.json(notes);
}

export async function POST(req: Request) {
  const { title, content } = await req.json();
  const createdAt = new Date().toISOString();

  const result = await sql`
    INSERT INTO notes (title, content, "createdAt")
    VALUES (${title}, ${content}, ${createdAt})
    RETURNING *
  `;

  return NextResponse.json(result[0]);
}
