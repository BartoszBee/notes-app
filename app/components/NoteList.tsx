import { Note } from "../page";
import NoteItem from "./NoteItem";
import { DocumentTextIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

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

  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-300 space-y-2">
        <DocumentTextIcon className="h-12 w-12" />
        <p className="text-sm font-medium text-gray-400">Nie masz jeszcze żadnych notatek</p>
        <p className="text-xs text-gray-300">Dodaj pierwszą notatkę powyżej</p>
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-300 space-y-2">
        <MagnifyingGlassIcon className="h-12 w-12" />
        <p className="text-sm font-medium text-gray-400">Brak wyników dla „{searchTerm}"</p>
        <p className="text-xs text-gray-300">Spróbuj innej frazy</p>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {filtered.map((note) => (
        <NoteItem key={note.id} note={note} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  );
}
