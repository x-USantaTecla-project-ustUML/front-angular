import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {FooterViewComponent} from './footer-view/footer-view.component';
import {HeaderViewComponent} from './header-view/header-view.component';
import {LoginDialogComponent} from './header-view/dialogs/login-dialog.component';
import {RegisterDialogComponent} from './header-view/dialogs/register-dialog.component';
import {UserViewComponent} from './user-view/user-view.component';
import {NotFoundViewComponent} from './not-found-view/not-found-view.component';
import {DiagramViewComponent} from './user-view/diagram-view/diagram-view.component';
import {RepositoryViewComponent} from './user-view/repository-view/repository-view.component';
import {CommandViewComponent} from './user-view/command-view/command-view.component';
import {PackageViewComponent} from './user-view/package-view/package-view.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DemoMaterialModule} from './material-module';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MonacoEditorModule} from 'ngx-monaco-editor';
import {AuthService} from './shared/auth.service';
import {HttpService} from './shared/http.service';
import {RoleGuardService} from './shared/role-guard.service';
import {TokenInterceptor} from './shared/token.interceptor';
import {HomeViewComponent} from './home-view/home-view.component';
import { ResizableDirective } from './shared/Directives/resizable.directive';
import { DocumentationViewComponent } from './documentation-view/documentation-view.component';
import { DocsLanguageViewComponent } from './documentation-view/docs-language-view/docs-language-view.component';
import { DocsLanguageGrammarViewComponent } from './documentation-view/docs-language-grammar-view/docs-language-grammar-view.component';
import { DocsIntroViewComponent } from './documentation-view/docs-intro-view/docs-intro-view.component';
import { ExpandedImageComponent } from './user-view/dialogs/expanded-image/expanded-image.component';
import { DocsCommandSemanticViewComponent } from './documentation-view/docs-command-semantic-view/docs-command-semantic-view.component';
import { DocsCommonCommandsViewComponent } from './documentation-view/docs-common-commands-view/docs-common-commands-view.component';
import { DocsDirectEngineeringViewComponent } from './documentation-view/docs-direct-engineering-view/docs-direct-engineering-view.component';
import { DocsInverseEngineeringViewComponent } from './documentation-view/docs-inverse-engineering-view/docs-inverse-engineering-view.component';
import { ClipboardModule } from 'ngx-clipboard';
import { DocsUserAccountContextViewComponent } from './documentation-view/docs-user-account-context-view/docs-user-account-context-view.component';
import { ProjectPackageContextViewComponent } from './documentation-view/project-package-context-view/project-package-context-view.component';
import { ClassInterfaceContextViewComponent } from './documentation-view/class-interface-context-view/class-interface-context-view.component';
import { EnumContextViewComponent } from './documentation-view/enum-context-view/enum-context-view.component';
import {CodemirrorModule} from '@ctrl/ngx-codemirror';

@NgModule({
  declarations: [
    AppComponent,
    FooterViewComponent,
    HeaderViewComponent,
    LoginDialogComponent,
    RegisterDialogComponent,
    UserViewComponent,
    NotFoundViewComponent,
    DiagramViewComponent,
    RepositoryViewComponent,
    CommandViewComponent,
    PackageViewComponent,
    HomeViewComponent,
    ResizableDirective,
    DocumentationViewComponent,
    ExpandedImageComponent,
    DocumentationViewComponent,
    DocsLanguageViewComponent,
    DocsLanguageGrammarViewComponent,
    DocsIntroViewComponent,
    DocsCommandSemanticViewComponent,
    DocsCommonCommandsViewComponent,
    DocsDirectEngineeringViewComponent,
    DocsInverseEngineeringViewComponent,
    DocsUserAccountContextViewComponent,
    ProjectPackageContextViewComponent,
    ClassInterfaceContextViewComponent,
    EnumContextViewComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ClipboardModule,
        BrowserAnimationsModule,
        DemoMaterialModule,
        FormsModule,
        HttpClientModule,
        NgbModule,
        MonacoEditorModule.forRoot(),
        CodemirrorModule
    ],
  providers: [
    AuthService,
    HttpService,
    RoleGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
