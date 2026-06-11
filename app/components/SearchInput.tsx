import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

type Props = {
  value: string;
  onChange: (val: string) => void;
};

export default function SearchInput({ value, onChange }: Props) {
  const active = value.length > 0;

  return (
    <div className="relative w-full">
      <MagnifyingGlassIcon
        className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none transition-colors ${active ? "text-indigo-500" : "text-gray-400"}`}
      />
      <input
        type="text"
        className={`w-full bg-white border rounded-xl pl-10 pr-9 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition shadow-sm ${active ? "border-indigo-400 ring-1 ring-indigo-200" : "border-gray-200"}`}
        placeholder="Szukaj notatek..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {active && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition cursor-pointer"
        >
          <XMarkIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
