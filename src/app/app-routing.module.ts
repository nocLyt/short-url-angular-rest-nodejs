import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component'
import { Four04Component } from './four04/four04.component';

const routes: Routes = [
  { path: '', component:  MainComponent, pathMatch: 'full'},
  { path: 'wrong/:shortURL', component: Four04Component},
  { path: '**', redirectTo: ''}
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})

export class AppRoutingModule {}
