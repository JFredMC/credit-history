import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-line-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg viewBox="0 0 600 220" class="w-full h-auto" role="img" aria-label="Score trend over the last 12 months">
      <defs>
        <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#4f46e5" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#4f46e5" stop-opacity="0" />
        </linearGradient>
      </defs>
      @for (g of grid(); track g.y) {
        <line x1="40" [attr.x2]="590" [attr.y1]="g.y" [attr.y2]="g.y" stroke="#e2e8f0" />
        <text x="34" [attr.y]="g.y + 4" text-anchor="end" font-size="10" fill="#94a3b8">{{ g.label }}</text>
      }
      <path [attr.d]="area()" fill="url(#area)" />
      <path [attr.d]="line()" fill="none" stroke="#4f46e5" stroke-width="3" stroke-linejoin="round" />
      @for (p of points(); track p.x) {
        <circle [attr.cx]="p.x" [attr.cy]="p.y" r="4" fill="#fff" stroke="#4f46e5" stroke-width="2">
          <title>{{ p.label }}: {{ p.value }}</title>
        </circle>
        <text [attr.x]="p.x" y="212" text-anchor="middle" font-size="10" fill="#94a3b8">{{ p.label }}</text>
      }
    </svg>
  `,
})
export class LineChart {
  readonly data = input.required<{ label: string; value: number }[]>();

  private readonly range = computed(() => {
    const values = this.data().map((d) => d.value);
    const min = Math.floor((Math.min(...values) - 10) / 10) * 10;
    const max = Math.ceil((Math.max(...values) + 10) / 10) * 10;
    return { min, max: max === min ? min + 10 : max };
  });

  readonly points = computed(() => {
    const d = this.data();
    const { min, max } = this.range();
    return d.map((p, i) => ({
      x: 50 + (d.length > 1 ? (i * 530) / (d.length - 1) : 265),
      y: 180 - ((p.value - min) / (max - min)) * 160,
      label: p.label,
      value: p.value,
    }));
  });

  readonly line = computed(() => this.points().map((p, i) => `${i ? 'L' : 'M'}${p.x},${p.y}`).join(' '));

  readonly area = computed(() => {
    const pts = this.points();
    if (!pts.length) return '';
    return `${this.line()} L${pts[pts.length - 1].x},180 L${pts[0].x},180 Z`;
  });

  readonly grid = computed(() => {
    const { min, max } = this.range();
    return [0, 1, 2, 3].map((i) => ({ y: 180 - i * 53.33, label: Math.round(min + ((max - min) * i) / 3) }));
  });
}
