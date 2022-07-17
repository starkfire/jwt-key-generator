import generateRSAKey from './rsa/generateRSAKey';
import generateECDSAKey from './ecdsa/generateECDSAKey';
import { ASYNC_ALGS } from './algorithms';

function isInputAlgorithmValid(alg: string) {
    for (let algType in ASYNC_ALGS) {
        if (ASYNC_ALGS[algType].includes(alg)) {
            return true;
        }
    }

    return false;
}

export default async function generateKeyPair(alg: string) {
    let extractable = true;
    let secret;

    if (!isInputAlgorithmValid(alg)) {
        throw new Error('Invalid Asymmetric Algorithm');
    }

    if (ASYNC_ALGS.RSA.includes(alg)) {
        secret = await generateRSAKey(alg, extractable);
    }

    if (ASYNC_ALGS.ECDSA.includes(alg)) {
        secret = await generateECDSAKey(alg, extractable);
    }

    return secret;
}