// auth.ts
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginRequest } from '../interfaces/login-request';
import { jwtDecode } from 'jwt-decode';
import { LoginResponse } from '../interfaces/login-response';
import { catchError, map, Observable, tap } from 'rxjs';
import { RegisterRequest } from '../interfaces/register-request';
import { RegisterResponse } from '../interfaces/register-response';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  apiUrl: string = environment.apiUrl;
  private tokenKey = 'token';
  private userKey = 'user';

  constructor(private http: HttpClient) { }

  login(data: LoginRequest): Observable<LoginResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<LoginResponse>(
      `${this.apiUrl}auth/login`,
      data,
      { headers }
    ).pipe(
      tap((response) => {
        localStorage.setItem(this.tokenKey, response.token);
        localStorage.setItem(this.userKey, JSON.stringify({
          nombreUsuario: response.nombreUsuario,
          rol: response.rol
        }));
      })
    );
  }

  register(data: RegisterRequest): Observable<RegisterResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<RegisterResponse>(
      `${this.apiUrl}auth/register`,
      data,
      { headers }
    ).pipe(
      catchError(error => {
        // Manejo centralizado de errores
        console.error('Error en registro:', error);
        throw error;
      })
    );
  }
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    return !this.isTokenExpired();
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserInfo(): { nombreUsuario: string, rol: string } | null {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  getRole(): string | null {
    const user = this.getUserInfo();
    return user ? user.rol : null;
  }

  private isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;
    const decoded = jwtDecode(token);
    const isTokenExpired = Date.now() >= decoded['exp']! * 1000;
    if (isTokenExpired) this.logout();
    return isTokenExpired;
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }
}