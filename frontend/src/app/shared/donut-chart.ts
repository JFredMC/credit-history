import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export interface DonutSlice { label: string; value: number; color: string; }

@Component({
  selector: 'app-donut-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col items-center gap-4 sm:flex-row">
      <svg viewBox="0 0 120 120" class="h-40 w-40 shrink-0 -rotate-90" role="img" [attr.aria-label]="ariaLabel()">
        <circle cx="60" cy="60" r="44" fill="none" stroke="#f1f5f9" stroke-width="16" />
        @for (a of arcs(); track a.label) {
          <circle cx="60" cy="60" r="44" fill="none" stroke-width="16" [attr.stroke]="a.color"
            [attr.stroke-dasharray]="a.dash" [attr.stroke-dashoffset]="a.offset" />
        }
      </svg>
      <ul class="w-full space-y-2 text-sm">
        @for (a of arcs(); track a.label) {
          <li class="flex items-center justify-between gap-3">
            <span class="flex items-center gap-2 text-slate-600">
              <span class="h-2.5 w-2.5 rounded-full" [style.background]="a.color"></span>{{ a.label }}
            </span>
            <span class="font-medium tabular-nums">{{ a.percent }}%</span>
          </li>
        }
      </ul>
    </div>
  `,
})
export class DonutChart {
  readonly slices = input.required<DonutSlice[]>();
  readonly ariaLabel = input('Distribution chart');

  readonly arcs = computed(() => {
    const total = this.slices().reduce((s, x) => s + x.value, 0) || 1;
    const c = 2 * Math.PI * 44;
    let acc = 0;
    return this.slices().map((s) => {
      const len = (s.value / total) * c;
      const arc = { ...s, percent: Math.round((s.value / total) * 100), dash: `${len} ${c - len}`, offset: -acc };
      acc += len;
      return arc;
    });
  });
}
