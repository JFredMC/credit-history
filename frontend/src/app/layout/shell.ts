import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CreditDataService } from '../core/services/credit-data.service';

@Component({
  selector: 'app-shell',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-slate-950 text-slate-100 lg:flex" [class.light]="!isDark()">
      <header class="flex items-center justify-between border-b border-slate-800 bg-slate-950/90 px-4 py-3 text-slate-100 lg:hidden print:hidden backdrop-blur-sm">
        <div class="flex items-center gap-2">
          <span class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 text-sm font-black text-white">E</span>
          <span class="text-lg font-bold tracking-tight">EXPEDIENTE</span>
        </div>
        <button type="button" class="rounded-md border border-slate-700 px-3 py-1.5 text-sm font-medium text-slate-200"
          [attr.aria-expanded]="open()" (click)="open.set(!open())">Menú</button>
      </header>

      <aside class="border-r border-slate-800 bg-slate-950/95 text-slate-300 lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:shrink-0 lg:flex lg:flex-col print:hidden backdrop-blur-sm"
        [class.hidden]="!open()" [class.lg:block]="true">
        <div class="flex items-center gap-3 px-6 py-6 text-xl font-black tracking-tight text-white">
          <span class="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-sky-500 text-base font-black text-white shadow-lg shadow-indigo-500/30">E</span>
          <span>EXPEDIENTE</span>
        </div>

        <nav class="flex flex-col gap-1 px-3 pb-4 lg:pb-0 lg:flex-1" (click)="open.set(false)" (keydown.enter)="open.set(false)" tabindex="-1">
          @for (l of links; track l.path) {
            <a [routerLink]="l.path" routerLinkActive="bg-indigo-600 text-white shadow-md shadow-indigo-500/20" class="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white hover:shadow-md hover:shadow-indigo-500/10">
              {{ l.label }}
              @if (l.path === '/alerts' && unread() > 0) {
                <span class="ml-2 rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-bold text-white">{{ unread() }}</span>
              }
            </a>
          }
        </nav>

        <div class="border-t border-slate-800 px-6 py-4 space-y-3">
          <p class="text-xs text-slate-400">Demo con datos simulados. No es una oferta ni una entidad financiera real.</p>
          <div class="flex items-center justify-between gap-2">
            <a href="https://jfredmc.github.io/portfolio/" target="_blank" rel="noopener noreferrer"
              class="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition"
              title="Ver portafolio de JFredDev">
              por JFredDev
            </a>
            <button type="button" (click)="toggleTheme()"
              [attr.aria-label]="isDark() ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'"
              class="rounded-lg p-1.5 hover:bg-slate-800 transition"
              [title]="isDark() ? 'Tema claro' : 'Tema oscuro'">
              @if (isDark()) {
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                </svg>
              } @else {
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.536l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm5.657-9.193a1 1 0 00-1.414 0l-.707.707A1 1 0 005.05 13.536l.707.707a1 1 0 001.414-1.414l-.707-.707zM3 8a1 1 0 100 2H2a1 1 0 100-2h1z" clip-rule="evenodd"></path>
                </svg>
              }
            </button>
          </div>
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
  protected readonly isDark = signal(this.detectTheme());
  protected readonly links = [
    { path: '/dashboard', label: 'Panel' },
    { path: '/history', label: 'Historial' },
    { path: '/creditors', label: 'Acreedores' },
    { path: '/timeline', label: 'Cronología' },
    { path: '/alerts', label: 'Alertas' },
    { path: '/report', label: 'Reporte' },
  ];
  protected readonly unread = () => this.data.alerts.value()?.filter((a) => !a.read).length ?? 0;

  private detectTheme(): boolean {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('expediente-theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  }

  toggleTheme() {
    const newTheme = !this.isDark();
    this.isDark.set(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('expediente-theme', newTheme ? 'dark' : 'light');
      const html = document.documentElement;
      if (newTheme) {
        html.classList.remove('light');
      } else {
        html.classList.add('light');
      }
    }
  }
}
