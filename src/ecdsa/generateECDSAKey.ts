const { subtle } = require('node:crypto').webcrypto;

import getCurve from "./getCurve";

export default async function generateECDSAKey(alg: string, extractable: boolean) {
    return subtle.generateKey({
        name: 'ECDSA',
        namedCurve: getCurve(alg)
    }, extractable, ['sign', 'verify']);
}