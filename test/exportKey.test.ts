import { isCryptoKey } from "util/types";

import generateSecret from "../src/generateSecret";
import generateKeyPair from "../src/generateKeyPair";
import exportKey from "../src/utils/exportKey";
import CMatrix from "../src/utils/compatibilityMatrix";
import { SYNC_ALGS, ASYNC_ALGS } from "../src/algorithms";

import getRSAType from "../src/rsa/getRSAType";
import getCurve from "../src/ecdsa/getCurve";

describe("Test exportKey()", () => {
    test("should be able to export keys under HMAC_SHA algorithms", async () => {
        for (const alg of SYNC_ALGS['HMAC_SHA']) {
            let secret = await generateSecret(alg);

            if (secret && isCryptoKey(secret)) {
                for(let format in CMatrix) {
                    const isSupportedByFormat = CMatrix[format].includes('HMAC');
    
                    if (isSupportedByFormat) {
                        let exported = await exportKey(secret, format);

                        expect(exported).not.toBeUndefined();
                    }
                }
            }
        }
    });

    test("should be able to export keys under AES_KW algorithms", async () => {
        for (const alg of SYNC_ALGS['AES_KW']) {
            let secret = await generateSecret(alg);

            if (secret && isCryptoKey(secret)) {
                for (let format in CMatrix) {
                    const isSupportedByFormat = CMatrix[format].includes('AES-KW');

                    if (isSupportedByFormat) {
                        let exported = await exportKey(secret, format);

                        expect(exported).not.toBeUndefined();
                    }
                }
            }
        }
    });

    test("should be able to export keys under AES_GCM algorithms", async () => {
        for (const alg of SYNC_ALGS['AES_GCM']) {
            let secret = await generateSecret(alg);

            if (secret && isCryptoKey(secret)) {
                for (let format in CMatrix) {
                    const isSupportedByFormat = CMatrix[format].includes('AES-GCM');

                    if (isSupportedByFormat) {
                        let exported = await exportKey(secret, format);

                        expect(exported).not.toBeUndefined();
                    }
                }
            }
        }
    });

    test("should be able to export keys under RSA algorithms", async () => {
        for (const alg of ASYNC_ALGS['RSA']) {
            let secret = await generateKeyPair(alg);
            let rsaType = getRSAType(alg);

            if (secret && rsaType) {
                let { publicKey, privateKey } = secret;

                // JWK
                let jwk_pub = await exportKey(publicKey, 'jwk');
                let jwk_pvt = await exportKey(privateKey, 'jwk');

                // SPKI
                let spki_pub = await exportKey(publicKey, 'spki');
                
                // PKCS8
                let pkcs8_pvt = await exportKey(privateKey, 'pkcs8');
                
                expect(jwk_pub).not.toBeUndefined();
                expect(jwk_pvt).not.toBeUndefined();
                expect(spki_pub).not.toBeUndefined();
                expect(pkcs8_pvt).not.toBeUndefined();
            }
        }
    });

    test("should be able to export keys under ECDSA algorithms", async () => {
        for (const alg of ASYNC_ALGS['ECDSA']) {
            let secret = await generateKeyPair(alg);

            if (secret) {
                let { publicKey, privateKey } = secret;

                // JWK
                let jwk_pub = await exportKey(publicKey, 'jwk');
                let jwk_pvt = await exportKey(privateKey, 'jwk');

                // SPKI
                let spki_pub = await exportKey(publicKey, 'spki');

                // PKCS8
                let pkcs8_pvt = await exportKey(privateKey, 'pkcs8');

                // raw
                let raw_pub = await exportKey(publicKey, 'raw');

                expect(jwk_pub).not.toBeUndefined();
                expect(jwk_pvt).not.toBeUndefined();
                expect(spki_pub).not.toBeUndefined();
                expect(pkcs8_pvt).not.toBeUndefined();
                expect(raw_pub).not.toBeUndefined();
            }
        }
    });
});
