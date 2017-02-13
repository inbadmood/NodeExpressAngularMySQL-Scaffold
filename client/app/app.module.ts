import { NgModule }            from '@angular/core';
import { BrowserModule }       from '@angular/platform-browser';
import { HttpModule }          from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent }        from './app.component';

import { FormComponent }       from './form-component';

@NgModule({
  imports:      [ BrowserModule,
                  HttpModule,
                  ReactiveFormsModule ],
  declarations: [ AppComponent,
                  FormComponent ],
  bootstrap:    [ AppComponent ]
})

export class AppModule {
  constructor() {
  }
}
