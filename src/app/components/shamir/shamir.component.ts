import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-shamir',
  templateUrl: './shamir.component.html',
  styleUrls: ['./shamir.component.css']
})
export class ShamirComponent implements OnInit {
  textToShamir: FormGroup;

  messagetoshamir?: number;
  threshold?: number;
  totalshares?: number;
  reconstructedShares: { x: any; y: any; }[] = [];

  secret?: number;

  constructor(private formBuilder: FormBuilder) {
    this.textToShamir = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.textToShamir = this.formBuilder.group({
      messagetoshamir: [''],
      threshold: [''],
      totalshares: ['']
    });
  }

  shamirMessage = async () => {
    console.log('Shamir message:', this.textToShamir.value.messagetoshamir);
    console.log('Shamir threshold:', this.textToShamir.value.threshold);
    console.log('Shamir totalshares:', this.textToShamir.value.totalshares);

    const message = this.textToShamir.value.messagetoshamir;
    const threshold = this.textToShamir.value.threshold;
    const totalshares = this.textToShamir.value.totalshares;
    console.log(message);
    console.log(threshold);
    console.log(totalshares);

    const res = await axios.post(`http://localhost:3000/shamir/${message}/${threshold}/${totalshares}`)
    console.log(res.data[1].x);
    res.data.forEach((share: any) => {
      console.log(`Share: x=${share.x}, y=${share.y}`);
    });


    const shares = res.data.map((share: any) => {
      return { x: share.x, y: share.y };
    });
    const reconstructedShares2: { x: any; y: any; }[] = []; // Change the type of reconstructedShares
    // Create a new array to store the reconstructed shares

    for (const share of shares) {
      const x = share.x;
      const y = share.y;
      reconstructedShares2.push({ x, y });
    }
    console.log(shares);
    console.log('Reconstructed shares:');
    this.reconstructedShares.forEach((share) => {
      console.log(`x: ${share.x}, y: ${share.y}`);
    });

    this.reconstructedShares = reconstructedShares2;
  }


  async reconstructSecret() {
    try {
      console.log('Reconstructing secret from shares:', this.reconstructedShares);
      const shares = this.reconstructedShares;
      console.log(shares);

      const response = await axios.post('http://localhost:3000/reconstruct', { shares: this.reconstructedShares });

      const secret2 = response.data.secret;
      this.secret = secret2;
      console.log('Reconstructed Secret:', secret2);
    } catch (error) {
      console.error('Error:', error);
    }
  }

}
