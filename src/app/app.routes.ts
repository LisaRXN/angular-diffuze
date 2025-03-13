import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { authGuardFunction } from './core/guards/auth.guard';
import { AuthSelectors } from './dashboard/stores/auth/auth.selectors';
import { Store } from '@ngxs/store';
import { AppComponent } from './app.component';
import { LayoutComponent } from './public/layout/layout.component';
import { AnnoncesComponent } from './public/views/annonces/annonces.component';

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
      {
        path: '',
        loadComponent: () =>
          import('./public/views/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
      {
        path: 'notre-offre',
        loadComponent: () =>
          import('./public/views/service/service.component').then(
            (m) => m.ServiceComponent
          ),
      },
      {
        path: 'nos-partenaires',
        loadComponent: () =>
          import('./public/views/review/review.component').then(
            (m) => m.ReviewComponent
          ),
      },
      {
        path: 'annonces',
        loadComponent: () =>
          import('./public/views/annonces/annonces.component').then(
            (m) => m.AnnoncesComponent
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
      {
        path: 'protection-des-donnees',
        loadComponent: () =>
          import('./public/views/rgpd/rgpd.component').then(
            (m) => m.RGPDComponent
          ),
      },
      {
        path: 'conditions-generales',
        loadComponent: () =>
          import('./public/views/cgv/cgv.component').then(
            (m) => m.CGVComponent
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
