// Refer to https://datatracker.ietf.org/doc/html/rfc7518

interface AlgorithmCollection {
    [type: string]: string[]
}

export const SYNC_ALGS: AlgorithmCollection = {
    HMAC_SHA: [
        'HS256',
        'HS384',
        'HS512'
    ],
    AES_KW: [
        'A128KW',
        'A192KW',
        'A256KW'
    ],
    AES_GCM: [
        'A128GCM',
        'A192GCM',
        'A256GCM',
        'A128GCMKW',
        'A192GCMKW',
        'A256GCMKW'
    ]
}

export const ASYNC_ALGS: AlgorithmCollection = {
    RSA: [
        'RS256',
        'RS384',
        'RS512',
        'PS256',
        'PS384',
        'PS512',
        'RSA-OAEP',
        'RSA-OAEP-256',
        'RSA-OAEP-384',
        'RSA-OAEP-512'
    ],
    ECDSA: [
        'ES256',
        'ES384',
        'ES512'
    ]
}