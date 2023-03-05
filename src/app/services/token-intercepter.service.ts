import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenIntercepterService {

  constructor(private accountService: AuthService) { }

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

      return next.handle(request);
  }
}