import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { PSideNavComponent } from './p-side-nav/p-side-nav.component';
import { MenuService } from './menu.service';
import { PSideNavsComponent } from './p-side-navs/p-side-navs.component';

@NgModule({
  declarations: [
    AppComponent,
    PSideNavComponent,
    PSideNavsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [MenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
