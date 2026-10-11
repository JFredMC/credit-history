import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-bar-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="space-y-3">
      @for (b of bars(); track b.label) {
        <li>
          <div class="mb-1 flex justify-between text-sm">
            <span class="text-slate-600">{{ b.label }}</span>
            <span class="font-medium tabular-nums">{{ b.value }}</span>
          </div>
          <div class="h-2 rounded-full bg-slate-100">
            <div class="h-2 rounded-full" [style.width.%]="b.pct" [style.background]="b.color"></div>
          </div>
        </li>
      }
    </ul>
  `,
})
export class BarList {
  readonly items = input.required<{ label: string; value: number; color: string }[]>();
  readonly bars = computed(() => {
    const max = Math.max(1, ...this.items().map((i) => i.value));
    return this.items().map((i) => ({ ...i, pct: (i.value / max) * 100 }));
  });
}
