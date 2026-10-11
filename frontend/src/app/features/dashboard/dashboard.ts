import { CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CreditDataService } from '../../core/services/credit-data.service';
import { BarList } from '../../shared/bar-list';
import { DonutChart } from '../../shared/donut-chart';
import { BEHAVIOR_COLOR, BEHAVIOR_LABEL, CHART_COLORS, TYPE_LABEL } from '../../shared/labels';
import { LineChart } from '../../shared/line-chart';
import { ErrorState, Skeleton } from '../../shared/ui';
import { AlertsList } from './alerts-list';

@Component({
  selector: 'app-dashboard',
  imports: [CurrencyPipe, DatePipe, RouterLink, LineChart, DonutChart, BarList, AlertsList, Skeleton, ErrorState],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (data.summary.error()) { <app-error-state (retry)="data.summary.reload()" /> }
    @else if (data.summary.isLoading() || !data.summary.hasValue()) { <app-skeleton /> }
    @else {
      @let s = data.summary.value()!;
      <div class="mb-6 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 class="text-2xl font-bold">Hello, {{ s.user.fullName }}</h1>
          <p class="text-sm text-slate-500">Last updated {{ s.lastUpdate | date: 'longDate' }} · simulated data</p>
        </div>
        <a routerLink="/report" class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">View full report</a>
      </div>

      <section class="grid gap-4 lg:grid-cols-3">
        <div class="rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 p-6 text-white shadow-lg">
          <p class="text-sm opacity-80">Credit score</p>
          <svg viewBox="0 0 200 110" class="mx-auto mt-2 w-full max-w-xs" role="img" [attr.aria-label]="'Score ' + s.score + ' of ' + s.scoreMax">
            <path d="M20 100 A80 80 0 0 1 180 100" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="14" stroke-linecap="round" />
            <path d="M20 100 A80 80 0 0 1 180 100" fill="none" stroke="#fff" stroke-width="14" stroke-linecap="round"
              pathLength="100" [attr.stroke-dasharray]="scorePct() + ' 100'" />
            <text x="100" y="85" text-anchor="middle" font-size="36" font-weight="700" fill="#fff">{{ s.score }}</text>
            <text x="100" y="102" text-anchor="middle" font-size="10" fill="#e0e7ff">{{ s.scoreMin }} – {{ s.scoreMax }}</text>
          </svg>
          <p class="mt-2 text-center">
            <span class="font-semibold">{{ s.scoreLabel }}</span>
            <span class="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-xs">{{ s.scoreChange > 0 ? '+' : '' }}{{ s.scoreChange }} vs last month</span>
          </p>
        </div>

        <div class="grid grid-cols-2 gap-4 lg:col-span-2">
          @for (k of kpis(); track k.label) {
            <div class="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <p class="text-xs uppercase tracking-wide text-slate-500">{{ k.label }}</p>
              <p class="mt-2 text-xl font-bold sm:text-2xl" [class]="k.cls">
                @if (k.money) { {{ k.value | currency: 'COP' : 'symbol-narrow' : '1.0-0' }} } @else { {{ k.value }}{{ k.suffix }} }
              </p>
              <p class="mt-1 text-xs text-slate-400">{{ k.hint }}</p>
            </div>
          }
        </div>
      </section>

      <section class="mt-6 grid gap-4 lg:grid-cols-3">
        <div class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:col-span-2">
          <h2 class="mb-4 font-semibold">Score — last 12 months</h2>
          @if (data.scoreTrend.value(); as t) { <app-line-chart [data]="trend()" /> } @else { <div class="h-48 animate-pulse rounded-xl bg-slate-100"></div> }
        </div>
        <div class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div class="mb-4 flex items-center justify-between">
            <h2 class="font-semibold">Alerts</h2>
            <a routerLink="/alerts" class="text-sm text-indigo-600 hover:underline">All</a>
          </div>
          @if (data.alerts.value(); as al) { <app-alerts-list [alerts]="al.slice(0, 3)" /> }
        </div>
      </section>

      <section class="mt-6 grid gap-4 lg:grid-cols-2">
        <div class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 class="mb-4 font-semibold">Debt by credit type</h2>
          <app-donut-chart [slices]="typeSlices()" ariaLabel="Debt by credit type" />
        </div>
        <div class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 class="mb-4 font-semibold">Payment behavior (last 12 months)</h2>
          <app-bar-list [items]="behaviorBars()" />
        </div>
      </section>
    }
  `,
})
export class Dashboard {
  protected readonly data = inject(CreditDataService);

  protected readonly scorePct = computed(() => {
    const s = this.data.summary.value();
    return s ? ((s.score - s.scoreMin) / (s.scoreMax - s.scoreMin)) * 100 : 0;
  });

  protected readonly kpis = computed(() => {
    const s = this.data.summary.value();
    if (!s) return [];
    return [
      { label: 'Total debt', value: s.totalDebt, money: true, suffix: '', hint: `${s.activeProducts} active products`, cls: '' },
      { label: 'Monthly installments', value: s.monthlyInstallments, money: true, suffix: '', hint: 'Committed each month', cls: '' },
      { label: 'Overdue debt', value: s.overdueDebt, money: true, suffix: '', hint: s.overdueDebt ? 'Needs attention' : 'None', cls: s.overdueDebt ? 'text-rose-600' : 'text-emerald-600' },
      { label: 'On-time payments', value: s.onTimePaymentRate, money: false, suffix: '%', hint: `Credit utilization ${s.creditUtilization}%`, cls: 'text-emerald-600' },
    ];
  });

  protected readonly trend = computed(() =>
    (this.data.scoreTrend.value() ?? []).map((p) => ({
      label: new Date(p.month + '-01T00:00:00').toLocaleString('en', { month: 'short' }),
      value: p.score,
    })),
  );

  protected readonly typeSlices = computed(() =>
    (this.data.summary.value()?.typeBreakdown ?? []).map((t, i) => ({
      label: TYPE_LABEL[t.type], value: t.amount, color: CHART_COLORS[i % CHART_COLORS.length],
    })),
  );

  protected readonly behaviorBars = computed(() =>
    (this.data.summary.value()?.paymentBreakdown ?? []).map((b) => ({
      label: BEHAVIOR_LABEL[b.behavior], value: b.count, color: BEHAVIOR_COLOR[b.behavior],
    })),
  );
}
