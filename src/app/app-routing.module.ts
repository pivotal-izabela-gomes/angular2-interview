import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {HomepageComponent} from "./homepage/homepage.component";
import {ListComponent} from "./list/list.component";

const routes: Routes = [
 {
    path: 'homepage',
    component: HomepageComponent
  },
  {
    path: '',
    redirectTo: '/homepage',
    pathMatch: 'full'
  },
  {
    path: 'list/:id',
    component: ListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
