// Refer to https://nodejs.org/api/webcrypto.html#subtleexportkeyformat-key

interface CompatibilityMatrix {
    [type: string]: string[]
}

const compatibilityMatrix: CompatibilityMatrix = {
    jwk: [
        'AES-CBC',
        'AES-CTR',
        'AES-GCM',
        'AES-KW',
        'ECDH',
        'ECDSA',
        'Ed25519',
        'Ed448',
        'HMAC',
        'RSA-OAEP',
        'RSA-PSS',
        'RSASSA-PKCS1-v1_5'
    ],
    raw: [
        'AES-CBC',
        'AES-CTR',
        'AES-GCM',
        'AES-KW',
        'ECDH',
        'ECDSA',
        'Ed25519',
        'Ed448',
        'HMAC'
    ],
    pkcs8: [
        'ECDH',
        'ECDSA',
        'Ed25519',
        'Ed448',
        'RSA-OAEP',
        'RSA-PSS',
        'RSASSA-PKCS1-v1_5'
    ],
    spki: [
        'ECDH',
        'ECDSA',
        'Ed25519',
        'Ed448',
        'RSA-OAEP',
        'RSA-PSS',
        'RSASSA-PKCS1-v1_5'
    ]
}

export default compatibilityMatrix;