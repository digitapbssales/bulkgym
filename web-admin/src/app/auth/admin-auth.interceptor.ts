import {
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import {inject} from '@angular/core';
import {from, throwError} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {AdminAuthService} from './admin-auth.service';

export const adminAuthInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AdminAuthService);

  if (!auth.isSuperAdminSession()) {
    return next(req);
  }

  return from(auth.getAccessToken()).pipe(
    switchMap(token => {
      if (!token) {
        return next(req);
      }
      const authorized = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next(authorized);
    }),
    catchError(error => {
      if (
        error instanceof HttpErrorResponse &&
        (error.status === 401 || error.status === 403)
      ) {
        auth.signOut();
      }
      return throwError(() => error);
    }),
  );
};

