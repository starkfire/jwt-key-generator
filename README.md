# JWT Key Generator

[JWT Key Generator](https://www.npmjs.com/package/jwt-key-generator) is a tiny JavaScript library for generating cryptographic keys for [JSON Web Tokens](https://jwt.io/) using Node's [Web Crypto API](https://nodejs.org/api/webcrypto.html).

## Supported Algorithms
| Algorithm   | Supported   | Algorithm    | Supported |
| ----------- | ------------| ------------ | --------- |
| HS256       | ✔️          | RS256        | ✔️       |
| HS384       | ✔️          | RS384        | ✔️       |
| HS512       | ✔️          | RS512        | ✔️       |
| A128KW      | ✔️          | PS256        | ✔️       |
| A192KW      | ✔️          | PS384        | ✔️       |
| A256KW      | ✔️          | PS512        | ✔️       |
| A128GCM     | ✔️          | RSA-OAEP     | ✔️       |
| A192GCM     | ✔️          | RSA-OAEP-256 | ✔️       |
| A256GCM     | ✔️          | RSA-OAEP-384 | ✔️       |
| A128GCMKW   | ✔️          | RSA-OAEP-512 | ✔️       |
| A192GCMKW   | ✔️          | ES256        | ✔️       |
| A256GCMKW   | ✔️          | ES384        | ✔️       |
|             |             | ES512        | ✔️       |
|             |             | EdDSA        | ❌       |

See [RFC 7518](https://datatracker.ietf.org/doc/html/rfc7518) for a detailed description of the algorithms.

## Install
```sh
npm install jwt-key-generator
```

## Examples
### Generate a Secret Key
```js
const { generateSecret } = require('jwt-key-generator');

// async/await
let secret = await generateSecret('HS256');
console.log(secret);

// promise
generateSecret('HS256').then(key => {
  console.log(key);
})
```
### Generate a Public/Private Key Pair
```js
const { generateKeyPair } = require('jwt-key-generator');

// async/await
const keypair = await generateKeyPair('RS256');
console.log(keypair.publicKey);          // Public Key
console.log(keypair.privateKey);         // Private Key

// promise
generateKeyPair('RS256').then(keypair => {
    console.log(keypair.publicKey);
    console.log(keypair.privateKey);
});
```
### Generate a Secret Key and return as `KeyObject`

You can also choose to return the generated key as a `KeyObject` by passing an additional object as an argument with `toKeyObject: true`.

This allows you to conveniently use this library with JWT libraries such as [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken).

```js
const { generateSecret } = require('jwt-key-generator');

let secret = await generateSecret('HS256', { toKeyObject: true });
let keypair = await generateKeyPair('RS256', { toKeyObject: true });
```

### Convert or export key to a different format
You can also convert the key to other formats supported by Web Crypto API's [subtle.exportKey()](https://nodejs.org/api/webcrypto.html#subtleexportkeyformat-key): `spki`, `pkcs8`, `jwk`, and `raw`.

```js
const { exportKey, generateSecret } = require('jwt-key-generator');

const secret = await generateSecret('HS256');
const exported = await exportKey(secret, 'jwk');

console.log(exported);      // JSON Web Key
```

## Compatibility

This library works with JWT libraries such as [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken). To do so, simply pass the generated key as a `KeyObject` to `.sign()` and `.verify()`:

```js
const jwt = require('jsonwebtoken');
const { generateSecret } = require('jwt-key-generator');


let secret = await generateSecret('HS256', { toKeyObject: true });
let payload = { id: 123 };

let token = jwt.sign(payload, secret);
console.log(token);

let decoded = jwt.verify(token, secret);
console.log(decoded);
```

## Development
```sh
git clone https://github.com/starkfire/jwt-key-generator.git
cd jwt-key-generator

npm install
npm run build
npm test
```
If you are interested to submit issues and pull requests, contributions are highly welcome. Consider checking out [CONTRIBUTING.md](https://github.com/starkfire/jwt-key-generator/blob/main/CONTRIBUTING.md).

## API
### `generateSecret(algorithm, [options])`
* generates and returns a secret key
* **Parameters:**
  * **algorithm** (`<string>`)
    * JWT algorithm
    * must be either one of the following algorithms: `HS256`, `HS384`, `HS512`, `A128KW`, `A192KW`, `A256KW`, `A128GCM`, `A192GCM`, `A256GCM`, `A128GCMKW`, `A192GCMKW`, or `A256GCMKW`.
  * **options** (`<object>`)
    * specifies additional options before the function returns the key
      * `extractable` (`<boolean>`)
        * if `true`, the returned `CryptoKey` can be exported to other formats using `exportKey()`
        * default value is `true`
      * `toKeyObject` (`<boolean>`)
        * if `true`, the key will be returned as a `KeyObject` instead of `CryptoKey`
        * default value is `false`
* **Returns:**
  * **key** (`<CryptoKey | KeyObject>`)

### `generateKeyPair(algorithm, [options])`
* generates and returns a public and private key pair
* **Parameters:**
  * **algorithm** (`<string>`)
    * JWT algorithm
    * must be either one of the following algorithms: `RS256`, `RS384`, `RS512`, `PS256`, `PS384`, `PS512`, `RSA-OAEP`, `RSA-OAEP-256`, `RSA-OAEP-384`, or `RSA-OAEP-512`.
  * **options** (`<object>`)
    * specifies additional options before the function returns the key
      * `extractable` (`<boolean>`)
        * when `true`, the returned `CryptoKey` can be exported to other formats using `exportKey()`
        * default value is `true`
      * `toKeyObject` (`<boolean>`)
        * if `true`, the public and private keys will be returned as `KeyObject` instead of `CryptoKey`
        * default value is `false`
* **Returns:**
  * **key** (`<object>`)
    * returns an object which contains the key pair
      * `publicKey` (`<CryptoKey>`)
      * `privateKey` (`<CryptoKey>`)

### `exportKey(key, format)`
* returns an input `CryptoKey` on a different format (`spki`/`pkcs8`/`jwk`/`raw`)
* **Parameters:**
  * **key** (`<CryptoKey>`)
    * cryptographic key
    * this key may refer to the value returned by `generateSecret()` and `generateKeyPair()`
  * **format** (`<string>`)
    * can be either one of the following formats recognized by Web Crypto API's [subtle.exportKey()](https://nodejs.org/api/webcrypto.html#subtleexportkeyformat-key) (`spki`, `pkcs8`, `jwk`, or `raw`)
* **Returns:**
  * **key** (`<ArrayBuffer>`)
    * returns the transformed key
    * the transformed key will be returned with the following types, depending on the target format
      * `<ArrayBuffer>` (for `pkcs8`, `spki`, and `raw`)
      * `<object>` (for `jwk`)

### `toKeyObject(key)`
* takes an input `CryptoKey` and converts it to `KeyObject`
* **Parameters:**
  * **key** (`<CryptoKey>`)
    * cryptographic key
    * this key may refer to the value returned by `generateSecret()` and `generateKeyPair()`
* **Returns:**
  * **key** (`<KeyObject>`)
    * returns the same key in `KeyObject` format