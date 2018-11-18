import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent} from './home/home.component';
import { DogsComponent} from './dogs/dogs.component';

const routes: Routes = [

  {path: 'home', component: HomeComponent},
  {path: 'dog', component: DogsComponent, children: [
      {path: ':breed', component: DogsComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
