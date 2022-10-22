import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public isAuthenticated$ = new BehaviorSubject<boolean>(false);
  public adminAuthenticated$ = new BehaviorSubject<boolean>(false);
  private baseApi = environment.apiUrl;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router
  ) {
    this.authenticate();
  }

  public authenticate(): void {
    const isAuthenticated = localStorage.getItem('token') === null;

    if (!isAuthenticated) {
      this.httpClient
        .get(`${this.baseApi}/users/profile`)
        .pipe(
          tap(() =>
          {
            if (this.getUserRole() === 'Admin') {
                this.adminAuthenticated$.next(true);
            } else {
                this.adminAuthenticated$.next(false);
            }
            this.isAuthenticated$.next(true);
          }),
          catchError((err) => {
            this.isAuthenticated$.next(false);
            return throwError(() => new Error(err));
          })
        )
        .subscribe();
    } else if (isAuthenticated) {
      this.isAuthenticated$.next(false);
    } else {
      this.isAuthenticated$.next(true);
    }
  }

  public getUserRole(): string {
    const token = localStorage.getItem('token') || "";
    const decodedToken = this.decodeToken(token);
    if (token) {
      return decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    }
    return '';
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticated$.next(false);
    this.adminAuthenticated$.next(false);
    this.router.navigate(['/login']);
  }

  private decodeToken(token: string): any {
    try {
      return decode(token);
    } catch {
      return null;
    }
  }
}
