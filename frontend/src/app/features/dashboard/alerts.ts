import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CreditDataService } from '../../core/services/credit-data.service';
import { ErrorState, Skeleton } from '../../shared/ui';
import { AlertsList } from './alerts-list';

@Component({
  selector: 'app-alerts',
  imports: [AlertsList, Skeleton, ErrorState],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1 class="mb-6 text-2xl font-bold">Alerts</h1>
    @if (data.alerts.error()) { <app-error-state (retry)="data.alerts.reload()" /> }
    @else if (data.alerts.isLoading()) { <app-skeleton /> }
    @else if (data.alerts.value(); as alerts) { <app-alerts-list [alerts]="alerts" /> }
  `,
})
export class Alerts { protected readonly data = inject(CreditDataService); }
