"use client";

import { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";
import NoteForm from "./components/NoteForm";
import SearchInput from "./components/SearchInput";
import NoteList from "./components/NoteList";
import ExportCSVButton from "./components/ExportCSVButton";
import {
  DocumentTextIcon,
  ExclamationCircleIcon,
  PencilIcon,
  PlusIcon,
  MagnifyingGlassIcon
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

  const handleScroll = () => {
    sekcjaRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    const confirmed = confirm("Czy na pewno chcesz usunąć tę notatkę?");
    if (!confirmed) return;

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
    handleScroll();
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-10">
        <h1 className="text-3xl sm:text-4xl font-bold flex items-center justify-center gap-2 text-white bg-zinc-600 w-fit m-auto my-6 px-6 py-3 rounded-2xl shadow-lg">
          <DocumentTextIcon className="h-8 w-8 text-white" />
          Notes App
        </h1>
        <p className="text-center text-sm text-red-600  border flex items-center border-red-600 w-fit m-auto mb-4 px-4 py-2 rounded-md">
          <ExclamationCircleIcon className="h-8 w-8 text-red-600" /> Aplikacja
          działa tylko lokalnie – dane nie są trwale zapisywane np. na Vercel. (
          Lokalna baza danych SQLite )
        </p>

        <section
          className="bg-white rounded-2xl shadow-md p-6 space-y-6 border border-gray-200"
          ref={sekcjaRef}
        >
          <h2 className="text-xl font-semibold flex gap-3 items-center">
            {editId ? (
              <>
                <PencilIcon className="h-6 w-6 text-red-600" />
                Edytujesz notatkę
              </>
            ) : (
              <>
                <PlusIcon className="h-9 w-9 text-blue-600" />
                Dodaj nową notatkę
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

        <section className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-lg font-medium mb-2 flex gap-3 items-center"><MagnifyingGlassIcon className="h-5 w-5 text-gray-500" /> Wyszukaj notatki</h2>
              <SearchInput value={searchTerm} onChange={setSearchTerm} />
            </div>
            <div>
              <ExportCSVButton
                notes={notes.filter(
                  (note) =>
                    note.title
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    note.content
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                )}
              />
            </div>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold flex gap-3 items-center"><DocumentTextIcon className="h-6 w-6 text-blue-600" /> Twoje notatki</h2>
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
