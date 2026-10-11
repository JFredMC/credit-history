import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', title: 'Dashboard · CreditHistory', loadComponent: () => import('./features/dashboard/dashboard').then((m) => m.Dashboard) },
  { path: 'history', title: 'Credit history · CreditHistory', loadComponent: () => import('./features/history/history').then((m) => m.History) },
  { path: 'creditors', title: 'Creditors · CreditHistory', loadComponent: () => import('./features/creditors/creditors').then((m) => m.Creditors) },
  { path: 'creditors/:id', title: 'Creditor · CreditHistory', loadComponent: () => import('./features/creditors/creditor-detail').then((m) => m.CreditorDetail) },
  { path: 'timeline', title: 'Timeline · CreditHistory', loadComponent: () => import('./features/timeline/timeline').then((m) => m.Timeline) },
  { path: 'alerts', title: 'Alerts · CreditHistory', loadComponent: () => import('./features/dashboard/alerts').then((m) => m.Alerts) },
  { path: 'report', title: 'Credit report · CreditHistory', loadComponent: () => import('./features/report/report').then((m) => m.Report) },
  { path: '**', redirectTo: 'dashboard' },
];
