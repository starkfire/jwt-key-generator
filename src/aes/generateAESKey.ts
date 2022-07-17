const { subtle } = require('node:crypto').webcrypto;

export default async function generateAESKey(alg: string, extractable: boolean, keyUsages: Array<string>): Promise<CryptoKey> {
    const length = parseInt(alg.substr(1,4), 10);
    const isGCM = (alg.substr(-3) == 'GCM' || alg.substr(-5, 3) == 'GCM');
    
    let key = await subtle.generateKey({
        name: (isGCM) ? 'AES-GCM' : 'AES-KW',
        length
    }, extractable, keyUsages);

    return key;
}