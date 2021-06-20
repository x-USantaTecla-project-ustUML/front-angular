import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeViewComponent} from './home-view/home-view.component';
import {UserViewComponent} from './user-view/user-view.component';
import {NotFoundViewComponent} from './not-found-view/not-found-view.component';
import {DocumentationViewComponent} from './documentation-view/documentation-view.component';
import {DocsIntroductionViewComponent} from './documentation-view/docs-introduction-view/docs-introduction-view.component';

const routes: Routes = [
  { path: '', component: HomeViewComponent },
  { path: 'user-view', component: UserViewComponent },
  { path: 'docs-view', component: DocumentationViewComponent, children: [
      { path: 'introduction', component: DocsIntroductionViewComponent, outlet: 'intro'},
    ]},
  { path: 'notFound', component: NotFoundViewComponent },
  { path: '', redirectTo: 'home-view', pathMatch: 'full' },
  { path: '**', redirectTo: '/notFound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
