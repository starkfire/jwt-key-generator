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

let secret = await generateSecret('HS256');

console.log(secret);        // CryptoKey
```
### Generate a Public/Private Key Pair
```js
const { generateKeyPair } = require('jwt-key-generator');

const secret = await generateKeyPair('RS256');

console.log(secret);        // CryptoKey
```
### Convert or export key to a different format
Once you have a `CryptoKey` generated by `generateSecret()` or `generateKeyPair()`, you can convert it to other formats supported by Web Crypto API's [subtle.exportKey()](https://nodejs.org/api/webcrypto.html#subtleexportkeyformat-key): `spki`, `pkcs8`, `jwk`, and `raw`.

```js
const { exportKey, generateSecret } = require('jwt-key-generator');

const secret = await generateSecret('HS256');
const exported = await exportKey(secret, 'jwk');

console.log(exported);      // JSON Web Key
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
    * **Properties:**
      * `extractable` (`<boolean>`)
        * when `true`, the returned `CryptoKey` can be exported to other formats using `exportKey()`
        * default value is `true`
      * `toKeyObject` (`<boolean>`)
        * when `true`, the key will be returned as a `KeyObject` instead of `CryptoKey`
        * default value is `false`
* **Returns:**
  * **key** (`<CryptoKey | KeyObject>`)

### `generateKeyPair(algorithm, [options])`
* generates and returns a public/private key pair
* **Parameters:**
  * **algorithm** (`<string>`)
    * JWT algorithm
    * must be either one of the following algorithms: `RS256`, `RS384`, `RS512`, `PS256`, `PS384`, `PS512`, `RSA-OAEP`, `RSA-OAEP-256`, `RSA-OAEP-384`, or `RSA-OAEP-512`.
  * **options** (`<object>`)
    * specifies additional options before the function returns the key
    * as of `v0.4.0`, `toKeyObject` property is not yet supported for this method
    * **Properties:**
      * `extractable` (`<boolean>`)
        * when `true`, the returned `CryptoKey` can be exported to other formats using `exportKey()`
        * default value is `true`
* **Returns:**
  * **key** (`<CryptoKey>`)

### `exportKey(key, format)`
* returns a `CryptoKey` on a different format (`spki`/`pkcs8`/`jwk`/`raw`)
* **Parameters:**
  * **key** (`<CryptoKey>`)
    * cryptographic key
    * this key may refer to the value returned by `generateSecret()` and `generateKeyPair()`
  * **format** (`<string>`)
    * can be either one of the following formats recognized by Web Crypto API's [subtle.exportKey()](https://nodejs.org/api/webcrypto.html#subtleexportkeyformat-key) (`spki`, `pkcs8`, `jwk`, or `raw`)
* **Returns:**
  * **transformedKey**