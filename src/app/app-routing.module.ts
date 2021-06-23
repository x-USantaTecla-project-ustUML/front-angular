import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeViewComponent} from './home-view/home-view.component';
import {UserViewComponent} from './user-view/user-view.component';
import {NotFoundViewComponent} from './not-found-view/not-found-view.component';
import {DocumentationViewComponent} from './documentation-view/documentation-view.component';
import {DocsLanguageViewComponent} from './documentation-view/docs-language-view/docs-language-view.component';
import {DocsLanguageGrammarViewComponent} from './documentation-view/docs-language-grammar-view/docs-language-grammar-view.component';
import {DocsIntroViewComponent} from './documentation-view/docs-intro-view/docs-intro-view.component';
import {DocsCommandSemanticViewComponent} from './documentation-view/docs-command-semantic-view/docs-command-semantic-view.component';
import {DocsInverseEngineeringViewComponent} from './documentation-view/docs-inverse-engineering-view/docs-inverse-engineering-view.component';
import {DocsDirectEngineeringViewComponent} from './documentation-view/docs-direct-engineering-view/docs-direct-engineering-view.component';
import {DocsCommonCommandsViewComponent} from './documentation-view/docs-common-commands-view/docs-common-commands-view.component';
import {DocsUserAccountContextViewComponent} from './documentation-view/docs-user-account-context-view/docs-user-account-context-view.component';
import {EnumContextViewComponent} from './documentation-view/enum-context-view/enum-context-view.component';
import {ProjectPackageContextViewComponent} from './documentation-view/project-package-context-view/project-package-context-view.component';
import {ClassInterfaceContextViewComponent} from './documentation-view/class-interface-context-view/class-interface-context-view.component';

const routes: Routes = [
  { path: '', component: HomeViewComponent },
  { path: 'user-view', component: UserViewComponent },
  { path: 'docs-view', component: DocumentationViewComponent, children: [
      { path: 'introduction', component: DocsIntroViewComponent, outlet: 'intro'},
      { path: 'language', component: DocsLanguageViewComponent, outlet: 'intro'},
      { path: 'language-grammar', component: DocsLanguageGrammarViewComponent, outlet: 'intro'},
      { path: 'command-semantic', component: DocsCommandSemanticViewComponent, outlet: 'intro'},
      { path: 'common-commands', component: DocsCommonCommandsViewComponent, outlet: 'intro'},
      { path: 'inverse-engineering', component: DocsInverseEngineeringViewComponent, outlet: 'intro'},
      { path: 'direct-engineering', component: DocsDirectEngineeringViewComponent, outlet: 'intro'},
      { path: 'user-context', component: DocsUserAccountContextViewComponent, outlet: 'intro'},
      { path: 'enum-context', component: EnumContextViewComponent, outlet: 'intro'},
      { path: 'project-context', component: ProjectPackageContextViewComponent, outlet: 'intro'},
      { path: 'class-context', component: ClassInterfaceContextViewComponent, outlet: 'intro'},
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
