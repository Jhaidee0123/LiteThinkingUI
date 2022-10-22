import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseApi = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  public login(credentials: {
    email: string;
    password: string;
  }): Observable<{ token: string }> {
    console.log(this.baseApi);
    return this.httpClient.post<{ token: string }>(
      `${this.baseApi}/users/login`,
      credentials
    );
  }
}
