import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-donations',
  templateUrl: './user-donations.component.html',
  styleUrls: ['./user-donations.component.css'],
})
export class UserDonationsComponent implements OnInit {
  displayedColumns: string[] = [
    'CreatedDate',
    'Name',
    'Email',
    'Amount',
    'TransactionId',
    'Status',
  ];
  constructor(
    private auth: AuthService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.loadDonations();
  }
  donorlist: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  loadDonations() {
    this.auth.getDonations().subscribe((result) => {
      this.donorlist = result;
      this.dataSource = new MatTableDataSource(this.donorlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
