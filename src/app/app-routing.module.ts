import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreviousComponent } from './previous/previous.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"previous",component:PreviousComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
