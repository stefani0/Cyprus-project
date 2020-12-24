import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultLayoutComponent } from './core/components/default-layout/default-layout.component';

import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './core/components/login/login.component';
import { formlyConfig } from './core/utility/configs';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { Error404Component } from './core/components/error404/error404.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment.prod';
import { FormlySelectComponent } from './dashboard/components/formly-select/formly-select.component';
import { ButtoniFormComponent, DatatableFormComponent } from './core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ToasterModule } from 'angular2-toaster';
import { ErrorInterceptor, fakeBackendProvider, JwtInterceptor } from './core/helpers';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];


@NgModule({
  declarations: [
    AppComponent,
    APP_CONTAINERS,
    LoginComponent,
    Error404Component,
    FormlySelectComponent,
    DatatableFormComponent,
    ButtoniFormComponent,
 

  ],
  imports: [
    FormlyModule.forRoot(formlyConfig),
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    FormlyBootstrapModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxDatatableModule,
    BrowserAnimationsModule, // required animations module
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    ToasterModule.forRoot(), 
  


   FormlyModule.forChild({
    types: [
      {
        name: 'custom-select',
        component: FormlySelectComponent,
        extends: 'select',
      },
    ],
    validationMessages: [
      { name: 'required', message: 'This field is required!' },
    ],
  }),
  ],
  exports : [
    FormsModule,
    FormlyBootstrapModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToasterModule

  ],
  providers: [

    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider,


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
