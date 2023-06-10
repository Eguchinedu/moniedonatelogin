import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { CreateUserComponent } from '../create-user/create-user.component';
import { ToastrService } from 'ngx-toastr';
import { DeleteUserComponent } from '../delete-user/delete-user.component';



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
    'Actions',
  ];
  constructor(
    private auth: AuthService,
    private dialog: MatDialog,
    private toastr: ToastrService,
  ) {}
  ngOnInit(): void {
    this.loadUser();
  }
  userlist: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  setRoles(roles: string) {
    return this.auth.roleMatch(roles);
  }
  loadUser() {
    this.auth.getUsers().subscribe((result) => {
      this.userlist = result;
      this.dataSource = new MatTableDataSource(this.userlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  createUser() {
    this.dialog.open(CreateUserComponent, {
      width: '350px',
      hasBackdrop: true,
      
    });
  }
  deleteUser(name: string) {

    return this.dialog.open(DeleteUserComponent, {
      width: '350px',
      hasBackdrop: true,
      disableClose: true,
      data: {
        name: 'hollaa',
      },
    }).afterClosed().subscribe((result) => {
      if (result === true) {
        this.auth.deleteUser(name).subscribe((result) => {
      this.toastr.success('User deleted successfully');
      this.loadUser();
    })
      }
   
    });
  }
}
