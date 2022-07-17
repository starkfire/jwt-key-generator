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

    if (!key?.extractable) {
        throw new Error('Input Key is not extractable');
    }

    if (!isFormatSupported(key?.algorithm?.name, format)) {
        throw new Error("Target format does not support the key's algorithm");
    }

    try {
        let exportable = await subtle.exportKey(format, key);

        return exportable;
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        }
    }
}