import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  const stmt = db.prepare("DELETE FROM notes WHERE id = ?");
  stmt.run(params.id);
  return NextResponse.json({ success: true });
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { title, content } = await req.json();
  const stmt = db.prepare(
    "UPDATE notes SET title = ?, content = ? WHERE id = ?"
  );
  stmt.run(title, content, params.id);

  return NextResponse.json({ id: params.id, title, content });
}
