const { subtle } = require('node:crypto').webcrypto;

export default async function generateAESKey(alg: string, extractable: boolean, keyUsages: Array<string>): Promise<CryptoKey> {
    const length = parseInt(alg.slice(1, 4), 10);
    const isGCM = (alg.slice(-3) == 'GCM' || alg.slice(-5, 3) == 'GCM');
    
    return subtle.generateKey({
        name: (isGCM) ? 'AES-GCM' : 'AES-KW',
        length
    }, extractable, keyUsages);
}