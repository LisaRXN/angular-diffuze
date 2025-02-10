import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthSelectors } from '../../dashboard/stores/auth/auth.selectors';

export function authGuardFunction() {
  const store = inject(Store);
  const router = inject(Router);

  const isLoggedIn = store.selectSnapshot(AuthSelectors.isLoggedIn());

  if (!isLoggedIn) {
    return router.navigate(['/auth/login']);
  }

  return true;
}
