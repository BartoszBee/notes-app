type Props = {
  value: string;
  onChange: (val: string) => void;
};

export default function SearchInput({ value, onChange }: Props) {
  return (
    <div className="mb-4 w-1/2">
      <input
        type="text"
        className="w-full border rounded p-2"
        placeholder="Szukaj notatki..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
