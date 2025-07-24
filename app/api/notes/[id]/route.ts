import { NextResponse } from "next/server";
import db from "@/lib/db";

function getIdFromUrl(req: Request): string {
  const url = new URL(req.url);
  const parts = url.pathname.split("/");
  return parts[parts.length - 1]; // ostatni fragment to id
}

export async function DELETE(req: Request) {
  const id = getIdFromUrl(req);

  const stmt = db.prepare("DELETE FROM notes WHERE id = ?");
  stmt.run(id);

  return NextResponse.json({ success: true });
}

export async function PUT(req: Request) {
  const id = getIdFromUrl(req);
  const { title, content } = await req.json();

  const stmt = db.prepare(
    "UPDATE notes SET title = ?, content = ? WHERE id = ?"
  );
  stmt.run(title, content, id);

  return NextResponse.json({ id, title, content });
}
