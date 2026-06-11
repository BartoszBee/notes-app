"use client";

import { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";
import NoteForm from "./components/NoteForm";
import SearchInput from "./components/SearchInput";
import NoteList from "./components/NoteList";
import ExportCSVButton from "./components/ExportCSVButton";
import {
  DocumentTextIcon,
  ExclamationTriangleIcon,
  PencilSquareIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";

export type Note = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
};

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [formState, setFormState] = useState({ title: "", content: "" });

  const sekcjaRef = useRef<HTMLElement | null>(null);

  const fetchNotes = async () => {
    try {
      const res = await fetch("/api/notes");
      const data = await res.json();
      setNotes(data);
    } catch {
      toast.error("Błąd ładowania notatek");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAddOrUpdate = async () => {
    const { title, content } = formState;
    if (!title.trim() || !content.trim()) {
      toast.error("Tytuł i treść są wymagane");
      return;
    }

    try {
      if (editId !== null) {
        const res = await fetch(`/api/notes/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, content }),
        });
        const updated = await res.json();
        setNotes((prev) =>
          prev.map((note) =>
            note.id === editId ? { ...note, ...updated } : note
          )
        );
        toast.success("Notatka zaktualizowana");
        setEditId(null);
      } else {
        const res = await fetch("/api/notes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, content }),
        });
        const newNote = await res.json();
        setNotes((prev) => [newNote, ...prev]);
        toast.success("Notatka dodana");
      }

      setFormState({ title: "", content: "" });
    } catch {
      toast.error("Błąd zapisu notatki");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/notes/${id}`, { method: "DELETE" });
      setNotes((prev) => prev.filter((note) => note.id !== id));
      toast.success("Notatka usunięta");
    } catch {
      toast.error("Błąd usuwania notatki");
    }
  };

  const handleEdit = (note: Note) => {
    setEditId(note.id);
    setFormState({ title: note.title, content: note.content });
    sekcjaRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-8">

        <header className="text-center space-y-3">
          <div className="flex items-center justify-center gap-3">
            <DocumentTextIcon className="h-7 w-7 text-indigo-500" />
            <h1 className="text-3xl font-bold tracking-tight text-indigo-600">Notes App</h1>
          </div>
          <div className="flex items-center gap-2 text-red-500 bg-red-50 border-red-500 text-xs rounded-xl px-4 py-2 w-fit mx-auto">
            <ExclamationTriangleIcon className="h-4 w-4 shrink-0" />
            <span>Lokalna baza SQLite — dane nie są trwałe na Vercel</span>
          </div>
        </header>

        <section
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          ref={sekcjaRef}
        >
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2 mb-5">
            {editId ? (
              <>
                <PencilSquareIcon className="h-4 w-4 text-indigo-500" />
                Edytujesz notatkę
              </>
            ) : (
              <>
                <PlusCircleIcon className="h-4 w-4 text-indigo-500" />
                Nowa notatka
              </>
            )}
          </h2>
          <NoteForm
            title={formState.title}
            content={formState.content}
            onChange={setFormState}
            onSubmit={handleAddOrUpdate}
            isEditing={editId !== null}
            onCancel={() => {
              setEditId(null);
              setFormState({ title: "", content: "" });
            }}
          />
        </section>

        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="flex-1 w-full">
            <SearchInput value={searchTerm} onChange={setSearchTerm} />
          </div>
          <ExportCSVButton
            notes={notes.filter(
              (note) =>
                note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                note.content.toLowerCase().includes(searchTerm.toLowerCase())
            )}
          />
        </div>

        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2 mb-4">
            <DocumentTextIcon className="h-4 w-4" />
            Twoje notatki
            {notes.length > 0 && !searchTerm && (
              <span className="bg-indigo-100 text-indigo-600 text-xs px-2 py-0.5 rounded-full font-semibold">
                {notes.length}
              </span>
            )}
            {searchTerm && (
              <span className="bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                {notes.filter(n =>
                  n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  n.content.toLowerCase().includes(searchTerm.toLowerCase())
                ).length} z {notes.length}
              </span>
            )}
          </h2>
          <NoteList
            notes={notes}
            searchTerm={searchTerm}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </section>

      </div>
    </div>
  );
}
