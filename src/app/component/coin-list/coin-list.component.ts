import { Component, OnInit, AfterContentInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { CurrencyService } from 'src/app/service/currency.service';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.scss'],
})
export class CoinListComponent implements OnInit {
  bannerData: any = [];

  currency :string = "USD"

  displayedColumns: string[] = ['symbol', 'current_price', 'price_change_percentage_24h', 'market_cap'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private api: ApiService,private router:Router,private currencyService:CurrencyService) {
    
  }

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.getAlldata();
    this.getBannerData();
    this.currencyService.getCurrency().subscribe(val => {
      this.currency = val
      this.getAlldata()
      this.getBannerData()
    })
  }

  getBannerData() {
    this.api.getTrendingCurrencyData(this.currency).subscribe((res) => {
      this.bannerData = res;
});
  }

  getAlldata() {
    this.api.getAllCurrencyData(this.currency).subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  gotoDetail(row:any){
    this.router.navigate(['coin-detail',row.id])
  }

}
