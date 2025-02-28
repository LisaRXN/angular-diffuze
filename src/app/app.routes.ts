import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { authGuardFunction } from './core/guards/auth.guard';
import { AuthSelectors } from './dashboard/stores/auth/auth.selectors';
import { Store } from '@ngxs/store';
import { AppComponent } from './app.component';
import { LayoutComponent } from './public/layout/layout.component';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [
      () => !inject(Store).selectSnapshot(AuthSelectors.isLoggedIn()),
    ],
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./auth/views/login/login/login.component').then(
            (m) => m.LoginComponent
          ),
      },
    ],
  },

  {
    path: '',
    component: LayoutComponent,
    children: [
      // {
      //   path: '',
      //   pathMatch: 'full',
      //   redirectTo: 'home',
      // },
      {
        path: '',
        loadComponent: () =>
          import('./public/views/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
      {
        path: 'service',
        loadComponent: () =>
          import('./public/views/service/service.component').then(
            (m) => m.ServiceComponent
          ),
      },
      {
        path: 'review',
        loadComponent: () =>
          import('./public/views/review/review.component').then(
            (m) => m.ReviewComponent
          ),
      },
      {
        path: 'blog',
        loadChildren: () =>
          import('./public/views/blog/blog.routes').then((m) => m.BLOG_ROUTES),
      },
      {
        path: 'profil',
        loadComponent: () =>
          import('./public/views/profil/profil.component').then(
            (m) => m.ProfilComponent
          ),
      },
    ],
  },
  {
    path: 'dashboard',
    canActivate: [authGuardFunction],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.route').then((m) => m.DASHBOARD_ROUTES),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
