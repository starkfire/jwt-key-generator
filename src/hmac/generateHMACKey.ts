const { subtle } = require('node:crypto').webcrypto;

export default async function generateHMACKey(alg: string, extractable: boolean, keyUsages: Array<string>): Promise<CryptoKey> {
    const length = parseInt(alg.substr(-3), 10);

    let hash = { name: `SHA-${length}` };
    
    let key = await subtle.generateKey({
        name: 'HMAC',
        hash,
        length
    }, extractable, keyUsages);

    return key;
}