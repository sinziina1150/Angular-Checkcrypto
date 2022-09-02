import { Component } from '@angular/core';
import { ApiService } from './service/api.service';
import { CurrencyService } from './service/currency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crypto-check';
  selectedCurrency:string = "USD"
  constructor(private api:ApiService,private currencySerivces:CurrencyService){
    
  }

  sendCurrency(event:string) {
    this.currencySerivces.setCurrency(event);
  }
}
