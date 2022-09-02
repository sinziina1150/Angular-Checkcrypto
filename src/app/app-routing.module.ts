import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoinDetailComponent } from './component/coin-detail/coin-detail.component';
import { CoinListComponent } from './component/coin-list/coin-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'coin-list', pathMatch: 'full' },
  { path: 'coin-list', component: CoinListComponent },
  { path: 'coin-detail', component: CoinDetailComponent },
  {path:'coin-detail/:id',component:CoinDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
