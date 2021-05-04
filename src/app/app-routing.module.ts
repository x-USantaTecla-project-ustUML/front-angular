import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserViewComponent} from './user-view/user-view.component';
import {NotFoundViewComponent} from './not-found-view/not-found-view.component';

const routes: Routes = [
  { path: 'user-view', component: UserViewComponent },
  { path: 'notFound', component: NotFoundViewComponent },
  { path: '', redirectTo: 'user-view', pathMatch: 'full' },
  { path: '**', redirectTo: '/notFound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
