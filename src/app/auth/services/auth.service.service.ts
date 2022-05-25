import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, map, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { AuthResponse, Usuario } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;

  private _usuario!: Usuario;

  get usuario() {
    return { ...this._usuario };
  }

  get admin() {
    if (this._usuario.roll == 'admin') {
      return true;
    }
    return false;
  }

  constructor(private http: HttpClient) {}

  register(name: string, email: string, password: string) {
    const url = `${this.baseUrl}/home/register`;
    const roll = 'user';
    const body = { name, email, password, roll };

    return this.http.post<AuthResponse>(url, body).pipe(
      tap(({ ok, token }) => {
        if (ok) {
          localStorage.setItem('token', token!);
        }
      }),
      map((resp) => resp.ok),
      catchError((err) => of(err.error.msg))
    );
  }

  login(email: string, password: string) {
    const url = `${this.baseUrl}/home`;
    const body = { email, password };

    return this.http.post<AuthResponse>(url, body).pipe(
      tap((resp) => {
        if (resp.ok) {
          localStorage.setItem('token', resp.token!);
        }
      }),
      map((resp) => resp),
      catchError((err) => of(err.error.msg))
    );
  }

  validarToken(): Observable<boolean> {
    const url = `${this.baseUrl}/home/renew`;
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );

    return this.http.get<AuthResponse>(url, { headers }).pipe(
      map((resp) => {
        localStorage.setItem('token', resp.token!);
        this._usuario = {
          name: resp.name!,
          uid: resp.uid!,
          email: resp.email!,
          carrito: resp.carrito!,
          compras: resp.compras!,
          roll: resp.roll!,
        };
        return resp.ok;
      }),
      catchError((err) => of(false))
    );
  }

  logOut() {
    localStorage.clear();
  }
}
