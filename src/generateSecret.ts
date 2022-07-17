import generateHMACKey from "./hmac/generateHMACKey";
import generateAESKey from "./aes/generateAESKey";
import { SYNC_ALGS } from "./algorithms";

function isInputAlgorithmValid(alg: string) {
    for (let algType in SYNC_ALGS) {
        if (SYNC_ALGS[algType].includes(alg)) {
            return true;
        }
    }

    return false;
}

export default async function generateSecret(alg: string) {
    let extractable = true;
    let secret;

    if (!isInputAlgorithmValid(alg)) {
        throw new Error('Invalid Symmetric Algorithm');
    }

    if (SYNC_ALGS.HMAC_SHA.includes(alg)) {
        secret = await generateHMACKey(alg, extractable, ['sign', 'verify']);
    }

    if (SYNC_ALGS.AES_KW.includes(alg)) {
        secret = await generateAESKey(alg, extractable, ['wrapKey', 'unwrapKey']);
    }

    if (SYNC_ALGS.AES_GCM.includes(alg)) {
        secret = await generateAESKey(alg, extractable, ['encrypt', 'decrypt']);
    }

    return secret;
}