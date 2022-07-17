# JWT Key Generator

[JWT Key Generator](https://www.npmjs.com/package/jwt-key-generator) is a tiny JavaScript library for generating cryptographic keys for [JSON Web Tokens](https://jwt.io/) using Node's [Web Crypto API](https://nodejs.org/api/webcrypto.html).

## Install
```sh
npm install -S jwt-key-generator
```

## Usage
### Generate a Secret Key
```js
const { generateSecret } = require('jwt-key-generator')

const secret = await generateSecret('HS256');

console.log(secret);        // CryptoKey
```
### Generate a Public/Private Key Pair
```js
const { generateKeyPair } = require('jwt-key-generator')

const secret = await generateKeyPair('RS256');

console.log(secret);        // CryptoKey
```

## Supported Algorithms
| Algorithm   | Supported   |
| ----------- | ------------|
| HS256       | ✔️          |
| HS384       | ✔️          |
| HS512       | ✔️          |
| A128KW      | ✔️          |
| A192KW      | ✔️          |
| A256KW      | ✔️          |
| A128GCM     | ✔️          |
| A192GCM     | ✔️          |
| A256GCM     | ✔️          |
| A128GCMKW   | ✔️          |
| A192GCMKW   | ✔️          |
| A256GCMKW   | ✔️          |
| RS256       | ✔️          |
| RS384       | ✔️          |
| RS512       | ✔️          |
| PS256       | ✔️          |
| PS384       | ✔️          |
| PS512       | ✔️          |
| RSA-OAEP    | ✔️          |
| RSA-OAEP-256| ✔️          |
| RSA-OAEP-384| ✔️          |
| RSA-OAEP-512| ✔️          |
| ES256       | ✔️          |
| ES384       | ✔️          |
| ES512       | ✔️          |
| EdDSA       | ❌          |

See [RFC 7518](https://datatracker.ietf.org/doc/html/rfc7518) for a detailed description of the algorithms.

## API
### `generateSecret(algorithm, extractable=true)`
* generates and returns a secret key
* **Parameters:**
  * **algorithm** (`<string>`)
    * JWT algorithm
    * must be either one of the following algorithms: `HS256`, `HS384`, `HS512`, `A128KW`, `A192KW`, `A256KW`, `A128GCM`, `A192GCM`, `A256GCM`, `A128GCMKW`, `A192GCMKW`, or `A256GCMKW`.
  * **extractable** (`<boolean>`) (default: _true_)
    * when `true`, the returned `CryptoKey` can be exported to other formats (i.e. `raw`, `pkcs8`, `spki`, or `jwk`)
* **Returns:**
  * **key** (`<CryptoKey>`)

### `generateKeyPair(algorithm, extractable=true)`
* generates and returns a public/private key pair
* **Parameters:**
  * **algorithm** (`<string>`)
    * JWT algorithm
    * must be either one of the following algorithms: `RS256`, `RS384`, `RS512`, `PS256`, `PS384`, `PS512`, `RSA-OAEP`, `RSA-OAEP-256`, `RSA-OAEP-384`, or `RSA-OAEP-512`.
  * **extractable** (`<boolean>`) (default: _true_)
    * when `true`, the returned `CryptoKey` can be exported to other formats (i.e. `raw`, `pkcs8`, `spki`, or `jwk`)
* **Returns:**
  * **key** (`<CryptoKey>`)