# Jakość powietrza — MVP frontu

Aplikacja React (Vite + TypeScript) do przeglądania **zmockowanych** danych.<br>
Stan notatek i filtrów (Kraj + Rok) jest utrwalany w **`sessionStorage`**.

### Routing

| Ścieżka        | Widok            | Funkcje                                                                                       |
| -------------- | ---------------- | --------------------------------------------------------------------------------------------- |
| `/`            | `AirQualityPage` | Wykres, tabela (sortowanie, filtr miasta, link do notatek po `cityId`, paginacja)             |
| `/notes/:city` | `NotesPage`      | Lista, szczegóły i edycja w modalach, symulacja POST/PATCH; **toasty** (onSuccess / onError). |

## Architektura

**Feature-first** (inspirowana Bulletproof React): logika i UI domen w `features/*`, wspólne rzeczy w `shared/`.

## Stack i narzędzia

| Obszar  | Wybór                                                                                                                                            |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Runtime | React 19, punkt wejścia [App.tsx](src/App.tsx)                                                                                                   |
| Routing | React Router 7 (`BrowserRouter`, [Layout](src/shared/ui/AppLayout.tsx)), [AppRouter](src/app/router.tsx)                                         |
| Dane    | TanStack Query 5 — cache, `refetch`, synchronizacja z mockowym „API”                                                                             |
| Stan    | Zustand 5 + **`persist` (`sessionStorage`)**: `notesStore`, `airQualityFiltersStore`                                                             |
| UI      | Radix: Dialog, Popover, Tooltip; Tailwind 4; `cn` (`clsx` + `tailwind-merge`)                                                                    |
| Toasty  | Moduł `src/shared/ui/Toast/` (`ToastProvider`, `useToast`) — portal, auto‑zamknięcie; wywołania m.in. z `useCityNotes` (`onSuccess` / `onError`) |
| Wykresy | Chart.js 4 + `react-chartjs-2` — rejestracja pluginu Chart.js **`Tooltip`** ([chartRegister](src/shared/lib/chartRegister.ts))                   |
| Testy   | Vitest 4 + Testing Library, [setup](src/test/setup.ts) — przykłady testów jednostkowych i integracyjnych                                         |
| Jakość  | TypeScript strict, ESLint 10 flat (typescript-eslint, Hooks, Refresh, jsx-a11y), Prettier, Husky + **lint-staged**                               |
| Ikony   | `vite-plugin-svgr` (`*.svg?react`)                                                                                                               |

### [Providers](src/app/providers.tsx)

Jeden **`QueryClient`** na sesję (`useState` initializer): zapytania m.in. `staleTime: 30_000`, `retry: 1`.<br>
Kolejność: `QueryClientProvider` → **`ToastProvider`** → **`TooltipProvider`**.<br>
W dev (`import.meta.env.DEV`) — React Query Devtools.

W [App.tsx](src/App.tsx): **`ErrorBoundary`** wokół providerów i routera.

### Struktura `src/`

- **`app/`** — `AppRouter`, `AppProviders`, layout z Suspense ([RouteSuspenseLayout](src/app/RouteSuspenseLayout.tsx)), `ErrorBoundary`
- **`features/airQuality/`** — strona statystyk, `airQualityFiltersStore`, `useCityStatsQuery`, tabela (`CityStatsTable`, kolumny w `lib/cityStatsTableConfig.ts`), `sortFilterStats`, wykres (`PollutantBarChart`, `lib/pollutantBarChartConfig.ts`), API / `queryKeys`. Lista: **`items` + `totalCount`**; paginacja po stronie klienta (`useCityStatsTable`)
- **`features/cityNotes/`** — `NotesPage`, `useCityNotes`, `notesStore`, `utils/notesPersistUtils`, mock API, modale
- **`mocks/`**
- **`shared/`** — UI (Button, Modal, Select, Input, Toast, tabela, layout), `api/mockDelay`, `lib` (`cn`, `formatDate`, `getErrorMessage`, `useDebounce` …)
- **`test/`** — `testUtils`, setup Vitest

### Warstwa „API”

Zmockowane dane, symulacja REST przez [mockDelay](src/shared/api/mockDelay.ts).
**Zustand** (`notesStore`) do symulacji POST/PATCH.<br>
Mechanizm **`invalidateQueries`** w oparciu o **queryKeys** zgodnie z [dokumentacją TanStack Query](https://tanstack.com/query/v5/docs/framework/react/guides/query-keys).<br>
Mechanizm [useDebounce](src/shared/lib/useDebounce.ts) dla filtrów query

### Build

Produkcyjne `base`: `/air-quality-frontend/` — wymagane przez **GitHub Pages**;<br>
**Alias importów:** `@/*` → `src/*` (Vite + TypeScript) [vite.config.ts](vite.config.ts).

## CI/CD (GitHub Actions)

- **Pull requesty do `main`:** [Quality check](.github/workflows/quality-check.yml) — Node **22**, `npm ci`, `format:check`, `lint`, `test:run`
- **Push do `main`:** [Deploy](.github/workflows/deploy.yml) — build, wdrożenie na **GitHub Pages**
- **[Dependabot](.github/dependabot.yml)** — cotygodniowe aktualizacje zależności npm

## Przygotowanie pod pracę w zespole

- **Dependabot** - aktualizacje bibliotek
- Wstępna konfiguracja Projektu na Github
- **TypeScript** — tryb strict (`tsconfig`)
- **ESLint** — flat config, reguły pod React 19 i dostępność (jsx-a11y)
- **Prettier** — jednolity format
- **Husky** — hook [pre-commit](.husky/pre-commit): `tsc` (bez emit) oraz **lint-staged** (na staged plikach: format + lint wg [package.json](package.json))

## SEO

- [index.html](index.html): `meta name="description"`
- [robots.txt](public/robots.txt)

Dzięki temu uzyskałem ocenę 100 w Lighthouse.

## Testy

```bash
npm run test
```

## Uruchomienie

```bash
npm install
npm run dev
```

Pełna lista zależności: [`package.json`](package.json).
