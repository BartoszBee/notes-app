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
    <div className="mb-6 space-y-2">
      <input
        className="w-full border rounded p-2"
        placeholder="Tytuł"
        value={title}
        onChange={(e) => onChange({ title: e.target.value, content })}
      />
      <textarea
        className="w-full border rounded p-2"
        placeholder="Treść"
        value={content}
        onChange={(e) => onChange({ title, content: e.target.value })}
      />
      <div className="flex gap-2">
        <button
          onClick={onSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          {isEditing ? 'Zapisz zmiany' : 'Dodaj notatkę'}
        </button>
        {isEditing && (
          <button
            onClick={onCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 cursor-pointer"
          >
            Anuluj
          </button>
        )}
      </div>
    </div>
  );
}
