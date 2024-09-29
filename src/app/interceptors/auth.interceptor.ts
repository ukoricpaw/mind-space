import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import AuthService from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  isRefresh = false;

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(req).pipe(
      catchError((res: any) => {
        if ((res.status === 401 || res.status === 403) && !this.isRefresh) {
          this.isRefresh = true;
          return this.authService.refreshUser();
        }
        this.isRefresh = false;
        return throwError(res);
      }),
    );
  }
}
