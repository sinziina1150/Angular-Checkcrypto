import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private seletedCurrency$: BehaviorSubject<string> = new BehaviorSubject<string>("USD")
  constructor() {
   }
  getCurrency(){
   return this.seletedCurrency$.asObservable()
  }


  setCurrency(currency:string){
    return this.seletedCurrency$.next(currency)
  }

}
