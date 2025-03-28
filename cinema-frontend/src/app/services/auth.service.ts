import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn$ = new BehaviorSubject<boolean>(false);
  private credentials: string | null = null;

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    const basicAuth = btoa(`${username}:${password}`);
    const headers = new HttpHeaders({
      Authorization: `Basic ${basicAuth}`
    });

    return this.http.get('http://localhost:8080/api/films/past', {
      headers,
      withCredentials: true
    }).pipe(
      tap(() => {
        this.credentials = basicAuth;
        this.loggedIn$.next(true);
      }),
      map(() => true),
      catchError(() => of(false))
    );
  }

  logout() {
    this.credentials = null;
    this.loggedIn$.next(false);
  }

  getAuthorizationHeader(): string | null {
    return this.credentials ? `Basic ${this.credentials}` : null;
  }

  isLoggedIn() {
    return this.loggedIn$.value;
  }
}
