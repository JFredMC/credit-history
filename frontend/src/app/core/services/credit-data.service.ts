import { Injectable, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { CREDIT_API } from './credit-api';

/** Facade exposing every dataset as a signal-based resource (value/isLoading/error/reload). */
@Injectable({ providedIn: 'root' })
export class CreditDataService {
  private readonly api = inject(CREDIT_API);

  readonly summary = rxResource({ stream: () => this.api.getSummary() });
  readonly history = rxResource({ stream: () => this.api.getHistory() });
  readonly scoreTrend = rxResource({ stream: () => this.api.getScoreTrend() });
  readonly creditors = rxResource({ stream: () => this.api.getCreditors() });
  readonly alerts = rxResource({ stream: () => this.api.getAlerts() });
}
