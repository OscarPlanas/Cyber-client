import * as bcu from 'bigint-crypto-utils';

export class MyRsaPrivateKey {
    d2: bigint;
    n2: bigint;
   
    constructor(d2: bigint,
        n2: bigint,
        ){
            this.d2 = d2;
            this.n2 = n2;
        }
    sign (message: bigint): bigint {
        console.log("firmando");
        const s = bcu.modPow(message, this.d2, this.n2)
        return s
    }
}