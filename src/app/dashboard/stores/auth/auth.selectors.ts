import { createPropertySelectors, createSelector } from '@ngxs/store';
import { AuthState, AuthStateModel } from './auth.state';
import { jwtDecode } from 'jwt-decode';
import { UserType } from '../../../core/models/enum/user-type.enum';

export class AuthSelectors {
  static slices = createPropertySelectors<AuthStateModel>(AuthState);

  static isPro() {
    return createSelector([AuthSelectors.slices.user], (user) => {
      return user?.user_type === 2;
    });
  }

  static connectedUser() {
    return createSelector([AuthSelectors.slices.user], (user) => {
      return {
        ...user,
        isPro: user?.user_type === UserType.PRO,
      };
    });
  }

  static isLoggedIn() {
    return createSelector([AuthSelectors.slices.token], (token) => {
      if (!token) {
        return false;
      }
      try {
        const decodedToken: { exp: number } = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp > currentTime;
      } catch (error) {
        return false;
      }
    });
  }
}
