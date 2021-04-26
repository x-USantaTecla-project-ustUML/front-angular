import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FooterViewComponent } from './footer-view/footer-view.component';
import { HeaderViewComponent } from './header-view/header-view.component';
import { MemberViewComponent } from './member-view/member-view.component';
import { NotFoundViewComponent } from './not-found-view/not-found-view.component';
import { DiagramViewComponent } from './member-view/diagram-view/diagram-view.component';
import { RepositoryViewComponent } from './member-view/repository-view/repository-view.component';
import { CommandViewComponent } from './member-view/command-view/command-view.component';
import { PackageViewComponent } from './member-view/package-view/package-view.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterViewComponent,
    HeaderViewComponent,
    MemberViewComponent,
    NotFoundViewComponent,
    DiagramViewComponent,
    RepositoryViewComponent,
    CommandViewComponent,
    PackageViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
