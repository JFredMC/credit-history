import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="animate-pulse space-y-4" aria-busy="true" aria-label="Loading">
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      @for (i of [1, 2, 3, 4]; track i) { <div class="h-28 rounded-2xl bg-slate-200"></div> }
    </div>
    <div class="h-64 rounded-2xl bg-slate-200"></div>
  </div>`,
})
export class Skeleton {}

@Component({
  selector: 'app-error-state',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="rounded-2xl border border-rose-200 bg-rose-50 p-8 text-center" role="alert">
    <p class="font-semibold text-rose-800">We couldn't load your credit data</p>
    <p class="mt-1 text-sm text-rose-700">Check your connection and try again.</p>
    <button type="button" (click)="retry.emit()" class="mt-4 rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700">Retry</button>
  </div>`,
})
export class ErrorState { readonly retry = output<void>(); }

@Component({
  selector: 'app-empty-state',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500">{{ message() }}</div>`,
})
export class EmptyState { readonly message = input('Nothing to show here yet.'); }
