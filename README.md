# Notes App

Aplikacja do tworzenia i zarządzania notatkami zbudowana w Next.js 16 (App Router). Dane przechowywane w chmurze — PostgreSQL na Neon.

## Funkcje

- Dodawanie, edytowanie i usuwanie notatek
- Inline potwierdzenie usunięcia
- Wyszukiwanie notatek w czasie rzeczywistym z licznikiem wyników
- Eksport widocznych notatek do pliku CSV
- Powiadomienia o wyniku operacji (react-hot-toast)

## Stack

- **Next.js 16** — App Router, API Routes (server-side)
- **React 19** — komponenty klienckie
- **TypeScript**
- **Tailwind CSS v4**
- **Neon** — PostgreSQL w chmurze
- **Heroicons** — ikony

## Uruchomienie lokalne

```bash
npm install
```

Utwórz plik `.env.local` z connection stringiem do bazy:

```
DATABASE_URL=postgresql://...
```

```bash
npm run dev
```

Aplikacja dostępna pod adresem `http://localhost:3000`.

## Struktura

```
app/
├── api/notes/          # API Routes (GET, POST, PUT, DELETE)
├── components/         # NoteForm, NoteList, NoteItem, SearchInput, ExportCSVButton
├── page.tsx            # główna strona (logika stanu)
└── layout.tsx
lib/
└── db.ts               # klient Neon PostgreSQL
```
