import generateRSAKey from './rsa/generateRSAKey';
import generateECDSAKey from './ecdsa/generateECDSAKey';
import { ASYNC_ALGS } from './algorithms';

interface Options {
    [index: string]: boolean | undefined;

    /**
     * determines whether generateKeyPair() method exports the CryptoKey
     * in a manner which allows subtle.export() to transform it for other
     * formats.
     */
     extractable?: boolean;

    // TODO: support for `toKeyObject` option
}

const optionsSchema: Options = {
    extractable: true
}

function isOptionsValid(options: object) {
    return Object.keys(options).filter(key => !optionsSchema.hasOwnProperty(key));
}

function isInputAlgorithmValid(alg: string) {
    for (let algType in ASYNC_ALGS) {
        if (ASYNC_ALGS[algType].includes(alg)) {
            return true;
        }
    }

    return false;
}

export default async function generateKeyPair(alg: string, options: Options = optionsSchema) {
    let secret;
    let extractable = options.extractable ?? true;

    let optionErrors = isOptionsValid(options);
    if (optionErrors.length > 0) {
        optionErrors.forEach((key) => {
            throw new Error(`${key} is not a valid option for generateKeyPair()`);
        });
    }

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