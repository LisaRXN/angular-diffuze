import { Observable } from 'rxjs';
import { UserType } from '../models/enum/user-type.enum';
import { User } from '../models/user.model';

export abstract class AuthGateway {
  abstract login(loginForm: any): Observable<any>;
  abstract register(registerForm: any): Observable<any>;

  abstract updateUserType(user: User): Observable<any>;

  abstract updateUser(user: User): Observable<any>;
  abstract updateUserPassword(
    email: string,
    currentPassword: string,
    newPassword: string
  ): Observable<any>;

  abstract forgotPassword(email: string): Observable<any>;
  abstract resetPassword(
    email: string,
    password: string,
    token: string
  ): Observable<any>;
}
