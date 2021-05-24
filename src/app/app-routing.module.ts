import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeViewComponent} from './home-view/home-view.component';
import {UserViewComponent} from './user-view/user-view.component';
import {NotFoundViewComponent} from './not-found-view/not-found-view.component';

const routes: Routes = [
  { path: '', component: HomeViewComponent },
  { path: 'user-view', component: UserViewComponent },
  { path: 'notFound', component: NotFoundViewComponent },
  { path: '', redirectTo: 'home-view', pathMatch: 'full' },
  { path: '**', redirectTo: '/notFound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
