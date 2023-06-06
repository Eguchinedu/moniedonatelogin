import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-users',
  templateUrl: './user-users.component.html',
  styleUrls: ['./user-users.component.css'],
})
export class UserUsersComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'FirstName',
    'Username',
    'Email',
    'Role',
    'CreatedDate',
    'LastLogin',
  ];
  constructor(
    private auth: AuthService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.loadUser();
  }
  userlist: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  loadUser() {
    this.auth.getUsers().subscribe((result) => {
      this.userlist = result;
      this.dataSource = new MatTableDataSource(this.userlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(result);
    });
  }

 
}
