import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CreditDataService } from '../core/services/credit-data.service';

@Component({
  selector: 'app-shell',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen lg:flex">
      <header class="flex items-center justify-between bg-slate-900 px-4 py-3 text-white lg:hidden print:hidden">
        <span class="font-semibold">Credit<span class="text-indigo-400">History</span></span>
        <button type="button" class="rounded-md border border-slate-600 px-3 py-1 text-sm"
          [attr.aria-expanded]="open()" (click)="open.set(!open())">Menu</button>
      </header>
      <aside class="bg-slate-900 text-slate-300 lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:shrink-0 print:hidden"
        [class.hidden]="!open()" [class.lg:block]="true">
        <div class="hidden p-6 text-xl font-bold text-white lg:block">Credit<span class="text-indigo-400">History</span></div>
        <nav class="flex flex-col gap-1 px-3 pb-4 lg:pb-0" (click)="open.set(false)" (keydown.enter)="open.set(false)" tabindex="-1">
          @for (l of links; track l.path) {
            <a [routerLink]="l.path" routerLinkActive="bg-indigo-600 text-white" class="rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-slate-800 hover:text-white">
              {{ l.label }}
              @if (l.path === '/alerts' && unread() > 0) {
                <span class="ml-2 rounded-full bg-rose-500 px-2 py-0.5 text-xs text-white">{{ unread() }}</span>
              }
            </a>
          }
        </nav>
        <p class="hidden px-6 pt-6 text-xs text-slate-500 lg:block">Demo with simulated data. Not affiliated with DataCrédito.</p>
      </aside>
      <main class="min-w-0 flex-1 p-4 sm:p-8"><router-outlet /></main>
    </div>
  `,
})
export class Shell {
  private readonly data = inject(CreditDataService);
  protected readonly open = signal(false);
  protected readonly links = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/history', label: 'Credit history' },
    { path: '/creditors', label: 'Creditors' },
    { path: '/timeline', label: 'Timeline' },
    { path: '/alerts', label: 'Alerts' },
    { path: '/report', label: 'Credit report' },
  ];
  protected readonly unread = () => this.data.alerts.value()?.filter((a) => !a.read).length ?? 0;
}
