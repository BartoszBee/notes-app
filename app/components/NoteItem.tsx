import { Note } from "../page";
import {
  DocumentTextIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

type Props = {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
};

export default function NoteItem({ note, onEdit, onDelete }: Props) {
  return (
    <li className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow space-y-2">
      <div className="flex items-center gap-2">
        <DocumentTextIcon className="h-5 w-5 text-blue-500" />
        <h2 className="text-lg font-semibold text-gray-800">{note.title}</h2>
      </div>

      <p className="text-gray-600 whitespace-pre-wrap">{note.content}</p>

      <p className="text-sm text-gray-500 mt-2">
        {new Date(note.createdAt).toLocaleString()}
      </p>

      <div className="flex gap-4 mt-2">
        <button
          onClick={() => onEdit(note)}
          className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
        >
          <PencilIcon className="h-4 w-4" />
          Edytuj
        </button>

        <button
          onClick={() => onDelete(note.id)}
          className="inline-flex items-center gap-1 text-sm text-red-600 hover:underline"
        >
          <TrashIcon className="h-4 w-4" />
          Usuń
        </button>
      </div>
    </li>
  );
}
