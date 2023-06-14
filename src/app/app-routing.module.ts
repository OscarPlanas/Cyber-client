import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerarclausComponent } from './components/generarclaus/generarclaus.component';
import { EncryptDecryptComponent } from './components/encrypt-decrypt/encrypt-decrypt.component';
import { SignVerifyComponent } from './components/sign-verify/sign-verify.component';
import { BlindSignaturesComponent } from './components/blind-signatures/blind-signatures.component';
import { PaillierComponent } from './components/paillier/paillier.component';
import { ShamirComponent } from './components/shamir/shamir.component';
const routes: Routes = [
  { path: '', component: EncryptDecryptComponent },
  { path: 'sign-verify', component: SignVerifyComponent },
  { path: 'blind-sign', component: BlindSignaturesComponent },
  { path: 'paillier', component: PaillierComponent },
  { path: 'shamir', component: ShamirComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
