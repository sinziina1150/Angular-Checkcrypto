import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { 

  }


  getAllCurrencyData(Currency:string) {
    return this.http.get<any>(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${Currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
  }


  getTrendingCurrencyData(Currency:string){
    return this.http.get<any>(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${Currency}&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24`)
  }


  getGrpahicalCuurencyData(coinId:string,currency:string,days:number){
    return this.http.get<any>(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`)
  }

  getCurrencyById(currency:string){
    return this.http.get<any>(`https://api.coingecko.com/api/v3/coins/${currency}`)
  }
}
