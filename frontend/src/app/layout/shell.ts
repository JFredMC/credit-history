import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CreditDataService } from '../core/services/credit-data.service';

@Component({
  selector: 'app-shell',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-slate-950 text-slate-100 lg:flex">
      <header class="flex items-center justify-between border-b border-slate-800 bg-slate-950/90 px-4 py-3 text-slate-100 lg:hidden print:hidden backdrop-blur-sm">
        <div class="flex items-center gap-2">
          <span class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 text-sm font-black text-white">E</span>
          <span class="text-lg font-bold tracking-tight">EXPEDIENTE</span>
        </div>
        <button type="button" class="rounded-md border border-slate-700 px-3 py-1.5 text-sm font-medium text-slate-200"
          [attr.aria-expanded]="open()" (click)="open.set(!open())">Menu</button>
      </header>

      <aside class="border-r border-slate-800 bg-slate-950/95 text-slate-300 lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:shrink-0 print:hidden backdrop-blur-sm"
        [class.hidden]="!open()" [class.lg:block]="true">
        <div class="flex items-center gap-3 px-6 py-6 text-xl font-black tracking-tight text-white">
          <span class="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-sky-500 text-base font-black text-white shadow-lg shadow-indigo-500/20">E</span>
          <span>EXPEDIENTE</span>
        </div>

        <nav class="flex flex-col gap-1 px-3 pb-4 lg:pb-0" (click)="open.set(false)" (keydown.enter)="open.set(false)" tabindex="-1">
          @for (l of links; track l.path) {
            <a [routerLink]="l.path" routerLinkActive="bg-indigo-600 text-white shadow-md shadow-indigo-500/20" class="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white">
              {{ l.label }}
              @if (l.path === '/alerts' && unread() > 0) {
                <span class="ml-2 rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-bold text-white">{{ unread() }}</span>
              }
            </a>
          }
        </nav>

        <div class="hidden border-t border-slate-800 px-6 pt-5 text-xs text-slate-400 lg:block">
          Demo con datos simulados. No es una oferta ni una entidad financiera real.
        </div>
      </aside>

      <main class="min-w-0 flex-1 bg-slate-100 p-4 text-slate-900 sm:p-8 dark:bg-slate-950 dark:text-slate-100">
        <router-outlet />
      </main>
    </div>
  `,
})
export class Shell {
  private readonly data = inject(CreditDataService);
  protected readonly open = signal(false);
  protected readonly links = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/history', label: 'Historial' },
    { path: '/creditors', label: 'Acreedores' },
    { path: '/timeline', label: 'Timeline' },
    { path: '/alerts', label: 'Alertas' },
    { path: '/report', label: 'Reporte' },
  ];
  protected readonly unread = () => this.data.alerts.value()?.filter((a) => !a.read).length ?? 0;
}
