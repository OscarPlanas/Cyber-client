import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GenerarclausComponent } from './components/generarclaus/generarclaus.component';
import { EncryptDecryptComponent } from './components/encrypt-decrypt/encrypt-decrypt.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClickOutsideDirective } from './click-outside.directive';
import { SignVerifyComponent } from './components/sign-verify/sign-verify.component';

@NgModule({
  declarations: [
    AppComponent,
    GenerarclausComponent,
    EncryptDecryptComponent,
    ClickOutsideDirective,
    SignVerifyComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
