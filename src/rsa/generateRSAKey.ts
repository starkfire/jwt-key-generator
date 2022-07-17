const { subtle } = require('node:crypto').webcrypto;

function getRSAType(alg: string) {
    if (alg.length == 5 && alg.substr(0, 2) == 'RS') {
        return 'RSASSA-PKCS1-v1_5';
    }

    if (alg.length == 5 && alg.substr(0, 2) == 'PS') {
        return 'RSA-PSS';
    }

    if (alg.substr(-4) == 'OAEP' || alg.substr(-8, 4) == 'OAEP') {
        return 'RSA-OAEP';
    }

    return null;
}

function getHashType(alg: string) {
    const length = parseInt(alg.substr(-3), 10);

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

    let key = await subtle.generateKey({
        name: RSAType,
        modulusLength: 2048,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: getHashType(alg),
    }, extractable, keyUsages);

    return key;
}