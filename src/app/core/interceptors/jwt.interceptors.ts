import {
  HttpRequest,
  HttpInterceptor,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { AuthSelectors } from '../../dashboard/stores/auth/auth.selectors';
import { Store } from '@ngxs/store';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const currentToken = inject(Store).selectSnapshot(
      AuthSelectors.slices.token
    );

    if (currentToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentToken}`,
        },
      });
    }
    console.log('interceptor request: ', request);
    return next.handle(request);
  }
}
