'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

type Note = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
};

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchNotes = async () => {
    try {
      const res = await fetch('/api/notes');
      const data = await res.json();
      setNotes(data);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Błąd ładowania notatek');
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error('Tytuł i treść są wymagane');
      return;
    }

    try {
      if (editId !== null) {
        const res = await fetch(`/api/notes/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content }),
        });
        const updated = await res.json();
        setNotes(prev =>
          prev.map(note => (note.id === editId ? { ...note, ...updated } : note))
        );
        toast.success('Notatka zaktualizowana');
        setEditId(null);
      } else {
        const res = await fetch('/api/notes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content }),
        });
        const newNote = await res.json();
        setNotes(prev => [newNote, ...prev]);
        toast.success('Notatka dodana');
      }

      setTitle('');
      setContent('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Błąd zapisu notatki');
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = confirm('Czy na pewno chcesz usunąć tę notatkę?');
    if (!confirmed) return;

    try {
      await fetch(`/api/notes/${id}`, { method: 'DELETE' });
      setNotes(prev => prev.filter(note => note.id !== id));
      toast.success('Notatka usunięta');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Błąd usuwania notatki');
    }
  };

  const handleEdit = (note: Note) => {
    setEditId(note.id);
    setTitle(note.title);
    setContent(note.content);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Notes App</h1>

      <div className="mb-6 space-y-2">
        <input
          className="w-full border rounded p-2"
          placeholder="Tytuł"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          className="w-full border rounded p-2"
          placeholder="Treść"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editId ? 'Zapisz zmiany' : 'Dodaj notatkę'}
          </button>
          {editId && (
            <button
              onClick={() => {
                setEditId(null);
                setTitle('');
                setContent('');
              }}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Anuluj
            </button>
          )}
        </div>
      </div>

      <div className="mb-4">
        <input
          type="text"
          className="w-full border rounded p-2"
          placeholder="Szukaj notatki..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ul className="space-y-4">
        {notes
          .filter(note =>
            note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            note.content.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map(note => (
            <li key={note.id} className="border p-4 rounded shadow">
              <h2 className="font-semibold">{note.title}</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{note.content}</p>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(note.createdAt).toLocaleString()}
              </p>
              <div className="flex gap-4 mt-2">
                <button
                  onClick={() => handleEdit(note)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Edytuj
                </button>
                <button
                  onClick={() => handleDelete(note.id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Usuń
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
