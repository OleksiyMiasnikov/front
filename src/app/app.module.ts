import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './component/login-page/login-page.component';
import { SignUpPageComponent } from './component/sign-up-page/sign-up-page.component';
import { HeaderComponent } from './component/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MenuIconsComponent } from './component/menu-icons/menu-icons.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './component/footer/footer.component';
import { CertificatesComponent } from './component/certificates/certificates.component';
import { TokenInterceptorService } from './service/token-interceptor.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PaginationComponent } from './component/pagination/pagination.component';
import { CertificatesWithTagsComponent } from './component/certificates-with-tags/certificates-with-tags.component';
import { GlobalErrorComponent } from './component/global-error/global-error.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import { AddNewCertificateComponent } from './component/add-new-certificate/add-new-certificate.component';
import { HeaderLoginComponent } from './component/header-login/header-login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SignUpPageComponent,
    HeaderComponent,
    FooterComponent,
    CertificatesComponent,
    PaginationComponent,
    CertificatesWithTagsComponent,
    GlobalErrorComponent,
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
        MenuIconsComponent,
        BrowserAnimationsModule,
        ScrollingModule,
        MatPaginatorModule,
    ],
})
export class AppModule {}
