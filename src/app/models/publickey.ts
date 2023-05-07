import * as bcu from 'bigint-crypto-utils';

export class MyRsaPublicKey {
    e2: bigint;
    n2: bigint;
   
    constructor(e2: bigint,
        n2: bigint,
        ){
            this.e2 = e2;
            this.n2 = n2;
        }

    encrypt (message: bigint): bigint{
        console.log("encriptando");
        const c = bcu.modPow(message, this.e2, this.n2);
        return c
    }
}