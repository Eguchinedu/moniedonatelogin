import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin } from '../types/login';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ICreateUser } from '../types/create-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}
  baseUrl = 'https://api.monieplan.com/api/';

  login(data: ILogin): Observable<any> {
    console.log('geting data from login service', data);
    return this.http.post(this.baseUrl + 'Auth/login', data);
  }
  createUser(data: ICreateUser): Observable<any> {
    return this.http.post(this.baseUrl + 'User', data);
  }
  getUsers(): Observable<any> {
    return this.http.get(this.baseUrl + 'User');
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
    this.toastr.success('Logged out', 'Bye!');
  }
}
