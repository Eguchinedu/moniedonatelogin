import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin } from '../types/login';
import { Observable, find, map } from 'rxjs';
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
  getDonations(): Observable<any> {
    return this.http.get(this.baseUrl + 'Donation');
  }
  createUser(data: ICreateUser): Observable<any> {
    return this.http.post(this.baseUrl + 'User', data);
  }
  getUsers(): Observable<any> {
    return this.http.get(this.baseUrl + 'User');
  }
  deleteUser(id: number):Observable<any>{
    return this.http.delete(this.baseUrl + 'User/' + id)
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  getToken() {
    return localStorage.getItem('token');
  }
// isLoggedIn(): boolean{

//   return !!localStorage.getItem('token');
// }
  isLoggedIn() {
    return this.getRoles() && this.getToken() ? true : false;
  }
  setRoles(roles: string) {
    localStorage.setItem('roles', roles);
  }
  getRoles() {
    return localStorage.getItem('roles');
  }
  roleMatch(allowedRoles: string):boolean{
    let isMatch = false;
    const userRoles: any = this.getRoles();
    if (userRoles === allowedRoles) {
      isMatch = true;
      return isMatch;
    } else {
return isMatch;
    }
  }
  clear(){
    localStorage.clear()
  }
 

  signOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
    this.toastr.success('Logged out', 'Bye!');
  }
}
