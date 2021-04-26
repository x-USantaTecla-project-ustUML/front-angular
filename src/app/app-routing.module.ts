import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MemberViewComponent} from './member-view/member-view.component';
import {NotFoundViewComponent} from './not-found-view/not-found-view.component';

const routes: Routes = [
  { path: 'member-view', component: MemberViewComponent },
  { path: 'notFound', component: NotFoundViewComponent },
  { path: '', redirectTo: 'member-view', pathMatch: 'full' },
  { path: '**', redirectTo: '/notFound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
