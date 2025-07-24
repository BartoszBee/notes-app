import { Note } from "../page";

type Props = {
  notes: Note[];
};

export default function ExportCSVButton({ notes }: Props) {
  const exportCSV = () => {
    if (!notes.length) return;

    const header = "Tytuł;Treść;Utworzono";
    const rows = notes.map((note) =>
      [note.title, note.content, new Date(note.createdAt).toLocaleString()]
        .map((field) => `"${field.replace(/"/g, '""')}"`)
        .join(";")
    );
    const csvContent = [header, ...rows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "notatki.csv";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={exportCSV}
      className="mb-6 mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Eksportuj do CSV
    </button>
  );
}
