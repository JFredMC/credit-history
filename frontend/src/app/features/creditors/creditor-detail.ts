import { CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CreditDataService } from '../../core/services/credit-data.service';
import { RISK_CLASS, RISK_LABEL, STATUS_CLASS, STATUS_LABEL, TYPE_LABEL } from '../../shared/labels';
import { EmptyState, ErrorState, Skeleton } from '../../shared/ui';

@Component({
  selector: 'app-creditor-detail',
  imports: [CurrencyPipe, DatePipe, RouterLink, Skeleton, ErrorState, EmptyState],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a routerLink="/creditors" class="text-sm text-indigo-600 hover:underline">← All creditors</a>
    @if (data.creditors.error() || data.history.error()) { <app-error-state (retry)="data.creditors.reload()" /> }
    @else if (data.creditors.isLoading() || data.history.isLoading()) { <div class="mt-4"><app-skeleton /></div> }
    @else if (creditor(); as c) {
      <div class="mt-3 flex flex-wrap items-center gap-3">
        <h1 class="text-2xl font-bold">{{ c.name }}</h1>
        <span class="rounded-full px-2.5 py-1 text-xs font-medium" [class]="statusClass[c.status]">{{ statusLabel[c.status] }}</span>
        <span class="rounded-full px-2.5 py-1 text-xs font-medium" [class]="riskClass[c.risk]">Risk: {{ riskLabel[c.risk] }}</span>
      </div>
      <div class="mt-6 grid gap-4 sm:grid-cols-3">
        <div class="rounded-2xl bg-white p-5 ring-1 ring-slate-200"><p class="text-xs uppercase text-slate-500">Balance</p><p class="mt-1 text-xl font-bold">{{ c.totalBalance | currency: 'COP' : 'symbol-narrow' : '1.0-0' }}</p></div>
        <div class="rounded-2xl bg-white p-5 ring-1 ring-slate-200"><p class="text-xs uppercase text-slate-500">Overdue</p><p class="mt-1 text-xl font-bold" [class.text-rose-600]="c.overdueAmount > 0">{{ c.overdueAmount | currency: 'COP' : 'symbol-narrow' : '1.0-0' }}</p></div>
        <div class="rounded-2xl bg-white p-5 ring-1 ring-slate-200"><p class="text-xs uppercase text-slate-500">Customer since</p><p class="mt-1 text-xl font-bold">{{ c.since | date: 'mediumDate' }}</p></div>
      </div>
      <div class="mt-4 rounded-2xl bg-white p-5 ring-1 ring-slate-200"><p class="text-xs uppercase text-slate-500">Observations</p><p class="mt-1">{{ c.observations }}</p></div>
      <h2 class="mb-3 mt-6 font-semibold">Products</h2>
      @for (p of products(); track p.id) {
        <div class="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-white p-4 ring-1 ring-slate-200">
          <div><p class="font-medium">{{ p.name }}</p><p class="text-xs text-slate-500">{{ typeLabel[p.type] }} · opened {{ p.openedAt | date: 'mediumDate' }}</p></div>
          <div class="text-right"><p class="tabular-nums">{{ p.balance | currency: 'COP' : 'symbol-narrow' : '1.0-0' }}</p>
            <span class="rounded-full px-2 py-0.5 text-xs" [class]="statusClass[p.status]">{{ statusLabel[p.status] }}</span></div>
        </div>
      } @empty { <app-empty-state message="No products for this creditor." /> }
    } @else { <div class="mt-4"><app-empty-state message="Creditor not found." /></div> }
  `,
})
export class CreditorDetail {
  readonly id = input.required<string>();
  protected readonly data = inject(CreditDataService);
  protected readonly creditor = computed(() => this.data.creditors.value()?.find((c) => c.id === this.id()));
  protected readonly products = computed(() => (this.data.history.value()?.products ?? []).filter((p) => p.creditorId === this.id()));
  protected readonly typeLabel = TYPE_LABEL;
  protected readonly statusLabel = STATUS_LABEL;
  protected readonly statusClass = STATUS_CLASS;
  protected readonly riskLabel = RISK_LABEL;
  protected readonly riskClass = RISK_CLASS;
}
