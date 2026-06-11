import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
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
      disabled={!notes.length}
      className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 font-medium px-4 py-2.5 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition shadow-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
    >
      <ArrowDownTrayIcon className="h-4 w-4" />
      Eksportuj CSV
    </button>
  );
}
