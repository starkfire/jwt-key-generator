import { KeyObject } from "node:crypto";

import generateHMACKey from "./hmac/generateHMACKey";
import generateAESKey from "./aes/generateAESKey";
import { SYNC_ALGS } from "./algorithms";

interface Options {
    [index: string]: boolean | undefined;

    /**
     * determines whether generateSecret() method exports the CryptoKey
     * in a manner which allows subtle.export() to transform it for other
     * formats.
     */
    extractable?: boolean;

    /**
     * optional property for generateSecret(). If true, it tells the function 
     * to return the CryptoKey as a KeyObject
     */
    toKeyObject?: boolean;
}

const optionsSchema: Options = {
    extractable: true,
    toKeyObject: false
};

function isOptionsValid(options: object) {
    return Object.keys(options).filter(key => !optionsSchema.hasOwnProperty(key));
}

function isInputAlgorithmValid(alg: string) {
    for (let algType in SYNC_ALGS) {
        if (SYNC_ALGS[algType].includes(alg)) {
            return true;
        }
    }

    return false;
}

export default async function generateSecret(alg: string, options: Options = optionsSchema) {
    let secret;
    let extractable = options.extractable ?? true;
    
    let optionErrors = isOptionsValid(options);
    if (optionErrors.length > 0) {
        optionErrors.forEach((key) => {
            throw new Error(`${key} is not a valid option for generateSecret()`);
        });
    }

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
        if (alg.slice(-2) == 'KW') {
            secret = await generateAESKey(alg, extractable, ['wrapKey', 'unwrapKey']);
        } else {
            secret = await generateAESKey(alg, extractable, ['encrypt', 'decrypt']);
        }
    }

    return (options.toKeyObject && secret) 
                ? KeyObject.from(secret) 
                : secret;
}
