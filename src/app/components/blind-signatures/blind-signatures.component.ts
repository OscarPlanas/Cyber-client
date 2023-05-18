import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as bcu from 'bigint-crypto-utils';
import { MyRsaPublicKey } from 'src/app/models/publickey';
import * as bc from 'bigint-conversion'
import { MyRsaPrivateKey } from 'src/app/models/privatekey';

interface BlindedMessage {
  blinded: string;
}

interface VerifiedMessage {
  verified: string;
}

@Component({
  selector: 'app-blind-signatures',
  templateUrl: './blind-signatures.component.html',
  styleUrls: ['./blind-signatures.component.css']
})
export class BlindSignaturesComponent implements OnInit {
  textToBlind: FormGroup;
  e: string;
  n: string;
  d: string;
  e2: bigint;
  n2: bigint;
  d2: bigint;
  messagetoblind: bigint;
  messagetoverify: bigint;
  blindedMessage: BlindedMessage | undefined;
  verifiedMessage: VerifiedMessage | undefined;


  constructor(private formBuilder: FormBuilder) {
    this.e = "";
    this.n = "";
    this.d = "";
    this.e2 = 0n;
    this.n2 = 0n;
    this.d2 = 0n;
    this.messagetoblind = 0n;
    this.messagetoverify = 0n;

    this.textToBlind = this.formBuilder.group({});

   }

  ngOnInit(): void {
    this.textToBlind = this.formBuilder.group({
      messagetoblind: [''],
      messagetoverify: ['']
    });
    this.getPublicKeys();
  }

  getPublicKeys = async () => {
    const res = await axios.get('http://localhost:3000/publicKey')
    console.log(res.data);
    
    this.e = res.data.e;
    this.n = res.data.n;
    console.log(this.e);
    console.log(this.n);
    this.e2 = bc.base64ToBigint(this.e);
    this.n2 = bc.base64ToBigint(this.n);
    console.log(this.e2);
    console.log(this.n2);
   /* e: bc.bigintToBase64(this.e),
      n: bc.bigintToBase64(this.n)
    }*/
  }

  blind = async () => {
    const blindingFactor = await bcu.prime(256);
    const blindedMessage = (this.messagetoblind * bcu.modPow(blindingFactor, this.e2, this.n2)) % this.n2;
    console.log('Message to blind' + this.messagetoblind);
    console.log('Blinded Message:', blindedMessage.toString());
    console.log(blindedMessage);
    const privateKey = new MyRsaPrivateKey((this.d2), (this.n2));
    const blindedSignature = privateKey.sign(blindedMessage);
    console.log('Blinded Signature:', blindedSignature.toString());

  
  }
  /*  
  const blindingFactor = await bcu.prime(256);
  const blindedMessage = (message * bcu.modPow(blindingFactor, publicKey.e, publicKey.n)) % publicKey.n;
  const blindedSignature = privateKey.sign(blindedMessage);
  const unblindedSignature = (blindedSignature * bcu.modInv(blindingFactor, publicKey.n)) % publicKey.n;
  const blindVerified = publicKey.verify(unblindedSignature);
  console.log('Blinded Message:', blindedMessage.toString());
  console.log('Blinded Signature:', blindedSignature.toString());
  console.log('Unblinded Signature:', unblindedSignature.toString());
  console.log('Blind Verified:', blindVerified.toString());
  */
}
