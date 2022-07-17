const { subtle } = require('node:crypto').webcrypto;

function getCurve(alg: string) {
    if (alg == 'ES256' || alg == 'ES384') {
        return `P-${alg.substr(-3)}`;
    }

    if (alg == 'ES512') {
        return 'P-521';
    }
}

export default async function generateECDSAKey(alg: string, extractable: boolean) {
    let key = await subtle.generateKey({
        name: 'ECDSA',
        namedCurve: getCurve(alg)
    }, extractable, ['sign', 'verify']);

    return key;
}