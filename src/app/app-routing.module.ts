import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {HomepageComponent} from "./homepage/homepage.component";

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
