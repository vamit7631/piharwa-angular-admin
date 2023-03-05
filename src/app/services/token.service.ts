
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

// import { environment } from '@environments/environment';
// import { AccountService } from '@app/_services';

@Injectable()
export class TokenService implements HttpInterceptor {
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