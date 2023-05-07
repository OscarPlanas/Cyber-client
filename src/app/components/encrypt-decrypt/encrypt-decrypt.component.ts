import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as bcu from 'bigint-crypto-utils';
import { MyRsaPublicKey } from 'src/app/models/publickey';
import * as bc from 'bigint-conversion'

interface EncryptedMessage {
  encrypted2: string;
}

@Component({
  selector: 'app-encrypt-decrypt',
  templateUrl: './encrypt-decrypt.component.html',
  styleUrls: ['./encrypt-decrypt.component.css']
})
export class EncryptDecryptComponent implements OnInit {
  textToEncrypt: FormGroup;
  //submitted = false;
  //clickEncrypt: boolean;
  e: string;
  n: string;
  message: bigint;
  e2: bigint;
  n2: bigint;
  encryptedMessage: EncryptedMessage | undefined;

  /*serie:MyRsaPublicKey={
    e:0n,
    n:0n,
	  
  }*/
  constructor(private formBuilder: FormBuilder) {
    this.e = "";
    this.n = "";
    this.e2 = 0n;
    this.n2 = 0n;
    
    this.message = 0n;
    this.textToEncrypt = this.formBuilder.group({});
    //this.clickEncrypt = false;
    
  
   }
  ngOnInit(): void {
    this.textToEncrypt = this.formBuilder.group({
      message: [''],
    });
      console.log("hola");
      this.getPublicKeys();

   // 
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

  encryptMessage (){
    
    console.log('Encrypting message:', this.textToEncrypt.value.message);
    console.log(this.e2);
    console.log(this.n2);
    const publicKey = new MyRsaPublicKey((this.e2), (this.n2));
    const message2 = BigInt(this.textToEncrypt.value.message);
    const encrypted = publicKey.encrypt(message2);
    console.log(encrypted);
    const encrypted2 = bc.bigintToBase64(encrypted);
    this.encryptedMessage = { encrypted2 };
    console.log("en base 64 " + encrypted2);
    console.log("en base 64 otro " + this.encryptedMessage.encrypted2);
    //res.json({ encrypted: encrypted.toString() });

  }

}
  




  