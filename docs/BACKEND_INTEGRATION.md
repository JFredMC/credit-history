# Connecting a NestJS backend

## Architecture

The frontend depends on the `CreditApi` interface (`frontend/src/app/core/services/credit-api.ts`), provided through the `CREDIT_API` token in `app.config.ts`.

- `MockCreditApi` – current implementation (in-memory data + simulated latency).
- `HttpCreditApi` – ready implementation calling the endpoints below.

To switch:

```ts
// app.config.ts
import { provideHttpClient } from '@angular/common/http';
providers: [provideHttpClient(), { provide: CREDIT_API, useClass: HttpCreditApi }]
```

Set `API_BASE_URL` in `http-credit-api.ts` (default `http://localhost:3000`). Components need no changes.

## Endpoints

| Endpoint | Response DTO | Module |
|---|---|---|
| `GET /credit-summary` | `CreditSummaryDto` | `credit` |
| `GET /credit-history` | `CreditHistoryDto` (`products[]`, `events[]`) | `history` |
| `GET /score-trend` | `ScorePointDto[]` | `score` |
| `GET /creditors` | `CreditorDto[]` | `creditors` |
| `GET /alerts` | `CreditAlertDto[]` | `alerts` |

DTO fields mirror `frontend/src/app/core/models/credit.models.ts`. Dates are ISO strings (`YYYY-MM-DD`; `YYYY-MM` for score months); amounts are COP integers.

## Backend blueprint (`/backend`)

```
src/modules/<name>/
├── <name>.module.ts       wiring
├── <name>.controller.ts   route + DTO response
├── <name>.service.ts      stub throwing NotImplementedException
├── dto/                   response/request DTOs
└── entities/              persistence models (users, credit products, creditors, score snapshots, events, alerts)
```

Run the stub: `cd backend && npm install && npx nest start --watch` (endpoints return 501 until implemented).

## Next steps

1. Add a database (e.g. PostgreSQL with TypeORM or Prisma) and map entities → DTOs in services.
2. Implement score computation (payment history, utilization, delinquency, inquiries) in `ScoreService`; derive summary aggregates in `CreditService`.
3. Add `class-validator` DTO validation for write endpoints, authentication (JWT guard) and scope data by authenticated user.
4. Add pagination/filters to `/credit-history` and a `PATCH /alerts/:id/read` endpoint.
5. Add `provideHttpClient` with an interceptor for auth/errors, then swap the provider.
