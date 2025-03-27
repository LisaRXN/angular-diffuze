import { Routes } from '@angular/router';

export const BLOG_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./blog/blog.component').then(
        (m) => m.BlogComponent
      ),
  },
  {
    path: 'type/:id',
    loadComponent: () =>
      import('./blog-list/blog-list.component').then(
        (m) => m.BlogListComponent
      ),
  },
  {
    path: 'categorie/:slug',
    loadComponent: () =>
      import('./blog-list/blog-list.component').then(
        (m) => m.BlogListComponent
      ),
  },
  {
    path: ':slug',
    loadComponent: () =>
      import('./blog-detail/blog-detail.component').then(
        (m) => m.BlogDetailComponent
      ),
  },
  { path: '**', redirectTo: '' },
];
