import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './component/login-page/login-page.component';
import { SignUpPageComponent } from './component/sign-up-page/sign-up-page.component';
import {CertificatesWithTagsComponent} from "./component/certificates-with-tags/certificates-with-tags.component";
import {AddNewCertificateComponent} from "./component/add-new-certificate/add-new-certificate.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignUpPageComponent },
  { path: 'certificates_with_tags', component: CertificatesWithTagsComponent },
  { path: 'certificates_with_tags/add_new', component: AddNewCertificateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
