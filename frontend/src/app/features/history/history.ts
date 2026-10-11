import { CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CreditStatus } from '../../core/models/credit.models';
import { CreditDataService } from '../../core/services/credit-data.service';
import { BEHAVIOR_COLOR, BEHAVIOR_LABEL, STATUS_CLASS, STATUS_LABEL, TYPE_LABEL } from '../../shared/labels';
import { EmptyState, ErrorState, Skeleton } from '../../shared/ui';

@Component({
  selector: 'app-history',
  imports: [CurrencyPipe, DatePipe, RouterLink, Skeleton, ErrorState, EmptyState],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1 class="mb-1 text-2xl font-bold">Credit history</h1>
    <p class="mb-6 text-sm text-slate-500">All credit products reported under your name.</p>
    @if (data.history.error() || data.creditors.error()) { <app-error-state (retry)="reload()" /> }
    @else if (data.history.isLoading() || data.creditors.isLoading()) { <app-skeleton /> }
    @else {
      <div class="mb-4 flex flex-wrap gap-2" role="group" aria-label="Filter by status">
        @for (f of filters; track f.value) {
          <button type="button" (click)="filter.set(f.value)" [attr.aria-pressed]="filter() === f.value"
            class="rounded-full px-4 py-1.5 text-sm font-medium ring-1 ring-slate-200"
            [class]="filter() === f.value ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'">{{ f.label }}</button>
        }
      </div>
      @if (rows().length === 0) { <app-empty-state message="No products match this filter." /> }
      @else {
        <div class="overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
          <table class="w-full min-w-[900px] text-left text-sm">
            <thead class="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th class="p-4">Creditor / product</th><th class="p-4">Type</th><th class="p-4 text-right">Balance</th>
                <th class="p-4 text-right">Monthly</th><th class="p-4">Status</th><th class="p-4">Opened</th><th class="p-4">Last 12 months</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              @for (r of rows(); track r.id) {
                <tr class="hover:bg-slate-50">
                  <td class="p-4"><a [routerLink]="['/creditors', r.creditorId]" class="font-medium text-indigo-600 hover:underline">{{ r.creditorName }}</a>
                    <div class="text-xs text-slate-500">{{ r.name }}</div></td>
                  <td class="p-4">{{ typeLabel[r.type] }}</td>
                  <td class="p-4 text-right tabular-nums">{{ r.balance | currency: 'COP' : 'symbol-narrow' : '1.0-0' }}</td>
                  <td class="p-4 text-right tabular-nums">{{ r.monthlyPayment | currency: 'COP' : 'symbol-narrow' : '1.0-0' }}</td>
                  <td class="p-4"><span class="rounded-full px-2.5 py-1 text-xs font-medium" [class]="statusClass[r.status]">{{ statusLabel[r.status] }}</span>
                    @if (r.daysLate) { <div class="mt-1 text-xs text-rose-600">{{ r.daysLate }} days late</div> }</td>
                  <td class="p-4">{{ r.openedAt | date: 'mediumDate' }}</td>
                  <td class="p-4"><div class="flex gap-1">
                    @for (b of r.paymentHistory; track $index) {
                      <span class="h-3 w-3 rounded-sm" [style.background]="color[b]" [title]="behaviorLabel[b]"></span>
                    }</div></td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      }
    }
  `,
})
export class History {
  protected readonly data = inject(CreditDataService);
  protected readonly filter = signal<CreditStatus | 'ALL'>('ALL');
  protected readonly filters: { value: CreditStatus | 'ALL'; label: string }[] = [
    { value: 'ALL', label: 'All' }, { value: 'CURRENT', label: 'Current' }, { value: 'LATE', label: 'Late' },
    { value: 'DELINQUENT', label: 'Delinquent' }, { value: 'CLOSED', label: 'Closed' },
  ];
  protected readonly typeLabel = TYPE_LABEL;
  protected readonly statusLabel = STATUS_LABEL;
  protected readonly statusClass = STATUS_CLASS;
  protected readonly color = BEHAVIOR_COLOR;
  protected readonly behaviorLabel = BEHAVIOR_LABEL;

  protected readonly rows = computed(() => {
    const names = new Map((this.data.creditors.value() ?? []).map((c) => [c.id, c.name]));
    const f = this.filter();
    return (this.data.history.value()?.products ?? [])
      .filter((p) => f === 'ALL' || p.status === f)
      .map((p) => ({ ...p, creditorName: names.get(p.creditorId) ?? 'Unknown' }));
  });

  protected reload(): void {
    this.data.history.reload();
    this.data.creditors.reload();
  }
}
