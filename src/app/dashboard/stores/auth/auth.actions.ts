import { UserType } from '../../../core/models/enum/user-type.enum';

// Login
export class Login {
  static readonly type = '[Auth] Login';
  constructor(public loginForm: any) {}
}
export class Logout {
  static readonly type = '[Auth] Logout';
}
export class LoginSuccess {
  static readonly type = '[Auth] Login Success';
  constructor(public data: any) {}
}
export class LoginFailure {
  static readonly type = '[Auth] Login Failure';
  constructor(public error: any) {}
}

// Register
export class Register {
  static readonly type = '[Auth] Register';
  constructor(public RegisterForm: any) {}
}
export class RegisterSuccess {
  static readonly type = '[Auth] Register Success';
  constructor(public data: any) {}
}
export class RegisterFailure {
  static readonly type = '[Auth] Register Failure';
  constructor(public error: any) {}
}
export class SetRegisterStep {
  static readonly type = '[Auth] Set Register Current Step';
  constructor(public step: number) {}
}

// Forgot Password
export class ForgotPassword {
  static readonly type = '[Auth] Forgot Password';
  constructor(public email: string) {}
}
export class ForgotPasswordSuccess {
  static readonly type = '[Auth] Forgot Password Success';
  constructor(public data: any) {}
}
export class ForgotPasswordFailure {
  static readonly type = '[Auth] Forgot Password Failure';
  constructor(public error: any) {}
}

// Reset Password
export class ResetPassword {
  static readonly type = '[Auth] Reset Password';
  constructor(
    public email: string,
    public password: string,
    public token: string
  ) {}
}
export class ResetPasswordSuccess {
  static readonly type = '[Auth] Reset Password Success';
  constructor(public data: any) {}
}
export class ResetPasswordFailure {
  static readonly type = '[Auth] Reset Password Failure';
  constructor(public error: any) {}
}

// Update User
export class UpdateUser {
  static readonly type = '[Auth] Update User';
  constructor(public user: any) {}
}
export class UpdateUserAICredits {
  static readonly type = '[Auth] Update User AI Credits';
  constructor(public remainingAICredits: number) {}
}

// Update User Password
export class UpdateUserPassword {
  static readonly type = '[Auth] Update User Password';
  constructor(public passwordForm: any) {}
}

//Admin
export class UpdateUserType {
  static readonly type = '[Auth] Update User Type';
  constructor(public user_type: UserType) {}
}
