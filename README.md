# Notes App

Aplikacja do tworzenia i zarządzania notatkami zbudowana w Next.js 15 (App Router). Dane przechowywane lokalnie w bazie SQLite.

## Funkcje

- Dodawanie, edytowanie i usuwanie notatek
- Inline potwierdzenie usunięcia (bez okien przeglądarki)
- Wyszukiwanie notatek w czasie rzeczywistym z licznikiem wyników
- Eksport widocznych notatek do pliku CSV
- Powiadomienia o wyniku operacji (react-hot-toast)

## Stack

- **Next.js 15** — App Router, API Routes (server-side)
- **React 19** — komponenty klienckie
- **TypeScript**
- **Tailwind CSS v4**
- **better-sqlite3** — lokalna baza SQLite
- **Heroicons** — ikony

## Uruchomienie lokalne

```bash
npm install
npm run dev
```

Aplikacja dostępna pod adresem `http://localhost:3000`.

> **Uwaga:** baza danych SQLite działa tylko lokalnie.

## Struktura

```
app/
├── api/notes/          # API Routes (GET, POST, PUT, DELETE)
├── components/         # NoteForm, NoteList, NoteItem, SearchInput, ExportCSVButton
├── page.tsx            # główna strona (logika stanu)
└── layout.tsx
lib/
└── db.ts               # inicjalizacja bazy SQLite
```
