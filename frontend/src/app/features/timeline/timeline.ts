import { CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { EventType } from '../../core/models/credit.models';
import { CreditDataService } from '../../core/services/credit-data.service';
import { EVENT_STYLE } from '../../shared/labels';
import { EmptyState, ErrorState, Skeleton } from '../../shared/ui';

@Component({
  selector: 'app-timeline',
  imports: [CurrencyPipe, DatePipe, Skeleton, ErrorState, EmptyState],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1 class="mb-1 text-2xl font-bold">Timeline</h1>
    <p class="mb-6 text-sm text-slate-500">Payments, installments, delays, closures and reports.</p>
    @if (data.history.error()) { <app-error-state (retry)="data.history.reload()" /> }
    @else if (data.history.isLoading()) { <app-skeleton /> }
    @else {
      <div class="mb-4 flex flex-wrap gap-2" role="group" aria-label="Filter by event type">
        @for (f of filters; track f.value) {
          <button type="button" (click)="filter.set(f.value)" [attr.aria-pressed]="filter() === f.value"
            class="rounded-full px-4 py-1.5 text-sm font-medium ring-1 ring-slate-200"
            [class]="filter() === f.value ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'">{{ f.label }}</button>
        }
      </div>
      <ol class="relative ml-4 space-y-6 border-l-2 border-slate-200 pl-8">
        @for (e of events(); track e.id) {
          <li class="relative">
            <span class="absolute -left-[3.15rem] flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white ring-4 ring-slate-50" [class]="style[e.type].cls">{{ style[e.type].icon }}</span>
            <div class="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
              <div class="flex flex-wrap justify-between gap-2"><p class="font-semibold">{{ e.title }}</p><span class="text-xs text-slate-500">{{ e.date | date: 'mediumDate' }}</span></div>
              <p class="mt-1 text-sm text-slate-600">{{ e.description }}</p>
              @if (e.amount) { <p class="mt-1 text-sm font-medium tabular-nums">{{ e.amount | currency: 'COP' : 'symbol-narrow' : '1.0-0' }}</p> }
            </div>
          </li>
        } @empty { <app-empty-state message="No events for this filter." /> }
      </ol>
    }
  `,
})
export class Timeline {
  protected readonly data = inject(CreditDataService);
  protected readonly style = EVENT_STYLE;
  protected readonly filter = signal<EventType | 'ALL'>('ALL');
  protected readonly filters: { value: EventType | 'ALL'; label: string }[] = [
    { value: 'ALL', label: 'All' }, { value: 'PAYMENT', label: 'Payments' }, { value: 'INSTALLMENT', label: 'Installments' },
    { value: 'LATE', label: 'Delays' }, { value: 'CLOSURE', label: 'Closures' }, { value: 'REPORT', label: 'Reports' },
    { value: 'INQUIRY', label: 'Inquiries' },
  ];
  protected readonly events = computed(() => {
    const f = this.filter();
    return (this.data.history.value()?.events ?? [])
      .filter((e) => f === 'ALL' || e.type === f)
      .sort((a, b) => b.date.localeCompare(a.date));
  });
}
