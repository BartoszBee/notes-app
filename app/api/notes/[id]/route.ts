import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function DELETE(
  _: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const stmt = db.prepare("DELETE FROM notes WHERE id = ?");
  stmt.run(id);
  return NextResponse.json({ success: true });
}

export async function PUT(
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const { title, content } = await req.json();

  const stmt = db.prepare(
    "UPDATE notes SET title = ?, content = ? WHERE id = ?"
  );
  stmt.run(title, content, id);

  return NextResponse.json({ id, title, content });
}
