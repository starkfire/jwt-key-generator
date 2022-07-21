const { subtle } = require('node:crypto').webcrypto;

import getRSAType from "./getRSAType";

function getHashType(alg: string) {
    const length = parseInt(alg.slice(-3), 10);

    if (isNaN(length)) return 'SHA-1';

    return `SHA-${length}`;
}

function getKeyUsages(algName: string) {
    if (['RSASSA-PKCS1-v1_5', 'RSA-PSS'].includes(algName)) {
        return ['sign', 'verify'];
    }

    if (algName == 'RSA-OAEP') {
        return ['encrypt', 'decrypt', 'wrapKey', 'unwrapKey'];
    }
}

export default async function generateRSAKey(alg: string, extractable: boolean) {
    const RSAType = getRSAType(alg);
    if (!RSAType) {
        return new Error('Cannot determine name of algorithm to use');
    }

    const keyUsages = getKeyUsages(RSAType);

    return await subtle.generateKey({
        name: RSAType,
        modulusLength: 2048,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: getHashType(alg),
    }, extractable, keyUsages);
}