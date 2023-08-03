const { subtle } = require('node:crypto').webcrypto;

import compatibilityMatrix from './compatibilityMatrix';

function isFormatSupported(alg: string, format: string) {
    return compatibilityMatrix[format].includes(alg)
}

export default async function exportKey(key: CryptoKey, format: string) {
    const VALID_FORMATS = ['spki', 'pkcs8', 'jwk', 'raw']

    if (!VALID_FORMATS.includes(format)) {
        throw new Error('Invalid Format Argument');
    }

    if (!key.extractable) {
        throw new Error('Input Key is not extractable');
    }

    if (!isFormatSupported(key.algorithm.name, format)) {
        throw new Error("Target format does not support the key's algorithm");
    }

    // PKCS8 should only support private keys
    if (key.type != 'private' && format == 'pkcs8') {
        throw new Error("Cannot export public keys as PKCS8");
    }

    // SPKI should only support public keys
    if (key.type != 'public' && format == 'spki') {
        throw new Error("Cannot export private keys as SPKI");
    }

    // raw should only support public keys
    if (key.type == 'private' && format == 'raw') {
        throw new Error("Cannot export private keys as raw");
    }

    return subtle.exportKey(format, key);
}
