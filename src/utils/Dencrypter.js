const Cryptr = require('cryptr');
let key = process.env.REACT_APP_HASH_KEY;

class Tokenizer {
    constructor() {
      this.cryptr = new Cryptr(key);
      this.jwt = require('jwt-simple');
    }
    
    passwordDecrypt(pwrd){
        return this.cryptr.decrypt(pwrd);
    }

    passwordEncrypt(pwrd){
        return this.cryptr.encrypt(pwrd);
    }

    jwtEncrypt(payload){
        return this.jwt.encode(payload , key, 'HS512');
    }

    jwtDecrypt(token){
        return this.jwt.decode(token, key, false, 'HS512');
    }

  }

  export let Dencrypter = new Tokenizer()