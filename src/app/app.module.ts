import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AZURE_PROVIDERS, AZURE_MODULES } from './app.azure';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, AZURE_MODULES, HttpClientModule,
  ],
  providers: [ AZURE_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
