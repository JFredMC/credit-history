import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', title: 'Dashboard · EXPEDIENTE', loadComponent: () => import('./features/dashboard/dashboard').then((m) => m.Dashboard) },
  { path: 'history', title: 'Historial · EXPEDIENTE', loadComponent: () => import('./features/history/history').then((m) => m.History) },
  { path: 'creditors', title: 'Acreedores · EXPEDIENTE', loadComponent: () => import('./features/creditors/creditors').then((m) => m.Creditors) },
  { path: 'creditors/:id', title: 'Acreedor · EXPEDIENTE', loadComponent: () => import('./features/creditors/creditor-detail').then((m) => m.CreditorDetail) },
  { path: 'timeline', title: 'Timeline · EXPEDIENTE', loadComponent: () => import('./features/timeline/timeline').then((m) => m.Timeline) },
  { path: 'alerts', title: 'Alertas · EXPEDIENTE', loadComponent: () => import('./features/dashboard/alerts').then((m) => m.Alerts) },
  { path: 'report', title: 'Reporte · EXPEDIENTE', loadComponent: () => import('./features/report/report').then((m) => m.Report) },
  { path: '**', redirectTo: 'dashboard' },
];
