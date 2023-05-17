import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerarclausComponent } from './components/generarclaus/generarclaus.component';
import { EncryptDecryptComponent } from './components/encrypt-decrypt/encrypt-decrypt.component';
import { SignVerifyComponent } from './components/sign-verify/sign-verify.component';

const routes: Routes = [
  { path: '', component: EncryptDecryptComponent },
  { path: 'sign-verify', component: SignVerifyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
