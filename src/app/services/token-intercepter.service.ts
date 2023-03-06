import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenIntercepterService {

  constructor(private accountService: AuthService ,public router:Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // add auth header with jwt if account is logged in and request is to the api url
      const account = this.accountService.getToken();
      // //console.log(account)
      // const isApiUrl = request.url.startsWith(environment.apiUrl);
      if (account) {
          request = request.clone({
              setHeaders: { Authorization: `Bearer ${account}` }
          });
      }

      return next.handle(request).pipe( tap(() => {},
      (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.router.navigate(['login']);

        }
      }
    }));
  }
  }