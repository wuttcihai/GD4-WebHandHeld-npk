import { AfterViewInit, Component, ViewChild, ChangeDetectionStrategy, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StockService } from '../../../service/stock/stock.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { environment } from '../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

export interface Device {
  drugCode: string;
  drugName: string;
  location: string;
  drugPosition: string;
  Quantity: string;
  lot: string;
  exp: string;
}

export interface APIResponse {
  status: number;
  data?: any;
}

@Component({
  selector: 'app-stockrobot',
  standalone: false,
  
  templateUrl: './stockrobot.component.html',
  styleUrl: './stockrobot.component.scss'
})
export class StockrobotComponent implements AfterViewInit {
  apiUrl = localStorage.getItem("pharmacycode") == "OPD" ? environment.apiURLopd : environment.apiURLipd;
  displayedColumns: string[] = ['drugCode', 'drugName', 'location', 'drugPosition', 'Quantity', 'lot', 'exp'];
  dataSource: MatTableDataSource<Device> = new MatTableDataSource<Device>();
  errorMessage = '';
  resData: any;
  loading: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  // readonly dialog = inject(MatDialog);
  constructor(
    private stockervice: StockService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.loading = true;
    this.stockervice.getStockDihAll().subscribe({
      next: (response) => {
        if (response.status == 200) {
          this.resData = response.data;
          this.dataSource = new MatTableDataSource(this.resData);

          // กำหนดค่า paginator และ sort ทันที
          this.loading = false;
          setTimeout(() => {
            if (this.paginator && this.sort) {
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }
          });
        } else {
          this.loading = false;
        }
      },
      error: (err) => {
        console.error('Login Failed:', err);
        this.loading = false;
      },
    });

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
