import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './component/login-page/login-page.component';
import { SignUpPageComponent } from './component/sign-up-page/sign-up-page.component';
import { CertificatesComponent } from './component/certificates/certificates.component';
import {CertificatesWithTagsComponent} from "./component/certificates-with-tags/certificates-with-tags.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignUpPageComponent },
  { path: 'certificates', component: CertificatesComponent },
  { path: 'certificates_with_tags', component: CertificatesWithTagsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
