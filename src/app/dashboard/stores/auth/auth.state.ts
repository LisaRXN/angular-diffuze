import { State, Action, StateContext } from '@ngxs/store';
import { catchError, first, tap } from 'rxjs/operators';
import { AuthGateway } from '../../../core/ports/auth.gateway';
import {
  Login,
  Logout,
  LoginSuccess,
  LoginFailure,
  SetRegisterStep,
  Register,
  RegisterSuccess,
  RegisterFailure,
  UpdateUserType,
  ForgotPassword,
  ResetPassword,
  ForgotPasswordSuccess,
  ForgotPasswordFailure,
  ResetPasswordSuccess,
  ResetPasswordFailure,
  UpdateUser,
  UpdateUserPassword,
  UpdateUserAICredits,
} from './auth.actions';
import { inject } from '@angular/core';
import { of } from 'rxjs';
import { User } from '../../../core/models/user.model';

export interface AuthStateModel {
  token: string | null;
  loginError: string | null;
  registerError: string | null;
  isLoading: boolean;
  lastForgotPwdDate: Date | null;
  user: User | null;
  registerForm: {
    model: any;
    dirty: boolean;
    status: string;
    errors: any;
  };
  registerStep: number;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    registerForm: {
      model: undefined,
      dirty: false,
      status: '',
      errors: {},
    },
    registerStep: 1,
    user: null,
    token: null,
    loginError: null,
    registerError: null,
    isLoading: false,
    lastForgotPwdDate: null,
  },
})
export class AuthState {
  authGateway: AuthGateway = inject(AuthGateway);

  //Admin
  @Action(UpdateUserType)
  updateUserType(ctx: StateContext<AuthStateModel>, action: UpdateUserType) {
    const state = ctx.getState();

    console.log('state: ', state);
    if (!state.user) {
      throw new Error('User state is not initialized');
    }

    const updatedUser = {
      ...state.user,
      user_type: action.user_type,
    };

    ctx.patchState({
      user: updatedUser,
    });

    // Enregistrer les modifications dans le backend
    return this.authGateway.updateUserType(updatedUser);
  }

  @Action(UpdateUser)
  updateUser(ctx: StateContext<AuthStateModel>, action: UpdateUser) {
    const state = ctx.getState();

    console.log('state: ', state);
    if (!state.user) {
      throw new Error('User state is not initialized');
    }
    console.log('action.user: ', action.user);

    // Créer une copie de l'utilisateur existant, tout en modifiant user_type
    const updatedUser = {
      ...state.user,
      firstName: action.user.firstName,
      lastName: action.user.lastName,
      society: action.user.society,
      mail: action.user.mail,
      phone: action.user.phone,
    };
    console.log('updatedUser: ', updatedUser);

    // Utiliser patchState pour mettre à jour seulement la partie `user` du state
    ctx.patchState({
      user: updatedUser,
    });

    // Enregistrer les modifications dans le backend
    return this.authGateway.updateUser(updatedUser);
  }

