# Teacher Ranking

MVP fuer eine Lehrer-Ranking-Plattform mit Next.js, PostgreSQL, Prisma und NextAuth.js.

## Funktionen

- Gaeste sehen Startseite, Lehrerprofile und Rankings.
- Nutzer registrieren sich mit Einladungscode.
- Nutzer bewerten Lehrer, schreiben Kommentare und vergeben XP.
- Admins verwalten Lehrer und Einladungscodes.
- XP, Level und Rankings werden aus Bewertungen berechnet.

## Start

```bash
cp .env.example .env
npm install
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

Danach laeuft die App unter `http://localhost:3000`.

## Demo-Accounts nach Seed

- Admin: `admin@school.test` / `admin123456`
- Nutzer: `student@school.test` / `student123456`

## Einladungscode

Der Seed legt `CODE-DEMO2026` an.

## Wichtige Ordner

- `app/`: Seiten und API-Routen
- `components/`: wiederverwendbare UI-Bausteine
- `lib/`: Auth, Prisma, XP-System und Datenabfragen
- `prisma/`: Datenmodell und Seed-Daten
