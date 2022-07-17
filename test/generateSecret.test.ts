import { isCryptoKey } from "util/types";

import { SYNC_ALGS } from "../src/algorithms";
import generateSecret from "../src/generateSecret";

describe("Test generateSecret()", () => {
    test("should return a CryptoKey", async () => {
        const secret = await generateSecret('A128KW', true);

        expect(isCryptoKey(secret)).toEqual(true);
    });

    test("should return an error if an invalid algorithm is placed as an argument", async () => {
        try {
            await generateSecret('RS256', true);
        } catch (error) {
            if (error instanceof Error) {
                expect(error.message).toBe('Invalid Symmetric Algorithm');
            }
        }
    });

    test("should work with every algorithm within HMAC_SHA (algorithms.ts)", async () => {
        SYNC_ALGS['HMAC_SHA'].forEach(async (alg) => {
            let secret = await generateSecret(alg, true);

            expect(isCryptoKey(secret)).toEqual(true);
        });
    });

    test("should work with every algorithm within AES_KW (algorithms.ts)", async () => {
        SYNC_ALGS['AES_KW'].forEach(async (alg) => {
            let secret = await generateSecret(alg, true);

            expect(isCryptoKey(secret)).toEqual(true);
        });
    });

    test("should work with every algorithm within AES_GCM (algorithms.ts)", async () => {
        SYNC_ALGS['AES_GCM'].forEach(async (alg) => {
            let secret = await generateSecret(alg, true);

            expect(isCryptoKey(secret)).toEqual(true);
        });
    });
});