  @Action(UpdateUserPassword)
  updateUserPassword(
    ctx: StateContext<AuthStateModel>,
    action: UpdateUserPassword
  ) {
    const state = ctx.getState();

    console.log('state: ', state);
    if (!state.user) {
      throw new Error('User state is not initialized');
    }
    console.log('action.passwordForm: ', action.passwordForm);

    // Enregistrer les modifications dans le backend
    return this.authGateway.updateUserPassword(
      state.user.mail || '',
      action.passwordForm.currentPassword,
      action.passwordForm.newPassword
    );
  }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    ctx.patchState({ isLoading: true });
    return this.authGateway.login(action.loginForm).pipe(
      tap((result) => {
        console.log('result: ', result.response);
        ctx.patchState({
          token: result.response.token,
          loginError: null,
          isLoading: false,
        });

        ctx.dispatch(new LoginSuccess(result.response));
      }),
      catchError((error) => {
        const errorMessage =
          error.error?.response?.message || 'Login failed due to unknown error';
        console.log('errorMessage: ', errorMessage);
        ctx.dispatch(new LoginFailure(errorMessage));
        return of(error); // Retournez l'erreur pour la chaîne d'observables
      })
    );
  }

  @Action(LoginSuccess)
  loginSuccess(
    context: StateContext<AuthStateModel>,
    action: LoginSuccess
  ): void {
    console.log('login success', action.data.user);
    //utiliser un décorator pour formtter les données
    context.patchState({
      user: action.data.user,
    });
  }

  @Action(LoginFailure)
  loginFailure(ctx: StateContext<AuthStateModel>, action: LoginFailure) {
    ctx.patchState({ loginError: action.error, isLoading: false });
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    ctx.setState({
      token: null,
      loginError: null,
      registerError: null,
      lastForgotPwdDate: null,
      isLoading: false,
      user: null,
      registerStep: 1,
      registerForm: {
        model: undefined,
        dirty: false,
        status: '',
        errors: {},
      },
    });
  }

  @Action(SetRegisterStep)
  setRegisterStep(ctx: StateContext<AuthStateModel>, action: SetRegisterStep) {
    ctx.patchState({ registerStep: action.step });
  }

  @Action(Register)
  Register(ctx: StateContext<AuthStateModel>, action: Register) {
    ctx.patchState({ isLoading: true });
    return this.authGateway.register(action.RegisterForm).pipe(
      tap((result) => {
        console.log('result: ', result);
        ctx.patchState({
          registerError: null,
          isLoading: false,
        });

        ctx.dispatch(new RegisterSuccess(result.response));
      }),
      catchError((error) => {
        const errorMessage =
          error.error?.response?.message ||
          'Register failed due to unknown error';
        console.log('errorMessage: ', errorMessage);
        ctx.dispatch(new RegisterFailure(errorMessage));
        return of(error); // Retournez l'erreur pour la chaîne d'observables
      })
    );
  }

  @Action(RegisterSuccess)
  RegisterSuccess(
    context: StateContext<AuthStateModel>,
    action: RegisterSuccess
  ): void {
    console.log('Register success', action.data.user);
    //set register step to 1
    context.dispatch(new SetRegisterStep(1));
    //utiliser un décorator pour formtter les données
    /* context.patchState({
      user: action.data.user,
    }); */
  }

  @Action(RegisterFailure)
  RegisterFailure(ctx: StateContext<AuthStateModel>, action: RegisterFailure) {
    ctx.patchState({ registerError: action.error, isLoading: false });
  }

  @Action(ForgotPassword)
  forgotPassword(ctx: StateContext<AuthStateModel>, action: ForgotPassword) {
    console.log(
      'ctx.getState().lastForgotPwdDate: ',
      ctx.getState().lastForgotPwdDate
    );
    if (ctx.getState().lastForgotPwdDate) {
      const lastForgotPwdDate = ctx.getState().lastForgotPwdDate!;
      console.log('lastForgotPwdDate: ', lastForgotPwdDate);
      const now = new Date();
      console.log('now: ', now);
      const diffTime = Math.abs(
        now.getTime() - new Date(lastForgotPwdDate).getTime()
      );
      console.log('diffTime: ', diffTime);
      const diffMinutes = Math.ceil(diffTime / (1000 * 60));
      console.log('diffMinutes: ', diffMinutes);
      if (diffMinutes < 10) {
        ctx.dispatch(
          new ForgotPasswordFailure(
            `Veuillez attendre 10 minutes avant de faire une nouvelle demande. Il vous reste ${
              10 - diffMinutes
            } minutes à attendre.`
          )
        );
        return of(null);
      }
    }

    ctx.patchState({ isLoading: true });
    ctx.patchState({ lastForgotPwdDate: new Date() });
    console.log(
      'ctx.getState().lastForgotPwdDate: ',
      ctx.getState().lastForgotPwdDate
    );
    return this.authGateway.forgotPassword(action.email).pipe(
      tap((result) => {
        console.log('result: ', result);
        ctx.patchState({
          isLoading: false,
        });
        ctx.dispatch(new ForgotPasswordSuccess(result.response));
      }),
      catchError((error) => {
        const errorMessage =
          error.error?.response?.message ||
          'Forgot password failed due to unknown error';
        console.log('errorMessage: ', errorMessage);
        ctx.patchState({
          isLoading: false,
        });
        ctx.dispatch(new ForgotPasswordFailure(errorMessage));

        return of(error); // Retournez l'erreur pour la chaîne d'observables
      })
    );
  }

  @Action(ForgotPasswordSuccess)
  forgotPasswordSuccess(
    context: StateContext<AuthStateModel>,
    action: ForgotPasswordSuccess
  ): void {
    console.log('forgot password success', action.data);
  }

  @Action(ForgotPasswordFailure)
  forgotPasswordFailure(
    ctx: StateContext<AuthStateModel>,
    action: ForgotPasswordFailure
  ): void {
    console.log('forgot password failure', action.error);
  }

  @Action(ResetPassword)
  resetPassword(ctx: StateContext<AuthStateModel>, action: ResetPassword) {
    ctx.patchState({ isLoading: true });
    return this.authGateway
      .resetPassword(action.email, action.password, action.token)
      .pipe(
        tap((result) => {
          console.log('result: ', result);
          ctx.patchState({
            isLoading: false,
          });
          ctx.dispatch(new ResetPasswordSuccess(result.message));
        }),
        catchError((error) => {
          console.log('error: ', error);
          const errorMessage =
            error.error?.error || 'Reset password failed due to unknown error';
          console.log('errorMessage: ', errorMessage);
          ctx.patchState({
            isLoading: false,
          });
          ctx.dispatch(new ResetPasswordFailure(errorMessage));
          return of(error); // Retournez l'erreur pour la chaîne d'observables
        })
      );
  }

  @Action(ResetPasswordSuccess)
  resetPasswordSuccess(
    context: StateContext<AuthStateModel>,
    action: ResetPasswordSuccess
  ): void {
    console.log('reset password success', action.data);
  }

  @Action(ResetPasswordFailure)
  resetPasswordFailure(
    ctx: StateContext<AuthStateModel>,
    action: ResetPasswordFailure
  ): void {
    console.log('reset password failure', action.error);
  }
}
