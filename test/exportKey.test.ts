import { isCryptoKey } from "util/types";

import generateSecret from "../src/generateSecret";
import generateKeyPair from "../src/generateKeyPair";
import exportKey from "../src/utils/exportKey";
import CMatrix from "../src/utils/compatibilityMatrix";
import { SYNC_ALGS, ASYNC_ALGS } from "../src/algorithms";

async function exportSecretKeys(signatureAlgorithm: string, jwsHeader: string) {
    for (const alg of SYNC_ALGS[signatureAlgorithm]) {
        let secret = await generateSecret(alg);

        if (secret && isCryptoKey(secret)) {
            for (let format in CMatrix) {
                const isSupportedByFormat = CMatrix[format].includes(jwsHeader);

                if (isSupportedByFormat) {
                    let exported = await exportKey(secret, format);

                    expect(exported).not.toBeUndefined();
                }
            }
        }
    }
}

async function exportPairedKeys(signatureAlgorithm: string) {
    for (const alg of ASYNC_ALGS[signatureAlgorithm]) {
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

            if (signatureAlgorithm === 'ECDSA') {
                let raw_pub = await exportKey(publicKey, 'raw');
                
                expect(raw_pub).not.toBeUndefined();
            }
                
            expect(jwk_pub).not.toBeUndefined();
            expect(jwk_pvt).not.toBeUndefined();
            expect(spki_pub).not.toBeUndefined();
            expect(pkcs8_pvt).not.toBeUndefined();
        }
    }
}

describe("Test exportKey()", () => {
    test("should be able to export keys under HMAC_SHA algorithms", async () => {
        await exportSecretKeys('HMAC_SHA', 'HMAC');
    });

    test("should be able to export keys under AES_KW algorithms", async () => {
        await exportSecretKeys('AES_KW', 'AES-KW');
    });

    test("should be able to export keys under AES_GCM algorithms", async () => {
        await exportSecretKeys('AES_GCM', 'AES-GCM');
    });

    test("should be able to export keys under RSA algorithms", async () => {
        await exportPairedKeys('RSA');
    });

    test("should be able to export keys under ECDSA algorithms", async () => {
        await exportPairedKeys('ECDSA');
    });
});
