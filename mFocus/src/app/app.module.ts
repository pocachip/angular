import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { WebUIComponent } from './web-ui/web-ui.component';
import { WebContainerComponent } from './web-container/web-container.component';
import { WebCarouselComponent } from './web-carousel/web-carousel.component';
import { PosterComponent } from './poster/poster.component';
import { PosterContainerComponent } from './poster-container/poster-container.component';

import { MatIconModule } from '@angular/material/icon';
import { IndicatorComponent } from './indicator/indicator.component';

@NgModule({
  declarations: [
    AppComponent,
    WebUIComponent,
    WebContainerComponent,
    WebCarouselComponent,
    PosterComponent,
    PosterContainerComponent,
    IndicatorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule
  ],
  exports: [
    MatIconModule
  ],
  providers: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
