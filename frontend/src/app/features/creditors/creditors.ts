import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CreditDataService } from '../../core/services/credit-data.service';
import { RISK_CLASS, RISK_LABEL, STATUS_CLASS, STATUS_LABEL } from '../../shared/labels';
import { ErrorState, Skeleton } from '../../shared/ui';

@Component({
  selector: 'app-creditors',
  imports: [CurrencyPipe, RouterLink, Skeleton, ErrorState],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1 class="mb-1 text-2xl font-bold">Creditors</h1>
    <p class="mb-6 text-sm text-slate-500">Entities that report information about you.</p>
    @if (data.creditors.error()) { <app-error-state (retry)="data.creditors.reload()" /> }
    @else if (data.creditors.isLoading()) { <app-skeleton /> }
    @else {
      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        @for (c of data.creditors.value(); track c.id) {
          <a [routerLink]="['/creditors', c.id]" class="block rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:shadow-md">
            <div class="flex items-start justify-between gap-2">
              <div><p class="font-semibold">{{ c.name }}</p><p class="text-xs text-slate-500">{{ c.sector }}</p></div>
              <span class="rounded-full px-2.5 py-1 text-xs font-medium" [class]="statusClass[c.status]">{{ statusLabel[c.status] }}</span>
            </div>
            <p class="mt-4 text-2xl font-bold tabular-nums">{{ c.totalBalance | currency: 'COP' : 'symbol-narrow' : '1.0-0' }}</p>
            <div class="mt-3 flex items-center justify-between text-sm">
              <span class="text-slate-500">Risk</span>
              <span class="rounded-full px-2.5 py-0.5 text-xs font-medium" [class]="riskClass[c.risk]">{{ riskLabel[c.risk] }}</span>
            </div>
          </a>
        }
      </div>
    }
  `,
})
export class Creditors {
  protected readonly data = inject(CreditDataService);
  protected readonly statusLabel = STATUS_LABEL;
  protected readonly statusClass = STATUS_CLASS;
  protected readonly riskLabel = RISK_LABEL;
  protected readonly riskClass = RISK_CLASS;
}
