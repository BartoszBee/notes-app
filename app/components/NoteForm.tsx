type Props = {
  title: string;
  content: string;
  onChange: (val: { title: string; content: string }) => void;
  onSubmit: () => void;
  isEditing: boolean;
  onCancel: () => void;
};

export default function NoteForm({
  title,
  content,
  onChange,
  onSubmit,
  isEditing,
  onCancel,
}: Props) {
  return (
    <div className="space-y-4">
      <input
        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
        placeholder="Tytuł notatki"
        value={title}
        onChange={(e) => onChange({ title: e.target.value, content })}
      />
      <textarea
        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition min-h-[130px] resize-y"
        placeholder="Treść notatki..."
        value={content}
        onChange={(e) => onChange({ title, content: e.target.value })}
      />
      <div className="flex gap-3">
        <button
          onClick={onSubmit}
          className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-indigo-700 active:scale-95 transition-all cursor-pointer"
        >
          {isEditing ? "Zapisz zmiany" : "Dodaj notatkę"}
        </button>
        {isEditing && (
          <button
            onClick={onCancel}
            className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-xl font-medium hover:bg-gray-200 active:scale-95 transition-all cursor-pointer"
          >
            Anuluj
          </button>
        )}
      </div>
    </div>
  );
}
