"use client";

import { useState } from "react";
import { Note } from "../page";
import {
  PencilIcon,
  TrashIcon,
  ClockIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

type Props = {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
};

export default function NoteItem({ note, onEdit, onDelete }: Props) {
  const [confirming, setConfirming] = useState(false);

  return (
    <li className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all p-5 space-y-3">
      <h2 className="font-semibold text-gray-900 leading-snug">{note.title}</h2>

      <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">
        {note.content}
      </p>

      <div className="flex items-center justify-between pt-1 border-t border-gray-50">
        <span className="flex items-center gap-1.5 text-xs text-gray-400">
          <ClockIcon className="h-3.5 w-3.5" />
          {new Date(note.createdAt).toLocaleString("pl-PL")}
        </span>

        {confirming ? (
          <div className="flex items-center gap-2">
            <span className="text-xs text-red-500 flex items-center gap-1">
              <ExclamationTriangleIcon className="h-3.5 w-3.5" />
              Na pewno?
            </span>
            <button
              onClick={() => onDelete(note.id)}
              className="text-xs font-medium text-white bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-lg transition cursor-pointer"
            >
              Usuń
            </button>
            <button
              onClick={() => setConfirming(false)}
              className="text-xs font-medium text-gray-500 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition cursor-pointer"
            >
              Anuluj
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(note)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition cursor-pointer"
            >
              <PencilIcon className="h-3.5 w-3.5" />
              Edytuj
            </button>
            <button
              onClick={() => setConfirming(true)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-red-500 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition cursor-pointer"
            >
              <TrashIcon className="h-3.5 w-3.5" />
              Usuń
            </button>
          </div>
        )}
      </div>
    </li>
  );
}
