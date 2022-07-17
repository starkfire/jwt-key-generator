import generateSecret from "../src/generateSecret";
import generateKeyPair from "../src/generateKeyPair";
import exportKey from "../src/utils/exportKey";
import CMatrix from "../src/utils/compatibilityMatrix";
import { SYNC_ALGS, ASYNC_ALGS } from "../src/algorithms";

import getRSAType from "../src/rsa/getRSAType";
import getCurve from "../src/ecdsa/getCurve";

describe("Test exportKey()", () => {
    test("should be able to export keys under HMAC_SHA algorithms", async () => {
        SYNC_ALGS['HMAC_SHA'].forEach(async alg => {
            let secret = await generateSecret(alg, true);

            if (secret) {
                for(let format in CMatrix) {
                    const isSupportedByFormat = CMatrix[format].includes('HMAC');
    
                    if (isSupportedByFormat) {
                        let exported = await exportKey(secret, format);

                        expect(exported).not.toBeUndefined();
                    }
                }
            }
        });
    });

    test("should be able to export keys under AES_KW algorithms", async () => {
        SYNC_ALGS['AES_KW'].forEach(async alg => {
            let secret = await generateSecret(alg, true);

            if (secret) {
                for (let format in CMatrix) {
                    const isSupportedByFormat = CMatrix[format].includes('AES-KW');

                    if (isSupportedByFormat) {
                        let exported = await exportKey(secret, format);

                        expect(exported).not.toBeUndefined();
                    }
                }
            }
        });
    });

    test("should be able to export keys under AES_GCM algorithms", async () => {
        SYNC_ALGS['AES_GCM'].forEach(async alg => {
            let secret = await generateSecret(alg, true);

            if (secret) {
                for (let format in CMatrix) {
                    const isSupportedByFormat = CMatrix[format].includes('AES-GCM');

                    if (isSupportedByFormat) {
                        let exported = await exportKey(secret, format);

                        expect(exported).not.toBeUndefined();
                    }
                }
            }
        });
    });

    test("should be able to export keys under RSA algorithms", async () => {
        ASYNC_ALGS['RSA'].forEach(async alg => {
            let secret = await generateKeyPair(alg, true);
            let rsaType = getRSAType(alg);

            if (secret && rsaType) {
                for (let format in CMatrix) {
                    const isSupportedByFormat = CMatrix[format].includes(rsaType);

                    if (isSupportedByFormat) {
                        let pub = await exportKey(secret.publicKey, format);
                        let pvt = await exportKey(secret.privateKey, format);

                        if (pub) expect(pub).not.toBeUndefined();
                        if (pvt) expect(pvt).not.toBeUndefined();
                    }
                }
            }
        });
    });

    test("should be able to export keys under ECDSA algorithms", async () => {
        ASYNC_ALGS['ECDSA'].forEach(async alg => {
            let secret = await generateKeyPair(alg, true);
            let ecdsaType = getCurve(alg);

            if (secret && ecdsaType) {
                for (let format in CMatrix) {
                    const isSupportedByFormat = CMatrix[format].includes(ecdsaType);

                    if (isSupportedByFormat) {
                        let pub = await exportKey(secret.publicKey, format);
                        let pvt = await exportKey(secret.privateKey, format);

                        if (pub) expect(pub).not.toBeUndefined();
                        if (pvt) expect(pvt).not.toBeUndefined();
                    }
                }
            }
        });
    });
});