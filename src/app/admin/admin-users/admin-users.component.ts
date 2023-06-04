import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { CreateUserComponent } from '../create-user/create-user.component';



@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
})
export class AdminUsersComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'FirstName',
    'Username',
    'Email',
    'Role',
    'CreatedDate',
    'LastLogin',
  ];
  constructor(private auth: AuthService, private dialog: MatDialog) {}
ngOnInit(): void {
    this.loadUser();
}
  userlist: any;
  dataSource:any;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  loadUser() {
    this.auth.getUsers().subscribe((result) => {
      this.userlist = result;
      this.dataSource = new MatTableDataSource(this.userlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(result);  
    });
  }

  createUser(){
    this.dialog.open(CreateUserComponent, {
      width: '350px',
      hasBackdrop: true,
    });
  }
}
