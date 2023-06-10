import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit, DoCheck {
  isMenuRequired = false;
  constructor(private router: Router,private auth: AuthService) {}
  ngOnInit(): void {
  }
  ngDoCheck(): void {
    let currentUrl = this.router.url;
    if (currentUrl.includes('/login')) {
      this.isMenuRequired = false;
    } else {
      this.isMenuRequired = true;
    }
  }
  setRoles(roles: string) {
    return this.auth.roleMatch(roles);
  }
  isLoggedIn(){
    return this.auth.isLoggedIn()
  }
  signOut() {
    this.auth.signOut();
  }
}
