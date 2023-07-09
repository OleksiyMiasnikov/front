import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './component/login-page/login-page.component';
import { SignUpPageComponent } from './component/sign-up-page/sign-up-page.component';
import { HeaderComponent } from './common/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './common/footer/footer.component';
import { TokenInterceptorService } from './service/token-interceptor.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PaginationComponent } from './common/pagination/pagination.component';
import { CertificatesWithTagsComponent } from './component/certificates-with-tags/certificates-with-tags.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import { AddNewCertificateComponent } from './component/add-new-certificate/add-new-certificate.component';
import { HeaderLoginComponent } from './component/header-login/header-login.component';
import {AlertComponent} from "./common/alert/alert.component";
import {CdkDrag, CdkDropList} from "@angular/cdk/drag-drop";

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SignUpPageComponent,
    HeaderComponent,
    FooterComponent,
    PaginationComponent,
    CertificatesWithTagsComponent,
    AlertComponent,
    AddNewCertificateComponent,
    HeaderLoginComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ScrollingModule,
    MatPaginatorModule,
    CdkDropList,
    CdkDrag,
  ],
})
export class AppModule {}
