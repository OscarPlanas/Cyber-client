import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as bcu from 'bigint-crypto-utils';
import { MyRsaPublicKey } from 'src/app/models/publickey';
import { MyRsaPrivateKey } from 'src/app/models/privatekey';
import * as bc from 'bigint-conversion'


interface SignedMessage {
  signed2: string;
}

interface VerifiedMessage {
  verified: string;
}

@Component({
  selector: 'app-sign-verify',
  templateUrl: './sign-verify.component.html',
  styleUrls: ['./sign-verify.component.css']
})
export class SignVerifyComponent implements OnInit {
  textToSign: FormGroup;
  d: string;
  n: string;
  message: bigint;
  messagetoverify: bigint;
  d2: bigint;
  n2: bigint;
  signedMessage: SignedMessage | undefined;
  verifiedMessage: VerifiedMessage | undefined;

  constructor(private formBuilder: FormBuilder) {
    this.d = "";
    this.n = "";
    this.d2 = 0n;
    this.n2 = 0n;
    
    this.message = 0n;
    this.messagetoverify = 0n;
    this.textToSign = this.formBuilder.group({});
   }

   ngOnInit(): void {
    this.textToSign = this.formBuilder.group({
      message: [''],
      messagetoverify: ['']
    });
      console.log("hola");
      this.getPrivateKeys();
  }

  getPrivateKeys = async () => {
    const res = await axios.get('http://localhost:3000/privateKey')
    console.log(res.data);

    this.d = res.data.d;
    this.n = res.data.n;
    console.log(this.d);
    console.log(this.n);
    this.d2 = bc.base64ToBigint(this.d);
    this.n2 = bc.base64ToBigint(this.n);
    console.log(this.d2);
    console.log(this.n2);
  }

  signMessage() {
    console.log('Signing message:', this.textToSign.value.message);
    console.log(this.d2);
    console.log(this.n2);
    const privateKey = new MyRsaPrivateKey((this.d2), (this.n2));
    
    const message2 = BigInt(this.textToSign.value.message);
    console.log(message2);
    const signed = privateKey.sign(message2);
    console.log(signed);
    const signed2 = bc.bigintToBase64(signed);
    this.signedMessage = { signed2 };
    console.log("en base 64 " + signed2);
    console.log("en base 64 otro " + this.signedMessage.signed2);
  }
  
  verifyMessage = async () => {
    console.log('Verifying message:', this.textToSign.value.messagetoverify);
    var mess = bc.base64ToBigint(this.textToSign.value.messagetoverify);
    console.log(mess);
    const res = await axios.post(`http://localhost:3000/toverify/${mess}`)
    console.log(res.data['verified']);
    const verified = res.data['verified'];
    console.log("verified: " + verified);
    this.verifiedMessage = { verified };
  }

}
