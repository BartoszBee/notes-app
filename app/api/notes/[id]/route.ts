import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

function getIdFromUrl(req: Request): string {
  const url = new URL(req.url);
  const parts = url.pathname.split("/");
  return parts[parts.length - 1];
}

export async function DELETE(req: Request) {
  const id = getIdFromUrl(req);
  await sql`DELETE FROM notes WHERE id = ${id}`;
  return NextResponse.json({ success: true });
}

export async function PUT(req: Request) {
  const id = getIdFromUrl(req);
  const { title, content } = await req.json();

  const result = await sql`
    UPDATE notes SET title = ${title}, content = ${content}
    WHERE id = ${id}
    RETURNING *
  `;

  return NextResponse.json(result[0]);
}
