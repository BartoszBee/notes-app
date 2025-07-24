import { Note } from "../page";
import NoteItem from "./NoteItem";

type Props = {
  notes: Note[];
  searchTerm: string;
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
};

export default function NoteList({ notes, searchTerm, onEdit, onDelete }: Props) {
  const filtered = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ul className="space-y-4">
      {filtered.map((note) => (
        <NoteItem key={note.id} note={note} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  );
}
