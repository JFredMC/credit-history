import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CreditAlert } from '../../core/models/credit.models';
import { EmptyState } from '../../shared/ui';
import { SEVERITY_CLASS } from '../../shared/labels';

@Component({
  selector: 'app-alerts-list',
  imports: [DatePipe, EmptyState],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="space-y-3">
      @for (a of alerts(); track a.id) {
        <li class="rounded-xl border p-4" [class]="cls[a.severity]">
          <div class="flex items-start justify-between gap-3">
            <p class="font-semibold">{{ a.title }}</p>
            <span class="shrink-0 text-xs opacity-70">{{ a.date | date: 'mediumDate' }}</span>
          </div>
          <p class="mt-1 text-sm">{{ a.message }}</p>
        </li>
      } @empty { <app-empty-state message="No alerts. You're all clear." /> }
    </ul>
  `,
})
export class AlertsList {
  readonly alerts = input.required<CreditAlert[]>();
  protected readonly cls = SEVERITY_CLASS;
}
