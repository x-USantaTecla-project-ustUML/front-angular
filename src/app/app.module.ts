import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FooterViewComponent } from './footer-view/footer-view.component';
import { HeaderViewComponent } from './header-view/header-view.component';
import { LoginDialogComponent } from './header-view/dialogs/login-dialog.component';
import { UserViewComponent } from './user-view/user-view.component';
import { NotFoundViewComponent } from './not-found-view/not-found-view.component';
import { DiagramViewComponent } from './user-view/diagram-view/diagram-view.component';
import { RepositoryViewComponent } from './user-view/repository-view/repository-view.component';
import { CommandViewComponent } from './user-view/command-view/command-view.component';
import { PackageViewComponent } from './user-view/package-view/package-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DemoMaterialModule} from './material-module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { MonacoEditorModule } from 'ngx-monaco-editor';

@NgModule({
  declarations: [
    AppComponent,
    FooterViewComponent,
    HeaderViewComponent,
    LoginDialogComponent,
    UserViewComponent,
    NotFoundViewComponent,
    DiagramViewComponent,
    RepositoryViewComponent,
    CommandViewComponent,
    PackageViewComponent
  ],
  imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      DemoMaterialModule,
      FormsModule,
      HttpClientModule,
      MonacoEditorModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
