import { Routes } from '@angular/router';
import { authGuardFunction } from '../core/guards/auth.guard';
import { DashboardComponent } from './dashboard.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [authGuardFunction],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./views/home/home.component').then((m) => m.HomeComponent),
      },
    ],
  },
];
