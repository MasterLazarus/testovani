# MVP: Objednávání domácí péče zdravotních sester

Frontend prototyp pro české prostředí, navržený jako **interní aplikace jednoho poskytovatele zdravotních služeb** (nikoli marketplace).

## Technologie
- React + TypeScript
- Tailwind CSS
- Vite
- Lokální mock data bez backendu

## Struktura projektu
- `src/pages` — hlavní obrazovky podle rolí a workflow
- `src/components` — sdílené UI prvky
- `src/types/models.ts` — datový model MVP
- `src/data/mockData.ts` — realistická ukázková data

## Hlavní obrazovky (router)
- `/` veřejná landing page
- `/order/new` objednávkový wizard (8 kroků)
- `/client` klientská zóna
- `/dispatcher` dispečerský admin
- `/nurse` zóna pro sestru
- `/staff` administrace personálu
- `/architecture` informační architektura, komponenty, V2

## Datový model MVP
Definováno v `src/types/models.ts`:
- `Patient`
- `ContactPerson`
- `Order`
- `Visit`
- `Nurse`
- `ServiceType`
- `InternalNote`
- `VisitReport`

Workflow stavu objednávky:
`nová → čeká na kontrolu → čeká na přiřazení → potvrzená → sestra na cestě → probíhá návštěva → dokončeno / vyžaduje návaznost / zrušeno`

## Architektura připravená na API
MVP odděluje:
1. prezentační vrstvu (pages/components)
2. doménové typy (types)
3. data provider (mockData) — lze nahradit API vrstvou (`services/*`)

## Spuštění
```bash
npm install
npm run dev
```

## Další fáze rozvoje (V2)
- API vrstva + autentizace a RBAC
- auditní log změn a přístupů ke zdravotním údajům
- plánování tras a kapacit sester
- notifikace SMS/e-mail
- export záznamů a integrace na zdravotnické systémy
