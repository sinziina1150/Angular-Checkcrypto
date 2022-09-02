import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CurrencyService } from 'src/app/service/currency.service';
@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrls: ['./coin-detail.component.scss'],
})
export class CoinDetailComponent implements OnInit {
  coindata: any;
  coinId!: string;

  days: number = 1;

  currency: string = 'USD';

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: `Price Trend`,
        backgroundColor: 'rgba(255,234,234)',
        borderColor: '#fff',
        pointBackgroundColor: '#ff6384',
        pointHoverBorderColor: '#36a2eb',
        pointHoverBackgroundColor: '#ffce56',
      },
    ],
    labels: [],
  };
  public lineChartOption: ChartConfiguration['options'] = {
    elements: {
      point: {
        radius: 1,
      },
    },
    scales: {},
    plugins: {
      legend: { display: true },
    },
  };

  currencyCoin: string = 'USD';

  public lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective) myLineChart!: BaseChartDirective;

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private currencyService: CurrencyService
  ) {}

  ngOnInit(): void {
    console.log(this.currencyCoin)
    this.activatedRoute.params.subscribe((val: any) => {
      this.coinId = val['id'];
    });
    this.currencyService.getCurrency().subscribe((res) => {
      this.currencyCoin = res;
      this.getGraphData();
      this.getCoinData()
    });
    this.getCoinData();
    this.getGraphData();
  }

  getCoinData() {
    console.log(this.currencyCoin)
      this.api.getCurrencyById(this.coinId)
    .subscribe(res => {
     if(this.currencyCoin === 'EUR') {
      res.market_data.current_price.usd = res.market_data.current_price.eur;
      res.market_data.market_cap.usd = res.market_data.market_cap.eur;
     }
      this.coindata = res;
      res.market_data.current_price.usd = res.market_data.current_price.usd;
        res.market_data.market_cap.usd = res.market_data.market_cap.usd;
    });
   
    
  }

  getGraphData() {
    this.api
      .getGrpahicalCuurencyData(this.coinId, this.currencyCoin, 1)
      .subscribe((res) => {
        setTimeout(() => {
          this.myLineChart.chart?.update();
        }, 2000);
        this.lineChartData.datasets[0].data = res.prices.map((a: any) => {
          return a[1];
        });
        this.lineChartData.labels = res.prices.map((a: any) => {
          let date = new Date(a[0]);
          let time =
            date.getHours() > 12
              ? `${date.getHours() - 12}: ${date.getMinutes()} PM`
              : `${date.getHours()}: ${date.getMinutes()} AM`;
          return this.days === 1 ? time : date.toLocaleDateString();
        });
      });
  }

  
}
