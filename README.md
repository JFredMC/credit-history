# credit-history

Personal credit history demo inspired by DataCrédito Colombia: Angular 22 + Tailwind CSS frontend with simulated data, and a NestJS backend blueprint ready to be connected later. No real APIs or third-party services are used and all data is fictitious.

## Features

- **Dashboard** – score gauge (150–950), KPI cards (total debt, monthly installments, overdue debt, on-time payments), 12-month score trend, debt by credit type (donut), payment behavior (bars) and alerts.
- **Credit history** – product table with status filter and 12-month payment strip.
- **Creditors** – cards with risk/status and a detail page (amount, status, date, risk, observations, products).
- **Timeline** – payments, installments, delays, closures, reports and inquiries, filterable.
- **Alerts** – info / warning / critical alerts.
- **Credit report** – printable report view with JSON and CSV export.
- Responsive (mobile menu, scrollable tables), loading skeletons, error and empty states.

## Run locally

Requires Node.js 20.19+ (22 recommended).

```bash
cd frontend
npm install
npm start        # http://localhost:4200
npm test         # unit tests (Vitest)
npm run build
```

## Structure

```
frontend/src/app
├── core/        models, mock data, CreditApi contract + Mock/Http implementations, CreditDataService
├── shared/      SVG charts (line, donut, bars), UI states, label maps
├── layout/      app shell / navigation
└── features/    dashboard, history, creditors, timeline, report
backend/src      NestJS blueprint: modules/{users,credit,creditors,score,history,alerts} with dto/ and entities/
docs/            BACKEND_INTEGRATION.md
```

## Backend readiness

The UI only talks to the `CreditApi` interface. Expected endpoints: `GET /credit-summary`, `/credit-history`, `/score-trend`, `/creditors`, `/alerts`. See [docs/BACKEND_INTEGRATION.md](docs/BACKEND_INTEGRATION.md).
