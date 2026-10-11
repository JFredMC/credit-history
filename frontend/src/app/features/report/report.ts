import { CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CreditDataService } from '../../core/services/credit-data.service';
import { STATUS_CLASS, STATUS_LABEL, TYPE_LABEL } from '../../shared/labels';
import { ErrorState, Skeleton } from '../../shared/ui';
import { downloadFile, productsToCsv } from './export';

@Component({
  selector: 'app-report',
  imports: [CurrencyPipe, DatePipe, Skeleton, ErrorState],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (data.summary.error() || data.history.error() || data.creditors.error()) { <app-error-state (retry)="reload()" /> }
    @else if (!data.summary.hasValue() || !data.history.hasValue() || !data.creditors.hasValue()) { <app-skeleton /> }
    @else {
      @let s = data.summary.value()!;
      <div class="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <h1 class="text-2xl font-bold">Credit report</h1>
        <div class="flex flex-wrap gap-2">
          <button type="button" (click)="exportJson()" class="rounded-lg bg-white px-4 py-2 text-sm font-medium ring-1 ring-slate-300 hover:bg-slate-100">Export JSON</button>
          <button type="button" (click)="exportCsv()" class="rounded-lg bg-white px-4 py-2 text-sm font-medium ring-1 ring-slate-300 hover:bg-slate-100">Export CSV</button>
          <button type="button" (click)="print()" class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">Print / PDF</button>
        </div>
      </div>
      <article class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-10">
        <header class="border-b border-slate-200 pb-4">
          <p class="text-xs uppercase tracking-widest text-indigo-600">Personal credit report · demo</p>
          <h2 class="mt-1 text-2xl font-bold">{{ s.user.fullName }}</h2>
          <p class="text-sm text-slate-500">{{ s.user.documentType }} {{ s.user.documentNumber }} · {{ s.user.city }} · Generated {{ s.lastUpdate | date: 'longDate' }}</p>
        </header>
        <section class="grid grid-cols-2 gap-4 py-6 sm:grid-cols-4">
          <div><p class="text-xs text-slate-500">Score</p><p class="text-2xl font-bold">{{ s.score }}</p></div>
          <div><p class="text-xs text-slate-500">Total debt</p><p class="text-lg font-bold">{{ s.totalDebt | currency: 'COP' : 'symbol-narrow' : '1.0-0' }}</p></div>
          <div><p class="text-xs text-slate-500">Overdue</p><p class="text-lg font-bold text-rose-600">{{ s.overdueDebt | currency: 'COP' : 'symbol-narrow' : '1.0-0' }}</p></div>
          <div><p class="text-xs text-slate-500">On-time payments</p><p class="text-lg font-bold">{{ s.onTimePaymentRate }}%</p></div>
        </section>
        <h3 class="mb-2 font-semibold">Credit products</h3>
        <div class="overflow-x-auto">
          <table class="w-full min-w-[640px] text-left text-sm">
            <thead class="text-xs uppercase text-slate-500"><tr><th class="py-2">Creditor</th><th>Product</th><th>Type</th><th class="text-right">Balance</th><th class="pl-4">Status</th></tr></thead>
            <tbody class="divide-y divide-slate-100">
              @for (p of data.history.value()!.products; track p.id) {
                <tr><td class="py-2">{{ names().get(p.creditorId) }}</td><td>{{ p.name }}</td><td>{{ typeLabel[p.type] }}</td>
                  <td class="text-right tabular-nums">{{ p.balance | currency: 'COP' : 'symbol-narrow' : '1.0-0' }}</td>
                  <td class="pl-4"><span class="rounded-full px-2 py-0.5 text-xs" [class]="statusClass[p.status]">{{ statusLabel[p.status] }}</span></td></tr>
              }
            </tbody>
          </table>
        </div>
        <p class="mt-8 text-xs text-slate-400">All data is simulated for demonstration purposes and is not a real credit report.</p>
      </article>
    }
  `,
})
export class Report {
  protected readonly data = inject(CreditDataService);
  protected readonly typeLabel = TYPE_LABEL;
  protected readonly statusLabel = STATUS_LABEL;
  protected readonly statusClass = STATUS_CLASS;
  protected readonly names = computed(() => new Map((this.data.creditors.value() ?? []).map((c) => [c.id, c.name])));

  protected reload(): void {
    this.data.summary.reload();
    this.data.history.reload();
    this.data.creditors.reload();
  }
  protected print(): void { window.print(); }
  protected exportJson(): void {
    const report = {
      summary: this.data.summary.value(), creditors: this.data.creditors.value(),
      history: this.data.history.value(), alerts: this.data.alerts.value(),
    };
    downloadFile('credit-report.json', JSON.stringify(report, null, 2), 'application/json');
  }
  protected exportCsv(): void {
    downloadFile('credit-products.csv', productsToCsv(this.data.history.value()?.products ?? [], this.names()), 'text/csv');
  }
}
