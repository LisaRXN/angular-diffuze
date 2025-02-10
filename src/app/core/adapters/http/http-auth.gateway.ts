import { Observable } from 'rxjs';
import { AuthGateway } from '../../../core/ports/auth.gateway';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { inject } from '@angular/core';
import { User } from '../../../core/models/user.model';

export class HttpAuthGateway extends AuthGateway {
  http = inject(HttpClient);

  override login(loginForm: any): Observable<any> {
    let mail = loginForm.email;
    let password = loginForm.password;
    console.log('loginForm ', loginForm);
    return this.http.post(environment.apiURL + `/auth/DEVlogin`, {
      mail,
      password,
    });
  }

  override register(registerForm: any): Observable<any> {
    return this.http.post(environment.apiURL + `/auth/DEVregister`, {
      registerForm,
    });
  }

  override updateUserType(user: User): Observable<any> {
    return this.http.post(environment.apiURL + `/auth/DEVupdateUserType`, {
      user,
    });
  }

  override updateUser(user: User): Observable<any> {
    return this.http.post(environment.apiURL + `/user/update`, {
      user,
    });
  }

  override updateUserPassword(
    mail: string,
    oldPassword: string,
    password: string
  ): Observable<any> {
    return this.http.post(environment.apiURL + `/user/password/update`, {
      mail,
      oldPassword,
      password,
    });
  }

  override forgotPassword(email: string): Observable<any> {
    return this.http.post(environment.apiURL + `/auth/forgotPassword`, {
      email,
    });
  }

  override resetPassword(
    email: string,
    password: string,
    token: string
  ): Observable<any> {
    return this.http.post(environment.apiURL + `/auth/resetPassword`, {
      email,
      password,
      token,
    });
  }
}
